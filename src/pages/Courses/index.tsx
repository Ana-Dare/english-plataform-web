import Navbar from "../../components/Navbar";
import CourseDescriptionSection from "../../components/CourseDescriptionSection";
import CourseBenefitsSection from "../../components/CourseBenefitsSection";
import WhyChooseUsSection from "../../components/WhyChooseUsSection";
import { CheckCircle2 } from "lucide-react";
import {
  PageContainer,
  HeaderSection,
  VideoContainer,
  VideoWrapper,
  CoursesContainer,
  CourseRow,
  CourseImageWrapper,
  CourseContent,
  Badge,
  CourseTitle,
  CourseDescription,
  FeatureList,
  ActionButton
} from "./style";

import imgRegular from '../../assets/images/home/info1.png';
import imgVip from '../../assets/images/home/professional_man.png';

const PageCourses = () => {
  return (
    <PageContainer>
      <Navbar />

      <HeaderSection>
        <h1>Nossos <span>Cursos</span> de Inglês</h1>
        <p>Escolha a modalidade que melhor se adapta à sua rotina e aos seus objetivos. Ambas garantem resultados consistentes.</p>
      </HeaderSection>

      <VideoContainer>
        <VideoWrapper>
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Vídeo de Apresentação" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </VideoWrapper>
      </VideoContainer>

      <CourseDescriptionSection />

      <CourseBenefitsSection />

      <CoursesContainer>
        {/* Curso Regular */}
        <CourseRow>
          <CourseImageWrapper>
            <div className="image-container">
              <img src={imgRegular} alt="Inglês Regular" />
            </div>
          </CourseImageWrapper>
          <CourseContent>
            <Badge>Formato Padrão</Badge>
            <CourseTitle>Inglês <span>Regular</span></CourseTitle>
            <CourseDescription>
              Aprenda de forma dinâmica e interativa, com foco total na conversação e vivência real, ideal para quem quer uma evolução constante.
            </CourseDescription>
            
            <FeatureList>
              <li><CheckCircle2 size={24} /> Aulas em turmas reduzidas</li>
              <li><CheckCircle2 size={24} /> Material focado em vivência americana</li>
              <li><CheckCircle2 size={24} /> Plataforma de exercícios e áudios</li>
              <li><CheckCircle2 size={24} /> Acompanhamento de progresso</li>
              <li><CheckCircle2 size={24} /> Foco em comunicação destravada</li>
            </FeatureList>

            <ActionButton>Falar com consultor</ActionButton>
          </CourseContent>
        </CourseRow>

        {/* Curso VIP */}
        <CourseRow reverse>
          <CourseImageWrapper>
            <div className="image-container">
              <img src={imgVip} alt="Inglês VIP" />
            </div>
          </CourseImageWrapper>
          <CourseContent>
            <Badge isVip>Exclusivo</Badge>
            <CourseTitle>Inglês <span>VIP</span></CourseTitle>
            <CourseDescription>
              Aulas 100% particulares e personalizadas. O ritmo, o vocabulário e o foco são inteiramente desenhados para o seu objetivo específico.
            </CourseDescription>
            
            <FeatureList>
              <li><CheckCircle2 size={24} /> Aulas particulares (1 on 1)</li>
              <li><CheckCircle2 size={24} /> Horários flexíveis e adaptáveis</li>
              <li><CheckCircle2 size={24} /> Vocabulário focado na sua profissão</li>
              <li><CheckCircle2 size={24} /> Material didático exclusivo</li>
              <li><CheckCircle2 size={24} /> Mentoria de carreira em inglês</li>
            </FeatureList>

            <ActionButton isVip>Quero ser aluno VIP</ActionButton>
          </CourseContent>
        </CourseRow>
      </CoursesContainer>

      <WhyChooseUsSection />

    </PageContainer>
  );
};

export default PageCourses;
