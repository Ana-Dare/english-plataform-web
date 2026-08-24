import {
  Heart,
  Zap,
  UserCheck,
  MessageCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  MethodContainer,
  Header,
  Title,
  Subtitle,
  CardsGrid,
  Card,
  IconWrapper,
  CardTitle,
  CardText,
} from "./style";

const MethodSection = () => {
  const cards = [
    {
      icon: <Heart size={30} strokeWidth={1.5} />,
      title: "Ambiente Acolhedor",
      text: "Os alunos se sentem à vontade e acolhidos, permitindo que se expressem livremente e cometam erros sem medo.",
      gradient: "#0e2a52",
    },
    {
      icon: <Zap size={30} strokeWidth={1.5} />,
      title: "Método de Ensino Dinâmico e Interativo",
      text: "Método é dinâmico, envolvente e mantém o aluno participando, falando e aprendendo de verdade.",
      gradient: "#C49A6C",
    },
    {
      icon: <UserCheck size={30} strokeWidth={1.5} />,
      title: "Conexão Professor-Aluno",
      text: "Professor conhece as necessidades do aluno e adapta as aulas de acordo com as características pessoais de cada um.",
      gradient: "#0e2a52",
    },
    {
      icon: <MessageCircle size={30} strokeWidth={1.5} />,
      title: "Foco na Conversação",
      text: "Aprender falando e não decorando regras gramaticais. O aluno fala desde a primeira aula, destravando o idioma de forma natural.",
      gradient: "#C49A6C",
    },
    {
      icon: <TrendingUp size={30} strokeWidth={1.5} />,
      title: "Estímulo ao Crescimento Pessoal e Confiança",
      text: "Mais que aprender, é sobre transformar. Nosso ensino incentiva a superação de barreiras e a confiança para o mundo real.",
      gradient: "#0e2a52",
    },
    {
      icon: <Users size={30} strokeWidth={1.5} />,
      title: "Sentido de Comunidade",
      text: "Os alunos sentem que não estão sozinhos e podem interagir com outros estudantes em um ecossistema de aprendizado colaborativo.",
      gradient: "#C49A6C",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // const cardVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 60,
  //     scale: 0.9,
  //     rotateX: 20,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     scale: 1,
  //     rotateX: 0,
  //     transition: {
  //       type: "spring",
  //       stiffness: 100,
  //       damping: 12,
  //       mass: 1,
  //     },
  //   },
  // };

  return (
    <MethodContainer>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Header as={motion.div}>
          <Title>Método validado por milhares de alunos</Title>
          <Subtitle>
            Com <strong>foco na conversação</strong> desde o primeiro dia,{" "}
            <strong>turmas reduzidas</strong> e{" "}
            <strong>suporte completo</strong>, oferecemos um modelo pedagógico
            que gera resultados reais - e isso faz toda a diferença!
          </Subtitle>
        </Header>
      </motion.div>

      <CardsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            as={motion.div}
            gradient={card.gradient}
            whileHover={{
              scale: 1.03,
              y: -10,
              boxShadow: "0 20px 45px rgba(14, 42, 82, 0.3)",
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
          >
            <IconWrapper className="icon-wrapper">{card.icon}</IconWrapper>
            <CardTitle>{card.title}</CardTitle>
            <CardText>{card.text}</CardText>
          </Card>
        ))}
      </CardsGrid>
    </MethodContainer>
  );
};

export default MethodSection;
