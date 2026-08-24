import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: fadeIn 0.3s ease-in-out;
  height: 100%;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #08142c;
  margin: 0;
`;

export const RightActions = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 340px;
  flex-shrink: 0;

  svg {
    position: absolute;
    left: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    transition: color 0.2s;
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem 0.85rem 3rem;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #fdfdfd;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);

    &:focus {
      background: #fff;
      border-color: #1a3d6e;
      box-shadow: 0 4px 12px rgba(26, 61, 110, 0.15);
    }
    
    &::placeholder {
      color: #aaa;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-shrink: 0;
  background: linear-gradient(135deg, #08142c 0%, #1a3d6e 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 10px rgba(8, 20, 44, 0.2);
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(8, 20, 44, 0.3);
    background: linear-gradient(135deg, #1a3d6e 0%, #2980b9 100%);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* ================= Grid de Turmas ================= */

export const ClassesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

export const ClassCard = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.06);
    border-color: #d0d0d0;
  }
`;

export const ClassCardHeader = styled.div<{ $level: string }>`
  padding: 1.5rem;
  background: ${({ $level }) => {
    switch ($level) {
      case 'Advanced': return 'linear-gradient(135deg, #08142c 0%, #1a3d6e 100%)';
      case 'Intermediate': return 'linear-gradient(135deg, #1a3d6e 0%, #2980b9 100%)';
      default: return 'linear-gradient(135deg, #2980b9 0%, #3498db 100%)';
    }
  }};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
    font-weight: 700;
  }
`;

export const LevelBadge = styled.span`
  background: rgba(255,255,255,0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
`;

export const ClassCardBody = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const ClassCardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #555;
  font-size: 0.9rem;
  
  svg {
    color: #888;
  }
`;

export const StudentsPreview = styled.div`
  display: flex;
  align-items: center;
`;

export const StudentAvatarSmall = styled.div<{ $color: string; $index: number }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid #fff;
  margin-left: ${({ $index }) => $index > 0 ? '-10px' : '0'};
  position: relative;
  z-index: ${({ $index }) => 10 - $index};
`;

export const MoreStudents = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  border: 2px solid #fff;
  margin-left: -10px;
  position: relative;
  z-index: 1;
`;

/* ================= Detail Workspace ================= */

export const DetailContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  border: 1px solid #eaeaea;
`;

export const DetailHeader = styled.div`
  background: linear-gradient(135deg, #08142c 0%, #1a3d6e 100%);
  padding: 2rem 2.5rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DetailBackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  align-self: flex-start;

  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

export const DetailHeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
`;

export const DetailTabs = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0 2.5rem;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
`;

export const TabBtn = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 1.2rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $active }) => $active ? '#08142c' : '#777'};
  border-bottom: 3px solid ${({ $active }) => $active ? '#08142c' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #08142c;
  }
`;

export const DetailContent = styled.div`
  padding: 2.5rem;
  flex: 1;
  background: #fff;
`;

/* ================= Mural (Avisos) ================= */

export const PostCard = styled.div`
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const PostAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #08142c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
`;

export const PostMeta = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: #1a1a1a;
    font-size: 1rem;
  }

  span {
    color: #888;
    font-size: 0.8rem;
  }
`;

export const PostBody = styled.div`
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
`;

export const CreatePostBox = styled.div`
  background: #f8f9fc;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    min-height: 100px;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: #08142c;
    }
  }
`;

/* ================= Materiais & Atividades ================= */

export const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const MaterialCard = styled.div`
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  cursor: pointer;

  &:hover {
    border-color: #08142c;
    box-shadow: 0 4px 12px rgba(8, 20, 44, 0.08);
    transform: translateY(-2px);
  }
`;

export const MaterialIcon = styled.div<{ $type: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $type }) => {
    switch ($type) {
      case 'pdf': return '#fce8e6';
      case 'video': return '#fef7e0';
      case 'link': return '#e8eaed';
      default: return '#e8eef4';
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case 'pdf': return '#d93025';
      case 'video': return '#f9ab00';
      case 'link': return '#5f6368';
      default: return '#1a73e8';
    }
  }};
`;

export const MaterialInfo = styled.div`
  h4 {
    margin: 0 0 0.4rem 0;
    font-size: 1.1rem;
    color: #1a1a1a;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: #666;
    line-height: 1.4;
  }
`;

/* ================= Agenda ================= */

export const ClassAgendaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AgendaItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  background: #fff;
`;

export const AgendaItemInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const AgendaDateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fc;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  min-width: 60px;

  strong {
    font-size: 1.5rem;
    color: #08142c;
    line-height: 1;
  }
  
  span {
    font-size: 0.8rem;
    color: #666;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

export const AgendaDetails = styled.div`
  h4 {
    margin: 0 0 0.3rem 0;
    font-size: 1.1rem;
    color: #1a1a1a;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #666;
    font-size: 0.9rem;
  }
`;

/* ================= Modal de Criação ================= */

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-in-out;
`;

export const ModalContent = styled.div<{ $expanded?: boolean }>`
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: ${({ $expanded }) => $expanded ? '800px' : '600px'};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fc;

  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #08142c;
    font-weight: 700;
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ModalFooter = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: #f8f9fc;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #555;
  }

  input, select {
    padding: 0.75rem 1rem;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: #08142c;
      box-shadow: 0 0 0 3px rgba(8, 20, 44, 0.08);
    }
  }
`;

export const StudentListSelect = styled.div`
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
`;

export const StudentSelectItem = styled.div<{ $selected: boolean }>`
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $selected }) => $selected ? '#f0f4f8' : '#fff'};

  &:hover {
    background: #f8f9fc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const StudentSelectInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  strong { font-size: 0.9rem; color: #1a1a1a; }
  span { font-size: 0.75rem; color: #888; }
`;

export const CheckCircle = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ $selected }) => $selected ? '#08142c' : '#d0d0d0'};
  background: ${({ $selected }) => $selected ? '#08142c' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: #eaeaea;
    color: #333;
  }
`;

export const PrimaryBtn = styled.button`
  background: #08142c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    background: #1a3d6e;
  }
`;

export const SecondaryBtn = styled.button`
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    background: #e0e0e0;
  }
`;

export const DropzoneContainer = styled.div<{ $isDragActive?: boolean }>`
  border: 2px dashed ${({ $isDragActive }) => $isDragActive ? '#08142c' : '#d0d0d0'};
  background-color: ${({ $isDragActive }) => $isDragActive ? '#f0f4f8' : '#fafafa'};
  border-radius: 12px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;

  svg {
    color: ${({ $isDragActive }) => $isDragActive ? '#08142c' : '#888'};
    width: 48px;
    height: 48px;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    color: #555;
    font-size: 1rem;
    font-weight: 500;
  }

  span {
    color: #888;
    font-size: 0.85rem;
  }

  &:hover {
    border-color: #08142c;
    background-color: #f8f9fc;
  }
`;

export const RichTextWrapper = styled.div`
  .quill {
    background: #fff;
    border-radius: 8px;
    
    .ql-toolbar {
      border: 1px solid #d0d0d0;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background: #f8f9fc;
    }
    
    .ql-container {
      border: 1px solid #d0d0d0;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      min-height: 150px;
      font-family: inherit;
      font-size: 0.95rem;
    }
    
    .ql-editor {
      min-height: 150px;
    }
  }
`;
