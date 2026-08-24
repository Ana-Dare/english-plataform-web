import styled from "styled-components";
import bannerBg from "../../assets/images/home/capadesktop.jpeg";
import bannerBgMobile from "../../assets/images/home/capacelular.jpeg";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Rubik", sans-serif;
  background-color: #fafafa;
  overflow-x: clip;
`;

export const HeaderSection = styled.header`
  width: 100vw;
  padding: 14rem 10% 10rem;
  background-color: #0b0b1a;
  background-image: linear-gradient(rgba(11, 11, 26, 0.9), rgba(11, 11, 26, 0.9)), url(${bannerBg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  box-sizing: border-box;

  h1 {
    font-size: 3.8rem;
    font-weight: 800;
    margin-bottom: 1rem;
    
    span {
      color: #D4AF37;
    }
  }

  p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
    max-width: 600px;
  }

  @media (max-width: 768px) {
    background-image: linear-gradient(rgba(11, 11, 26, 0.9), rgba(11, 11, 26, 0.9)), url(${bannerBgMobile});
    padding: 10rem 5% 8rem;
    h1 {
      font-size: 2.8rem;
    }
  }
`;

export const VideoContainer = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 4rem 5% 0;
  background-color: transparent;
  z-index: 10;
  position: relative;
`;

export const VideoWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
  border: 4px solid #fff;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export const CoursesContainer = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 8rem 10%;
  gap: 8rem;
  background-color: #fafafa;
  box-sizing: border-box;

  @media (max-width: 968px) {
    padding: 5rem 5%;
    gap: 5rem;
  }
`;

export const CourseRow = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  gap: 6rem;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: left;
  }
`;

export const CourseImageWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  
  .image-container {
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
    position: relative;
    z-index: 2;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: 20px;
    bottom: 20px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, transparent 100%);
    border-radius: 30px;
    z-index: 1;
  }
`;

export const CourseContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;

  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

export const Badge = styled.span<{ isVip?: boolean }>`
  background-color: ${({ isVip }) => (isVip ? 'rgba(212, 175, 55, 0.15)' : 'rgba(26, 54, 93, 0.1)')};
  color: ${({ isVip }) => (isVip ? '#D4AF37' : '#1A365D')};
  padding: 0.6rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 800;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
`;

export const CourseTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;

  span {
    color: #0e2a52;
    display: inline-block;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const CourseDescription = styled.p`
  font-size: 1.15rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  font-family: "Rubik", sans-serif;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 3rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.05rem;
    color: #333;
    font-weight: 500;
    font-family: "Rubik", sans-serif;

    svg {
      color: #0e2a52;
      min-width: 24px;
      stroke-width: 2.5;
    }
  }
`;

export const ActionButton = styled.button<{ isVip?: boolean }>`
  padding: 1.2rem 3rem;
  border-radius: 50px;
  border: none;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ isVip }) => isVip ? `
    background: linear-gradient(135deg, #D4AF37 0%, #b5952f 100%);
    color: #1a1a2e;
    &:hover { 
      transform: translateY(-3px);
      box-shadow: 0 15px 25px rgba(212, 175, 55, 0.3);
    }
  ` : `
    background: #0e2a52;
    color: #fff;
    &:hover { 
      transform: translateY(-3px);
      box-shadow: 0 15px 25px rgba(14, 42, 82, 0.3);
    }
  `}
`;
