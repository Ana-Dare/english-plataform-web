import { useEffect, useState } from "react";
import {
  SidebarContent,
  SidebarImage,
  SidebarStyle,
  SidebarTitle,
  SidebarTitleText,
} from "./style";

import woman from "../../assets/images/woman.jpg";
import twoWoman from "../../assets/images/two-woman.png";
import usaFlag from "../../assets/images/usa-flag.jpg";
import logoCl from "../../assets/images/logo-black.png";

const Sidebar = () => {
  const [indexImg, setIndexImg] = useState(0);
  const [indexAlt, setIndexAlt] = useState(0);
  const [indexText, setIndexText] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const images = [woman, twoWoman, usaFlag];

  const altImg = [
    "Mulher sorrindo",
    "Duas mulheres sorrindo",
    "Bandeira dos Estados Unidos",
  ];

  const text = [
    "Aulas e traduções de inglês em um só lugar.",
    "Expanda seus horizontes e domine um novo idioma.",
    "Métodos práticos e personalizados para a sua fluência.",
  ];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setIsAnimating(false);

      timeout = setTimeout(() => {
        setIndexImg((prevIndex) => (prevIndex + 1) % images.length);
        setIndexText((prevIndex) => (prevIndex + 1) % text.length);
        setIndexAlt((prevIndex) => (prevIndex + 1) % altImg.length);

        setIsAnimating(true);
      }, 1000);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <SidebarStyle className={isAnimating ? "fade-in" : "fade-out"}>
        <SidebarTitle>
          <img src={logoCl} alt="Logo Lara Charantola" />
          <SidebarTitleText>
            <h5>Lara Charantola: Aulas e Traduções</h5>
            <p>Professora online | Teacher | Tradutora</p>
          </SidebarTitleText>
        </SidebarTitle>
        <SidebarContent>
          <h4>{text[indexText]}</h4>
          <h5>LC Aulas e Traduções</h5>
          <h6>Sua plataforma de ensino personalizada</h6>
        </SidebarContent>
        <SidebarImage>
          <img src={images[indexImg]} alt={altImg[indexAlt]} />
        </SidebarImage>
      </SidebarStyle>
    </>
  );
};

export default Sidebar;
