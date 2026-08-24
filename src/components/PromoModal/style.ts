import styled from "styled-components";
import bannerBg from "../../assets/images/home/capadesktop.jpeg";
import bannerBgMobile from "../../assets/images/home/capacelular.jpeg";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 10000; /* Bem alto para ficar acima de tudo */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
  position: relative;
  max-height: 90vh;

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  z-index: 10;
  transition: color 0.3s;

  &:hover {
    color: #000;
  }

  @media (max-width: 768px) {
    color: #fff; /* Fica em cima da imagem escurecida no mobile */
    top: 0.5rem;
    right: 1rem;
  }
`;

export const ModalImageArea = styled.div`
  flex: 1;
  background-image: url(${bannerBg});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Overlay escuro para destacar o texto */
  }

  h2 {
    position: relative;
    z-index: 2;
    color: #fff;
    font-size: 3rem;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 1.2;
    text-shadow: 0 4px 10px rgba(0,0,0,0.5);

    span {
      color: #D4AF37;
      display: block;
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    background-image: url(${bannerBgMobile});
    min-height: 250px;
    padding: 2rem;
    
    h2 {
      font-size: 2rem;
      span { font-size: 1.2rem; }
    }
  }
`;

export const ModalFormArea = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const ModalFormTitle = styled.h3`
  font-size: 1.5rem;
  color: #000;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  
  span {
    color: #D4AF37;
  }
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #D4AF37;
    outline: none;
    box-shadow: 0 0 5px rgba(212, 175, 55, 0.3);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    border-color: #D4AF37;
    outline: none;
  }
`;

export const ModalSubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #D4AF37 0%, #b58d55 100%);
  color: #fff;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.4);
  }
`;
