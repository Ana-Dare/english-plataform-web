import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  FaqContainer,
  ContentWrapper,
  TextColumn,
  Title,
  Description,
  FaqColumn,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
  ContactButton
} from "./style";

const faqs = [
  {
    question: "Como funcionam as aulas de conversação?",
    answer: "Nossas aulas são focadas 100% na prática. Desde o primeiro dia, você será incentivado a falar em inglês, simulando situações reais do cotidiano e do ambiente corporativo."
  },
  {
    question: "Em quanto tempo consigo alcançar a fluência?",
    answer: "A fluência depende do seu nível inicial e dedicação, mas com a nossa metodologia intensiva e prática, muitos alunos conseguem se comunicar com confiança em até 12 meses."
  },
  {
    question: "Posso cancelar ou reagendar uma aula?",
    answer: "Sim! Entendemos que imprevistos acontecem. Você pode reagendar suas aulas pela plataforma com até 24 horas de antecedência sem nenhum custo adicional."
  },
  {
    question: "O material didático está incluso?",
    answer: "Completamente! Todo o material em áudio, vídeo, e os PDFs interativos que usamos em aula estão inclusos na sua assinatura. Não cobramos taxas extras por material."
  },
  {
    question: "As aulas são em grupo ou individuais?",
    answer: "Oferecemos ambas as modalidades. Você pode escolher aulas particulares para foco total ou turmas hiper-reduzidas (até 4 pessoas) para praticar com outros alunos."
  },
  {
    question: "Preciso ter conhecimento prévio de inglês?",
    answer: "Não. Temos módulos desenvolvidos especificamente para quem está começando do absoluto zero, até o nível mais avançado focado em negócios."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FaqContainer>
      <ContentWrapper>
        <TextColumn>
          <Title>
            Ficou com alguma <span>dúvida?</span>
          </Title>
          <Description>
            Nossa equipe está sempre pronta para ajudar você a alcançar seus objetivos 
            no inglês. Confira as perguntas mais comuns dos nossos alunos e entenda 
            por que somos a melhor escolha para sua carreira.
          </Description>
          <ContactButton>Falar com especialista</ContactButton>
        </TextColumn>

        <FaqColumn>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} isOpen={openIndex === index}>
              <AccordionHeader onClick={() => toggleAccordion(index)}>
                {faq.question}
                <ChevronDown 
                  size={20} 
                  style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)' }} 
                />
              </AccordionHeader>
              <AccordionContent isOpen={openIndex === index}>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </FaqColumn>
      </ContentWrapper>
    </FaqContainer>
  );
};

export default FaqSection;
