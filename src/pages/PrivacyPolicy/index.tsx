import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Database, Lock, Eye, UserCheck, Globe, Mail } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  PageContainer,
  HeaderBanner,
  ContentWrapper,
  LastUpdated,
  Section,
  ContactBox,
  BackButton
} from './style';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Navbar />

      <HeaderBanner>
        <h1>Política de Privacidade</h1>
        <p>Saiba como tratamos e protegemos os seus dados pessoais.</p>
      </HeaderBanner>

      <ContentWrapper>
        <LastUpdated>Última atualização: 23 de julho de 2025</LastUpdated>

        <Section>
          <h2><Shield size={22} /> Introdução</h2>
          <p>
            A Aulas e Traduções ("nós", "nosso" ou "nossa") está comprometida com a proteção da privacidade
            e dos dados pessoais dos nossos alunos, visitantes e usuários. Esta Política de Privacidade descreve
            como coletamos, utilizamos, armazenamos e protegemos as informações pessoais fornecidas por você
            ao utilizar nosso site, plataforma de ensino e serviços relacionados.
          </p>
          <p>
            Ao acessar e utilizar nossos serviços, você concorda com as práticas descritas nesta política,
            em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018) e demais legislações aplicáveis.
          </p>
        </Section>

        <Section>
          <h2><Database size={22} /> Dados que Coletamos</h2>
          <p>Podemos coletar os seguintes tipos de informações pessoais:</p>

          <h3>Dados fornecidos por você</h3>
          <ul>
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone / WhatsApp</li>
            <li>Nível de conhecimento em inglês</li>
            <li>Modalidade de interesse (online ou presencial)</li>
            <li>Informações de pagamento (processadas por plataformas seguras de terceiros)</li>
          </ul>

          <h3>Dados coletados automaticamente</h3>
          <ul>
            <li>Endereço IP e dados de geolocalização aproximada</li>
            <li>Tipo de navegador e sistema operacional</li>
            <li>Páginas visitadas e tempo de permanência no site</li>
            <li>Cookies e tecnologias de rastreamento similares</li>
          </ul>
        </Section>

        <Section>
          <h2><Eye size={22} /> Finalidade do Uso dos Dados</h2>
          <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
          <ul>
            <li>Entrar em contato para agendamento de aulas experimentais gratuitas</li>
            <li>Enviar comunicações sobre cursos, promoções e novidades</li>
            <li>Personalizar sua experiência de aprendizado na plataforma</li>
            <li>Processar matrículas e gerenciar sua conta de aluno</li>
            <li>Realizar análises internas para melhoria dos nossos serviços</li>
            <li>Cumprir obrigações legais e regulatórias</li>
            <li>Garantir a segurança da plataforma e prevenir fraudes</li>
          </ul>
        </Section>

        <Section>
          <h2><Lock size={22} /> Segurança dos Dados</h2>
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso
            não autorizado, perda, destruição ou alteração. Isso inclui:
          </p>
          <ul>
            <li>Criptografia de dados em trânsito (SSL/TLS)</li>
            <li>Controle de acesso restrito a informações sensíveis</li>
            <li>Monitoramento contínuo de segurança da plataforma</li>
            <li>Backups regulares e armazenamento seguro em servidores certificados</li>
          </ul>
          <p>
            Embora nos empenhemos em proteger suas informações, nenhum sistema de segurança é completamente
            inviolável. Por isso, recomendamos que você também adote boas práticas de segurança, como utilizar
            senhas fortes e não compartilhar seus dados de acesso.
          </p>
        </Section>

        <Section>
          <h2><UserCheck size={22} /> Seus Direitos</h2>
          <p>
            De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
          </p>
          <ul>
            <li>Confirmar a existência de tratamento de dados pessoais</li>
            <li>Acessar seus dados pessoais mantidos por nós</li>
            <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
            <li>Solicitar a portabilidade dos dados a outro fornecedor de serviço</li>
            <li>Revogar o consentimento a qualquer momento</li>
            <li>Solicitar a eliminação dos dados tratados com base no consentimento</li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, entre em contato conosco através dos canais indicados
            ao final desta política. Responderemos sua solicitação no prazo legal de até 15 dias.
          </p>
        </Section>

        <Section>
          <h2><Globe size={22} /> Compartilhamento de Dados</h2>
          <p>
            Seus dados pessoais não são vendidos, alugados ou compartilhados com terceiros para fins comerciais
            que não estejam relacionados à prestação dos nossos serviços. Podemos compartilhar informações com:
          </p>
          <ul>
            <li>Processadores de pagamento para conclusão de transações financeiras</li>
            <li>Ferramentas de marketing e análise (como Google Analytics) para melhoria do serviço</li>
            <li>Autoridades competentes quando exigido por lei ou ordem judicial</li>
          </ul>
        </Section>

        <Section>
          <h2>Cookies</h2>
          <p>
            Utilizamos cookies e tecnologias similares para melhorar a experiência de navegação, personalizar
            conteúdo e analisar o tráfego do site. Você pode gerenciar suas preferências de cookies através
            das configurações do seu navegador. A desativação de alguns cookies pode afetar a funcionalidade
            do site.
          </p>
        </Section>

        <Section>
          <h2>Alterações nesta Política</h2>
          <p>
            Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento.
            Quaisquer alterações serão publicadas nesta página com a data de atualização revisada.
            Recomendamos que você revise esta política periodicamente para se manter informado sobre
            como estamos protegendo seus dados.
          </p>
        </Section>

        <Section>
          <h2><Mail size={22} /> Contato</h2>
          <p>
            Em caso de dúvidas, solicitações ou reclamações relacionadas a esta Política de Privacidade
            ou ao tratamento dos seus dados pessoais, entre em contato conosco:
          </p>
          <ContactBox>
            <p><strong>Aulas e Traduções</strong></p>
            <p>E-mail: <a href="mailto:contato@aulasetraducoes.com">contato@aulasetraducoes.com</a></p>
            <p>Telefone: <a href="tel:+5500000000000">(00) 00000-0000</a></p>
          </ContactBox>
        </Section>

        <BackButton onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Voltar à Página Inicial
        </BackButton>
      </ContentWrapper>

      <Footer />
    </PageContainer>
  );
};

export default PrivacyPolicy;
