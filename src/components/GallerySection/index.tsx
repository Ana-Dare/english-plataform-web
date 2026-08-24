import {
  GalleryWrapper,
  GalleryHeader,
  GalleryGrid,
  GalleryCard,
  GalleryImage,
  CardOverlayContent
} from "./style";

import img1 from "../../assets/images/home/info1.png";
import img2 from "../../assets/images/home/info2.png";
import img3 from "../../assets/images/home/journey1.png";
import img4 from "../../assets/images/home/journey2.png";
import img5 from "../../assets/images/two-woman.png";
import img6 from "../../assets/images/woman.jpg";

const galleryItems = [
  {
    id: 1,
    src: img1,
    title: "Aprendizado em Equipe",
    subtitle: "Estude com quem te inspira",
    span: 1
  },
  {
    id: 2,
    src: img4,
    title: "Foco no seu Futuro",
    subtitle: "Prepare-se para o mundo",
    span: 2
  },
  {
    id: 3,
    src: img5,
    title: "Conexões que Transformam",
    subtitle: "A fluência que abre portas",
    span: 2
  },
  {
    id: 4,
    src: img3,
    title: "Explore o Mundo",
    subtitle: "Inglês para viver aventuras",
    span: 1
  },
  {
    id: 5,
    src: img6,
    title: "Confiança em Cada Palavra",
    subtitle: "Você pronto para qualquer conversa",
    span: 1
  },
  {
    id: 6,
    src: img2,
    title: "Comunidade Global",
    subtitle: "Faça parte de algo maior",
    span: 2
  }
];

const GallerySection = () => {
  return (
    <GalleryWrapper>
      <GalleryHeader>
        <span>Nossa Comunidade</span>
        <h2>
          Histórias de quem <em>transformou</em> o seu inglês
        </h2>
        <p>
          Cada imagem conta uma jornada real. Veja de perto como nossos alunos vivem 
          a experiência de aprender inglês de verdade.
        </p>
      </GalleryHeader>

      <GalleryGrid>
        {galleryItems.map((item) => (
          <GalleryCard key={item.id} span={item.span}>
            <GalleryImage src={item.src} alt={item.title} />
            <CardOverlayContent>
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </CardOverlayContent>
          </GalleryCard>
        ))}
      </GalleryGrid>
    </GalleryWrapper>
  );
};

export default GallerySection;
