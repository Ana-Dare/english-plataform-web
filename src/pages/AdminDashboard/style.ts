import styled from "styled-components";
import { motion } from "framer-motion";

/* ── WRAPPER GERAL ── */
export const AdminWrap = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f0f4f8;
  font-family: 'Rubik', sans-serif;
`;

/* ── SIDEBAR ── */
export const Sidebar = styled.aside<{ $open?: boolean }>`
  width: 260px;
  background: #0f1e35;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0;
  height: 100vh;
  z-index: 200;
  box-shadow: 4px 0 20px rgba(0,0,0,0.15);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    transform: ${p => p.$open ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

export const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: ${p => p.$open ? 'block' : 'none'};
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 199;
    backdrop-filter: blur(2px);
  }
`;

export const HamburgerBtn = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    width: 36px;
    height: 36px;
    color: #94a3b8;
    cursor: pointer;
    flex-shrink: 0;
  }
`;

export const SidebarTop = styled.div`
  padding: 1.75rem 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.35rem;

  span {
    font-size: 1.25rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.5px;
    em { font-style: normal; color: #C57A67; }
  }
`;

export const BrandBadge = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  color: #C57A67;
  background: rgba(197,122,103,0.15);
  border: 1px solid rgba(197,122,103,0.25);
  border-radius: 6px;
  padding: 0.15rem 0.5rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: inline-block;
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 1.25rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
`;

export const NavGroup = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 0.35rem;
  padding: 0 0.75rem;
`;

export const NavGroupLabel = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

export const NavItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: none;
  background: ${p => p.$active
    ? "linear-gradient(135deg, rgba(197,122,103,0.2), rgba(197,122,103,0.08))"
    : "transparent"};
  color: ${p => p.$active ? "#C57A67" : "#64748b"};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  font-family: 'Rubik', sans-serif;
  font-size: 0.9rem;
  font-weight: ${p => p.$active ? 600 : 400};
  border-left: 3px solid ${p => p.$active ? "#C57A67" : "transparent"};
  position: relative;

  &:hover {
    background: rgba(255,255,255,0.05);
    color: #e2e8f0;
  }

  svg { flex-shrink: 0; }
`;

export const NavLabel = styled.span`
  flex: 1;
`;

export const NavBadge = styled.span`
  background: #C57A67;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  min-width: 18px;
  text-align: center;
`;

export const SidebarBottom = styled.div`
  padding: 1rem 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.07);
`;

export const LogoutNavItem = styled(NavItem)`
  color: #64748b;
  &:hover { background: rgba(239,68,68,0.1); color: #ef4444; }
`;

/* ── MAIN ── */
export const Main = styled.div`
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

/* ── TOPBAR ── */
export const Topbar = styled.header`
  background: #0f1e35;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 2px 12px rgba(15,30,53,0.3);

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 60px;
  }
`;

export const TopbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PageCrumb = styled.div`
  h2 {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
  p {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }
`;

export const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const AdminPill = styled.div`
  background: rgba(197,122,103,0.15);
  border: 1px solid rgba(197,122,103,0.3);
  color: #C57A67;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const TopbarBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
  color: #94a3b8;
  font-family: 'Rubik', sans-serif;
  font-size: 0.83rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.3); color: #f87171; }
`;

/* ── CONTENT ── */
export const Content = styled.div`
  padding: 2rem;
  flex: 1;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ContentHeader = styled(motion.div)`
  margin-bottom: 2rem;

  h1 {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 0.3rem;
    letter-spacing: -0.5px;
  }
  p { color: #64748b; margin: 0; font-size: 0.95rem; }

  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
    h1 { font-size: 1.4rem; }
  }
`;

/* ── CARDS e SEÇÕES (reutilizáveis nas tabs) ── */
export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

export const CardHeader = styled.div`
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1rem;
  color: #0f172a;
`;

export const CardBody = styled.div`
  padding: 1.5rem;
`;

/* ── BOTÕES ── */
export const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.1rem;
  border-radius: 10px;
  border: none;
  background: #1F2B45;
  color: #fff;
  font-family: 'Rubik', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #2a3b5c; box-shadow: 0 4px 12px rgba(31,43,69,0.2); }
`;

export const DangerBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #fca5a5;
  background: #fee2e2;
  color: #dc2626;
  font-family: 'Rubik', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #dc2626; color: #fff; }
`;

export const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #334155;
  font-family: 'Rubik', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #e2e8f0; }
`;

export const SaveBtn = styled.button<{ $saved?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  border: none;
  background: ${p => p.$saved ? "#16a34a" : "#1F2B45"};
  color: #fff;
  font-family: 'Rubik', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.25rem;
  transition: background 0.3s;
`;

/* ── INPUTS ── */
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
`;

export const FieldLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-family: 'Rubik', sans-serif;
  font-size: 0.9rem;
  color: #0f172a;
  background: #f8fafc;
  transition: all 0.2s;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #1F2B45; background: #fff; box-shadow: 0 0 0 3px rgba(31,43,69,0.08); }
`;

export const SelectInput = styled.select`
  width: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1.5px solid #e2e8f0;
  border-radius: 999px;
  padding: 0.65rem 2.4rem 0.65rem 1.1rem;
  font-size: 0.9rem;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  color: #0f172a;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23C57A67%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 52%;
  background-size: 0.65rem auto;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255,255,255,0.9);
  box-sizing: border-box;

  &:hover {
    border-color: #C57A67;
    background-color: #fff8f6;
    box-shadow: 0 4px 10px rgba(197, 122, 103, 0.12);
  }

  &:focus {
    outline: none;
    border-color: #1F2B45;
    box-shadow: 0 0 0 3px rgba(31,43,69,0.08), 0 2px 6px rgba(15, 23, 42, 0.04);
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.85rem;
  margin-bottom: 0.85rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

/* ── TOGGLE ── */
export const Toggle = styled.button<{ $on: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 999px;
  border: none;
  background: ${p => p.$on ? "#C57A67" : "#cbd5e1"};
  position: relative;
  cursor: pointer;
  transition: background 0.25s;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #fff;
    top: 3px;
    left: ${p => p.$on ? "23px" : "3px"};
    transition: left 0.25s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  }
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  background: #f8fafc;
  margin-bottom: 0.75rem;

  .info h4 { font-size: 0.93rem; font-weight: 600; color: #0f172a; margin: 0 0 0.15rem; }
  .info p  { font-size: 0.8rem; color: #64748b; margin: 0; }
`;

/* ── TABELA ── */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`;

export const Td = styled.td`
  padding: 0.85rem 1rem;
  font-size: 0.88rem;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
`;

export const Avatar = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${p => p.$color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.88rem;
  flex-shrink: 0;
`;

export const RolePill = styled.span<{ $admin?: boolean; $teacher?: boolean }>`
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: ${p => p.$admin ? "#fef3c7" : p.$teacher ? "#eff6ff" : "#f0fdf4"};
  color: ${p => p.$admin ? "#d97706" : p.$teacher ? "#2563eb" : "#16a34a"};
  border: 1px solid ${p => p.$admin ? "#fde68a" : p.$teacher ? "#bfdbfe" : "#bbf7d0"};
`;

/* ── NÍVEIS ── */
export const LevelRow = styled(motion.div)<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1.5px solid ${p => p.$color}30;
  background: ${p => p.$color}06;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  margin-bottom: 0.75rem;
`;

export const LevelBubble = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${p => p.$color}20;
  border: 2px solid ${p => p.$color};
  color: ${p => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

/* ── UPLOAD ZONE ── */
export const UploadZone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cbd5e1;
  border-radius: 14px;
  padding: 2rem;
  cursor: pointer;
  background: #f8fafc;
  margin-bottom: 1.5rem;
  transition: all 0.2s;
  &:hover { border-color: #1F2B45; background: #eef2ff; }
  p { margin: 0.5rem 0 0; font-family: 'Rubik'; }
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
`;

export const ImageCard = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  position: relative;
  img { width: 100%; height: 120px; object-fit: cover; display: block; }
`;

export const ImageFooter = styled.div`
  padding: 0.5rem 0.75rem;
  border-top: 1px solid #e2e8f0;
  background: #fff;
  font-size: 0.78rem;
  color: #64748b;
  font-family: 'Rubik';
`;
