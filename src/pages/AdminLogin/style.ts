import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ─── PÁGINA COMPLETA ─── */
export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #0f1e35;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* ─── LADO ESQUERDO – Fundo Azul Escuro ─── */
export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: rgba(197, 122, 103, 0.08);
    top: -100px;
    left: -100px;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.06);
    bottom: -80px;
    right: -80px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem 2rem;
    align-items: center;
    text-align: center;
    flex: 0;
  }
`;

export const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 4rem;

  span {
    font-family: 'Rubik', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.5px;

    em {
      font-style: normal;
      color: #C57A67;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const LeftContent = styled(motion.div)`
  max-width: 420px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const LeftTitle = styled.h1`
  font-family: 'Rubik', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  letter-spacing: -1px;

  span {
    color: #C57A67;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const LeftSubtitle = styled.p`
  font-family: 'Rubik', sans-serif;
  color: #94a3b8;
  font-size: 1.05rem;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 1.5rem;
  }
`;

export const Badge = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  font-family: 'Rubik', sans-serif;
  font-size: 0.82rem;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

/* ─── LADO DIREITO – Card Bege/Quente ─── */
export const RightPanel = styled.div`
  width: 480px;
  background: #fdf8f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2.5rem;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.15);
    border-radius: 28px 28px 0 0;
    padding: 2.5rem 1.5rem 3rem;
  }
`;

export const FormWrapper = styled(motion.div)`
  width: 100%;
  max-width: 380px;
`;

export const FormHeader = styled.div`
  margin-bottom: 2.5rem;
`;

export const FormTitle = styled.h2`
  font-family: 'Rubik', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  color: #1F2B45;
  margin-bottom: 0.4rem;
  letter-spacing: -0.5px;
`;

export const FormSubtitle = styled.p`
  font-family: 'Rubik', sans-serif;
  color: #64748b;
  font-size: 0.95rem;
`;

/* ─── INPUTS ─── */
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  font-family: 'Rubik', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  display: block;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 3rem;
  border-radius: 12px;
  border: 1.5px solid #e2d5ca;
  background: #fff;
  font-size: 0.98rem;
  font-family: 'Rubik', sans-serif;
  color: #1F2B45;
  transition: all 0.25s ease;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: #1F2B45;
    box-shadow: 0 0 0 4px rgba(31, 43, 69, 0.08);
  }

  &::placeholder {
    color: #b0a89f;
    font-size: 0.93rem;
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 0.9rem;
  color: #b0a89f;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.25s ease;

  ${InputWrapper}:focus-within & {
    color: #1F2B45;
  }
`;

/* ─── ERRO ─── */
export const ErrorMsg = styled(motion.div)`
  background: #fff1f2;
  border: 1px solid #fecdd3;
  color: #e11d48;
  font-family: 'Rubik', sans-serif;
  font-size: 0.88rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

/* ─── BOTÃO ─── */
export const LoginBtn = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: none;
  background: #1F2B45;
  color: #fff;
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  transition: background 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 14px rgba(31, 43, 69, 0.2);

  &:hover:not(:disabled) {
    background: #2a3b5c;
    box-shadow: 0 6px 20px rgba(31, 43, 69, 0.3);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const BackLink = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  font-family: 'Rubik', sans-serif;
  font-size: 0.88rem;
  margin-top: 1.5rem;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: color 0.2s ease;

  &:hover {
    color: #1F2B45;
  }
`;
