import Navbar from "../../components/Navbar";
import AnnouncementBanner from "../../components/AnnouncementBanner";
import FreedomSection from "../../components/FreedomSection";
import MethodSection from "../../components/MethodSection";
import DoubtSection from "../../components/DoubtSection";
import WhyStudySection from "../../components/WhyStudySection";
import FaqSection from "../../components/FaqSection";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import { ChevronDown, CheckCircle, AlertCircle } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { useState } from "react";
import {
  HomeContainer,
  HeroSection,
  FormContainer,
  FormTitle,
  FormSubtitle,
  InputGroup,
  FormLabel,
  InputWrapper,
  PhonePrefix,
  CheckboxGroup,
  CheckboxLabel,
  RadioGroup,
  RadioQuestionLabel,
  RadioOptions,
  RadioOption,
  SubmitButton,
  InfoSectionWrapper,
  InfoRow,
  InfoImageContainer,
  InfoImageWrapper,
  InfoTextContainer,
  InfoButton,
  ErrorMessage,
  SuccessOverlay,
} from "./style";
import infoImage1 from "../../assets/images/home/info1.png";
import infoImage2 from "../../assets/images/home/info2.png";

const PageHome = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    conhecimento: "",
    modalidade: "",
    privacidade: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Preencha seu nome";
    if (!formData.email.trim()) newErrors.email = "Preencha seu e-mail";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Informe um e-mail válido";
    if (!formData.telefone.trim()) newErrors.telefone = "Preencha seu telefone";
    if (!formData.conhecimento) newErrors.conhecimento = "Selecione uma opção";
    if (!formData.modalidade) newErrors.modalidade = "Selecione uma modalidade";
    if (!formData.privacidade)
      newErrors.privacidade = "Você precisa aceitar a política de privacidade";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <HomeContainer>
      <AnnouncementBanner />
      <Navbar />

      <HeroSection>
        <FormContainer>
          {submitted ? (
            <SuccessOverlay>
              <CheckCircle size={52} />
              <h3>Enviado com sucesso!</h3>
              <p>
                Recebemos seus dados. Em breve nossa equipe entrará em contato
                com você.
              </p>
              <SubmitButton
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    nome: "",
                    email: "",
                    telefone: "",
                    conhecimento: "",
                    modalidade: "",
                    privacidade: false,
                  });
                }}
              >
                Enviar novamente
              </SubmitButton>
            </SuccessOverlay>
          ) : (
            <>
              <FormTitle>Aula Experimental</FormTitle>
              <FormSubtitle>
                Venha fazer uma aula de inglês experimental!
              </FormSubtitle>

              <InputGroup>
                <FormLabel>Nome</FormLabel>
                <InputWrapper
                  style={errors.nome ? { borderColor: "#C62828" } : {}}
                >
                  <input
                    type="text"
                    placeholder="Ex: João"
                    value={formData.nome}
                    onChange={(e) => {
                      setFormData({ ...formData, nome: e.target.value });
                      setErrors({ ...errors, nome: "" });
                    }}
                  />
                </InputWrapper>
                {errors.nome && (
                  <ErrorMessage>
                    <AlertCircle size={13} /> {errors.nome}
                  </ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <FormLabel>E-mail</FormLabel>
                <InputWrapper
                  style={errors.email ? { borderColor: "#C62828" } : {}}
                >
                  <input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                  />
                </InputWrapper>
                {errors.email && (
                  <ErrorMessage>
                    <AlertCircle size={13} /> {errors.email}
                  </ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <FormLabel>Número de celular</FormLabel>
                <InputWrapper
                  style={{
                    paddingLeft: 0,
                    ...(errors.telefone ? { borderColor: "#C62828" } : {}),
                  }}
                >
                  <PhonePrefix>
                    BR +55 <ChevronDown size={14} />
                  </PhonePrefix>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => {
                      setFormData({ ...formData, telefone: e.target.value });
                      setErrors({ ...errors, telefone: "" });
                    }}
                  />
                </InputWrapper>
                {errors.telefone && (
                  <ErrorMessage>
                    <AlertCircle size={13} /> {errors.telefone}
                  </ErrorMessage>
                )}
              </InputGroup>

              <RadioGroup>
                <RadioQuestionLabel>
                  Você já tem conhecimento em inglês?
                </RadioQuestionLabel>
                <RadioOptions>
                  <RadioOption>
                    <input
                      type="radio"
                      name="conhecimento"
                      value="sim"
                      checked={formData.conhecimento === "sim"}
                      onChange={() => {
                        setFormData({ ...formData, conhecimento: "sim" });
                        setErrors({ ...errors, conhecimento: "" });
                      }}
                    />{" "}
                    Sim, tenho
                  </RadioOption>
                  <RadioOption>
                    <input
                      type="radio"
                      name="conhecimento"
                      value="nao"
                      checked={formData.conhecimento === "nao"}
                      onChange={() => {
                        setFormData({ ...formData, conhecimento: "nao" });
                        setErrors({ ...errors, conhecimento: "" });
                      }}
                    />{" "}
                    Não tenho
                  </RadioOption>
                </RadioOptions>
                {errors.conhecimento && (
                  <ErrorMessage>
                    <AlertCircle size={13} /> {errors.conhecimento}
                  </ErrorMessage>
                )}
              </RadioGroup>

              <RadioGroup>
                <RadioQuestionLabel>Modalidade de interesse</RadioQuestionLabel>
                <RadioOptions>
                  <RadioOption>
                    <input
                      type="radio"
                      name="modalidade"
                      value="online"
                      checked={formData.modalidade === "online"}
                      onChange={() => {
                        setFormData({ ...formData, modalidade: "online" });
                        setErrors({ ...errors, modalidade: "" });
                      }}
                    />{" "}
                    Online
                  </RadioOption>
                  <RadioOption>
                    <input
                      type="radio"
                      name="modalidade"
                      value="presencial"
                      checked={formData.modalidade === "presencial"}
                      onChange={() => {
                        setFormData({ ...formData, modalidade: "presencial" });
                        setErrors({ ...errors, modalidade: "" });
                      }}
                    />{" "}
                    Presencial
                  </RadioOption>
                </RadioOptions>
                {errors.modalidade && (
                  <ErrorMessage>
                    <AlertCircle size={13} /> {errors.modalidade}
                  </ErrorMessage>
                )}
              </RadioGroup>

              <CheckboxGroup>
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.privacidade}
                  onChange={(e) => {
                    setFormData({ ...formData, privacidade: e.target.checked });
                    setErrors({ ...errors, privacidade: "" });
                  }}
                />
                <CheckboxLabel htmlFor="privacy">
                  Ao avançar, você aceita nossa{" "}
                  <a href="/politica-de-privacidade" target="_blank">
                    política de privacidade
                  </a>{" "}
                  e o envio de comunicações.
                </CheckboxLabel>
              </CheckboxGroup>
              {errors.privacidade && (
                <ErrorMessage style={{ marginTop: "-0.2rem" }}>
                  <AlertCircle size={13} /> {errors.privacidade}
                </ErrorMessage>
              )}

              <SubmitButton type="button" onClick={handleSubmit}>
                QUERO GARANTIR MINHA VAGA
              </SubmitButton>
            </>
          )}
        </FormContainer>
      </HeroSection>

      <InfoSectionWrapper>
        {/* Bloco 1: Imagem na Esquerda, Texto na Direita */}
        <InfoRow>
          <Reveal direction="right" delay={200}>
            <InfoImageWrapper>
              <InfoImageContainer>
                <img src={infoImage1} alt="Alunos estudando juntos" />
              </InfoImageContainer>
            </InfoImageWrapper>
          </Reveal>
          <Reveal direction="left" delay={400}>
            <InfoTextContainer>
              <h3>
                <span>Nossa</span> Metodologia
              </h3>
              <p>
                Acreditamos que aprender inglês não precisa ser entediante.
                Nossa abordagem é focada na prática e na vivência real do
                idioma.
              </p>
              <p>
                Preparamos você para interações autênticas, utilizando materiais
                e cenários que simulam a vida nos Estados Unidos, garantindo
                fluência e confiança em qualquer situação corporativa ou
                acadêmica.
              </p>
              <InfoButton>Saiba mais sobre a metodologia</InfoButton>
            </InfoTextContainer>
          </Reveal>
        </InfoRow>

        {/* Bloco 2: Texto na Esquerda, Imagem na Direita (reverse) */}
        <InfoRow reverse>
          <Reveal direction="left" delay={200}>
            <InfoImageWrapper reverse>
              <InfoImageContainer>
                <img src={infoImage2} alt="Grupo de amigos interagindo" />
              </InfoImageContainer>
            </InfoImageWrapper>
          </Reveal>
          <Reveal direction="right" delay={400}>
            <InfoTextContainer>
              <h3>
                <span>Sobre</span> Nós
              </h3>
              <p>
                Somos mais que uma plataforma de ensino. Somos uma ponte para o
                seu sucesso internacional. Com anos de experiência em aulas e
                traduções, oferecemos um serviço personalizado para o seu
                perfil.
              </p>
              <p>
                Nossos professores e tradutores são especialistas apaixonados
                pelo que fazem, sempre prontos para ajudar você a romper
                barreiras e alcançar seus sonhos globais.
              </p>
              <InfoButton>Conheça nossa equipe</InfoButton>
            </InfoTextContainer>
          </Reveal>
        </InfoRow>
      </InfoSectionWrapper>

      <FreedomSection />

      <WhyStudySection />

      <MethodSection />

      <DoubtSection />

      <FaqSection />

      <Footer />

      <ScrollToTop />
    </HomeContainer>
  );
};

export default PageHome;
