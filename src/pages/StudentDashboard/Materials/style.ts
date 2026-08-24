import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    margin: 0;
    color: #333;
    font-size: 1.8rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 1rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  /* Esconder a barra de rolagem mas manter a funcionalidade */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 4px;
  }
`;

export const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active }) => ($active ? '#2563eb' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#666')};
  border: 1px solid ${({ $active }) => ($active ? '#2563eb' : '#e0e0e0')};
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#1d4ed8' : '#f5f5f5')};
  }
`;

export const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
`;

export const PdfCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: #d4af37;

    .download-btn {
      background-color: #2563eb;
      color: #fff;
    }
  }
`;

export const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background-color: #EAE0D5;
  color: #1e3a8a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  h4 {
    margin: 0;
    color: #333;
    font-size: 1.05rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    color: #888;
    font-size: 0.85rem;
  }
`;

export const DownloadButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: transparent;
  color: #555;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;

  svg {
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: translateY(2px);
  }
`;

export const Tag = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #fcedb3;
  color: #8a6d00;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  text-transform: uppercase;
`;
