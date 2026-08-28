import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

//cria a base da api
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

//ORGANIZAR MELHOR AS FUNÇÕES DE INTERCEPTORS

//o que eu preciso no interceptors.request:
//verificar se tem o token e setar ele no header.Authorization
//retornar a configuração
//se der erro rejeitar a promise com o erro

//oq que eu preciso no interceptors.response:
//pegar a response e analisar ela
//se der error guardar em requisição original
//o retry serve para marcar que a requisição já tentou renovar o token, para evitar loop infinito
//inicia um try: se não tiver refresh token desloga o usuário e rejeita a promise
//o que deve acontecer no logout: remover os tokes da localstorage e redirecionar para login
//depois de conferir de tem refresh token faz uma requisição para renovar o refresh token
//pega o access token da response e salva na request
//atualiza a request original com um novo token
//e refaz a request
//se houver algum erro no durante a renovação desloga o usuário e rejeita a promise

//teste para validar o funcionanmento na api:
//fazer login com os dados corretos e ver se recebe o token
//fazer uma requisição que precisa do token para ver se ele é enviado corretamente e receber o status 200
//fazer uma nova requisição com access token expirado e esperar receber o status 401
//testar o refresh:
//enviar uma requisção para a api de refresh com o refrehsToken salvo na storage
//receeber o novo accesstooken e testar ele para fazer a requisição original novamente e receber o status 200

//testa para validar funcionamento do front:
//faz login com os dados corretos e ver se o token é salvo na localstorage
//faça uma requisição com o token que recebeu
//invalide o token e tente novamente uma requisição
//receba o erro 404 e seja redirecionado para a página de login

//como funciona o tempo em que o usuário permanece logado:
//o access token tem validade média de 15 a 30 minutos, e ele é usado para autenticar as requisições
//quando ele expira, o refresh token que é válido por um período de 15 a 30 dias é usado para renovar o access token
//então enquanto houver refresh token válido, o usuário pode usar a aplicação sem refazer o login.
//assim que o refreshToken expirar, um novo login será necessário.

//usado no envio das request para setar o token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@App:accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//usado para analisar a response das request e tratar o erro, renovando o token ou deslogando o usuário se necessário.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("@App:refreshToken");
        if (!refreshToken) {
          logoutUsuarioLocal();
          return Promise.reject(error);
        }

        const response = await api.post("/refresh-token", {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("@App:accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutUsuarioLocal();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

function logoutUsuarioLocal() {
  localStorage.removeItem("@App:accessToken");
  localStorage.removeItem("@App:refreshToken");
  localStorage.removeItem("@App:user");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}
