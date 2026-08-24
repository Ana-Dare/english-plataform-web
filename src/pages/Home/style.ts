import styled from "styled-components";
import bannerBg from "../../assets/images/home/capadesktop.jpeg";
import bannerBgMobile from "../../assets/images/home/capacelular.jpeg";

export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Rubik", sans-serif;
  overflow-x: clip;
`;

export const HeroSection = styled.section`
  width: 100vw;
  height: 85vh;
  background-image: url(${bannerBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    background-image: url(${bannerBgMobile});
    background-position: top center;
    justify-content: center;
    padding: 0 5%;
  }
`;

export const FormContainer = styled.div`
  position: relative;
  z-index: 2;
  background: #08142c;
  padding: 1.5rem 1.8rem;
  border-radius: 14px;
  width: 100%;
  max-width: 380px;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 100px;

  @media (max-width: 768px) {
    padding: 1.2rem;
    margin-top: 80px;
    width: 100%;
    max-width: 90vw;
    gap: 0.5rem;
    border-radius: 12px;
  }
`;

export const FormTitle = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0;
  text-align: center;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const FormSubtitle = styled.p`
  color: #f0f0f0;
  font-size: 0.8rem;
  font-weight: 400;
  margin-bottom: 0.2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.78rem;
    margin-bottom: 0.2rem;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.3rem;
`;

export const FormLabel = styled.label`
  font-size: 0.78rem;
  color: #ffffff;
  font-style: italic;
  font-weight: 700;
  margin-left: 0.2rem;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem 0.7rem;
    border: none;
    background: transparent;
    font-family: "Rubik", sans-serif;
    font-size: 0.85rem;
    color: #333;
    outline: none;

    &::placeholder {
      color: #999;
    }
  }

  textarea {
    resize: none;
    height: 70px;

    @media (max-width: 768px) {
      height: 50px;
    }
  }
`;

export const PhonePrefix = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0 0.6rem;
  border-right: 1px solid #ccc;
  color: #333;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  white-space: nowrap;

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const RequiredText = styled.p`
  font-size: 0.85rem;
  color: #ffffff;
  font-style: italic;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-bottom: 0.3rem;

  input[type="checkbox"] {
    margin-top: 0.15rem;
    width: 15px;
    height: 15px;
    cursor: pointer;
    flex-shrink: 0;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 0.72rem;
  color: #f0f0f0;
  line-height: 1.3;
  font-style: italic;

  a {
    color: #c49a6c;
    text-decoration: underline;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const RadioQuestionLabel = styled.p`
  font-size: 0.78rem;
  color: #ffffff;
  font-style: italic;
  font-weight: 700;
  margin: 0 0 0.15rem 0.2rem;
`;

export const RadioOptions = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const RadioOption = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1.5px solid #ffffff;
  border-radius: 6px;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Rubik", sans-serif;
  transition: all 0.2s ease;

  input[type="radio"] {
    accent-color: #c49a6c;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  &:has(input:checked) {
    border-color: #c49a6c;
    background: rgba(255, 255, 255, 0.1);
    color: #c49a6c;
    font-weight: 600;
  }

  &:hover {
    border-color: #c49a6c;
  }
`;

export const SubmitButton = styled.button`
  background: #08142c;
  color: #ffffff;
  border: none;
  padding: 0.7rem;
  font-size: 0.85rem;
  font-weight: 800;
  font-style: italic;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Rubik", sans-serif;
  transition: all 0.3s ease;
  margin-top: 0.2rem;
  box-shadow: 0 4px 15px rgba(8, 20, 44, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #1a365d;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(8, 20, 44, 0.45);
  }
`;

export const WhatsAppButton = styled.button`
  background: #25d366;
  color: #ffffff;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 800;
  font-style: italic;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Rubik", sans-serif;
  transition: all 0.3s ease;
  margin-top: 0.2rem;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #20ba59;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
  }
`;

export const InfoSectionWrapper = styled.div`
  width: 100vw;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 3rem 10%;
  box-sizing: border-box;
  gap: 4rem;

  @media (max-width: 768px) {
    padding: 3rem 5%;
    gap: 3rem;
  }
`;

export const InfoRow = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  align-items: center;
  justify-content: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2.5rem;
    align-items: flex-start;
  }
`;

export const InfoImageWrapper = styled.div<{ reverse?: boolean }>`
  flex: 1;
  width: 100%;
  max-width: 500px;
  position: relative;
`;

export const InfoImageContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease;

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }
`;

export const InfoTextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    align-items: flex-start;
    text-align: left;
  }

  h3 {
    font-size: 2.8rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
    font-family: "Montserrat", "Helvetica Neue", sans-serif;
    letter-spacing: -0.5px;

    color: #0a192f;

    span {
      font-weight: 600;
      display: inline-block;
    }

    @media (max-width: 768px) {
      font-size: 2rem;
      text-align: left;
    }
  }

  p {
    font-size: 1.1rem;
    color: #59748c; /* Grayish blue matching the screenshot */
    line-height: 1.6;
    font-weight: 400; /* Thin appearance */
    font-family:
      "Arial", "Helvetica Neue", Helvetica, sans-serif; /* Clean, standard thin font like the image */
  }
`;

export const InfoButton = styled.button`
  background: #08142c;
  color: #fff;
  border: none;
  padding: 0.9rem 2.2rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Montserrat", "Helvetica Neue", sans-serif;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(8, 20, 44, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(8, 20, 44, 0.45);
    background: #1a365d;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
    width: 100%;
    max-width: 320px;
    align-self: center;
  }
`;

export const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #c62828;
  font-size: 0.72rem;
  font-weight: 500;
  margin-top: 0.1rem;

  svg {
    flex-shrink: 0;
  }
`;

export const SuccessOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
  gap: 0.8rem;
  min-height: 300px;

  svg {
    color: #2e7d32;
    stroke-width: 1.5;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0e2a52;
    margin: 0;
  }

  p {
    font-size: 0.88rem;
    color: #555;
    line-height: 1.5;
    margin: 0;
    max-width: 320px;
  }
`;
