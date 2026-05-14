import { ContainerImage, HomeStyle } from "./style";
import imageHome from "../../assets/images/home.jpg";

const PageHome = () => {
  return (
    <HomeStyle>
      <p>Em andamento...</p>
      <ContainerImage>
        <img src={imageHome} alt="" />
      </ContainerImage>
    </HomeStyle>
  );
};

export default PageHome;
