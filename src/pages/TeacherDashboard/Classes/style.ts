import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: fadeIn 0.3s ease-in-out;
  height: 100%;
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  width: fit-content;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50px;
  padding: 0.6rem 1.2rem;
  min-width: 260px;
  max-width: 320px;
  flex-shrink: 0;
  border: 1px solid #1f2b45;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.05);

  &:focus-within {
    border-color: #c57a67;
    box-shadow: 0 0 0 3px rgba(197, 122, 103, 0.15);
  }

  svg {
    color: #c57a67;
    margin-right: 0.8rem;
    flex-shrink: 0;
  }

  input {
    border: none;
    outline: none;
    font-size: 0.95rem;
    font-family: inherit;
    width: 100%;
    color: #1e293b;
    background: transparent;

    &::placeholder {
      color: #94a3b8;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(15, 23, 42, 0.3);
    background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
  }
`;

/* ================= Grid de Turmas ================= */

import { motion } from "framer-motion";

export const ClassesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
`;

export const FormSelect = styled.select`
  width: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1.5px solid #1f2b45;
  border-radius: 999px;
  padding: 0.75rem 2.4rem 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-family: "Rubik", inherit;
  font-weight: 500;
  color: #1f2b45;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23C57A67%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 52%;
  background-size: 0.7rem auto;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 2px 8px rgba(31, 43, 69, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  box-sizing: border-box;

  &:hover {
    border-color: #c57a67;
    background-color: #fff8f6;
    box-shadow: 0 4px 12px rgba(197, 122, 103, 0.18);
    color: #c57a67;
  }

  &:focus {
    border-color: #c57a67;
    box-shadow:
      0 0 0 3px rgba(197, 122, 103, 0.18),
      0 2px 8px rgba(31, 43, 69, 0.06);
    color: #c57a67;
    background-color: #fff8f6;
  }
`;

export const ClassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
  }
`;

export const ClassCardHeader = styled.div<{ $level: string }>`
  padding: 1.5rem;
  background: ${({ $level }) => {
    switch ($level) {
      case "Advanced":
        return "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";
      case "Intermediate":
        return "linear-gradient(135deg, #1e293b 0%, #334155 100%)";
      default:
        return "linear-gradient(135deg, #334155 0%, #475569 100%)";
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
  background: rgba(255, 255, 255, 0.15);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
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

export const StudentAvatarSmall = styled.div<{
  $color: string;
  $index: number;
}>`
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
  margin-left: ${({ $index }) => ($index > 0 ? "-10px" : "0")};
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.15);
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
    background: rgba(255, 255, 255, 0.2);
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
  color: ${({ $active }) => ($active ? "#08142c" : "#777")};
  border-bottom: 3px solid
    ${({ $active }) => ($active ? "#08142c" : "transparent")};
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

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

export const SectionTitle = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -0.02em;

  svg {
    color: #3b82f6;
  }
`;

export const CreatePostBox = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.2s ease;

  &:focus-within {
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
  }

  textarea {
    width: 100%;
    min-height: 120px;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-family: inherit;
    font-size: 1rem;
    resize: none;
    outline: none;
    background: #f8fafc;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:focus {
      background: #ffffff;
      border-color: #3b82f6;
      box-shadow: inset 0 0 0 1px #3b82f6;
    }
  }
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PostCard = styled.div`
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const PostAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  strong {
    color: #1e293b;
    font-size: 1.05rem;
  }

  span {
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 500;
  }
`;

export const PostContent = styled.p`
  color: #334155;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
  white-space: pre-wrap;
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
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  cursor: pointer;

  &:hover {
    border-color: #08142c;
    box-shadow: 0 8px 25px rgba(8, 20, 44, 0.1);
    transform: translateY(-4px);
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
      case "pdf":
        return "#fce8e6";
      case "video":
        return "#fef7e0";
      case "link":
        return "#e8eaed";
      default:
        return "#e8eef4";
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case "pdf":
        return "#d93025";
      case "video":
        return "#f9ab00";
      case "link":
        return "#5f6368";
      default:
        return "#1a73e8";
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
  gap: 1.25rem;
`;

export const AgendaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(to right, #ffffff, #f8fbff);
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-left: 5px solid #3b82f6;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.3);
    background: linear-gradient(to right, #ffffff, #f0f7ff);
  }
`;

export const AgendaDateBox = styled.div`
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  border: 1px solid #7dd3fc;
  color: #0369a1;
  min-width: 75px;
  height: 75px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(56, 189, 248, 0.2);

  strong {
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1;
    color: #0c4a6e;
  }

  span {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    color: #0284c7;
    margin-top: 0.3rem;
    letter-spacing: 0.05em;
  }
`;

export const AgendaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;

  strong {
    color: #1e293b;
    font-size: 1.15rem;
    font-weight: 600;
  }

  span {
    color: #64748b;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }
`;

/* ================= Modal de Criação ================= */

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  max-width: ${({ $expanded }) => ($expanded ? "800px" : "600px")};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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

  input,
  select {
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
  background: ${({ $selected }) => ($selected ? "#f0f4f8" : "#fff")};

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

  strong {
    font-size: 0.9rem;
    color: #1a1a1a;
  }
  span {
    font-size: 0.75rem;
    color: #888;
  }
`;

export const CheckCircle = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ $selected }) => ($selected ? "#08142c" : "#d0d0d0")};
  background: ${({ $selected }) => ($selected ? "#08142c" : "transparent")};
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
  border: 2px dashed
    ${({ $isDragActive }) => ($isDragActive ? "#08142c" : "#d0d0d0")};
  background-color: ${({ $isDragActive }) =>
    $isDragActive ? "#f0f4f8" : "#fafafa"};
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
    color: ${({ $isDragActive }) => ($isDragActive ? "#08142c" : "#888")};
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

export const StudentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const StudentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(8, 20, 44, 0.08);
    border-color: #08142c;
  }
`;

export const JustificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const JustificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

export const JustificationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  h4 {
    margin: 0;
    color: #1a1a1a;
    font-size: 1.1rem;
  }

  span {
    color: #666;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

export const JustificationStatus = styled.div<{ $status: string }>`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $status }) =>
    $status === "Aceito"
      ? "#e6f4ea"
      : $status === "Recusado"
        ? "#fce8e6"
        : "#fef7e0"};
  color: ${({ $status }) =>
    $status === "Aceito"
      ? "#1e8e3e"
      : $status === "Recusado"
        ? "#d93025"
        : "#f9ab00"};
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-left: 1.5rem;
`;

export const JustificationActionBtn = styled.button<{
  $type: "approve" | "reject";
}>`
  background: ${({ $type }) =>
    $type === "approve" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${({ $type }) => ($type === "approve" ? "#10b981" : "#ef4444")};
  border: 1px solid
    ${({ $type }) =>
      $type === "approve"
        ? "rgba(16, 185, 129, 0.2)"
        : "rgba(239, 68, 68, 0.2)"};
  border-radius: 50px;
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${({ $type }) => ($type === "approve" ? "#10b981" : "#ef4444")};
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px
      ${({ $type }) =>
        $type === "approve"
          ? "rgba(16, 185, 129, 0.25)"
          : "rgba(239, 68, 68, 0.25)"};
  }

  &:active {
    transform: translateY(0);
  }
`;
