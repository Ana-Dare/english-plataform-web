import styled from "styled-components";

export const ClassWorkspace = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(31, 43, 69, 0.08);
  min-height: calc(100vh - 140px);
  width: 100%;
  box-sizing: border-box;
`;

export const ClassBanner = styled.div`
  background: #1f2b45;
  color: #fff;
  padding: 1.5rem 1.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 1.15rem 1rem 0.35rem;
  }
`;

export const ClassBannerTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ClassBannerTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const ClassBannerMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const SoftBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  background: rgba(197, 122, 103, 0.28);
  color: #f8d7cf;
`;

export const CefrBadge = styled.span`
  padding: 0.15rem 0.6rem;
  border-radius: 6px;
  background: #3b82f6;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ExtraBadge = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #f59e0b;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const StudentsCount = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-left: 0.25rem;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.9);
`;

export const AvatarStack = styled.div`
  display: flex;
  align-items: center;
`;

export const StackAvatar = styled.div<{ $color: string; $index: number }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  color: #fff;
  font-size: 0.55rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #1f2b45;
  margin-left: ${({ $index }) => ($index > 0 ? "-6px" : "0")};
`;

export const TabsBar = styled.div`
  display: flex;
  gap: 0.2rem 1.35rem;
  padding: 0.15rem 1.75rem 0;
  overflow-x: auto;
  width: 100%;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  /* Custom subtle scrollbar */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  @media (max-width: 640px) {
    /* Expand beyond parent padding to allow edge-to-edge scrolling */
    width: calc(100% + 2rem);
    margin-left: -1rem;
    padding: 0.1rem 1rem 4px 1rem;
    gap: 0.15rem 0.9rem;
  }
`;

export const ClassTab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "#fff" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255,255,255,0.55)")};
  padding: 0.65rem 0 0.7rem;
  font-size: 0.78rem;
  font-weight: 500;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  white-space: nowrap;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    color: #fff;
  }
`;

export const WorkspaceBody = styled.div`
  padding: 1.35rem 1.5rem 1.75rem;
  background: #fff;

  @media (max-width: 640px) {
    padding: 1rem 0.85rem 1.25rem;
  }
`;

export const PanelTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1f2b45;
`;

export const PanelHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const ComposeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff;
  border: 1px solid #e8edf3;
  border-radius: 12px;
  padding: 0.45rem 0.5rem 0.45rem 1rem;
  margin-bottom: 1rem;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 0.9rem;
    color: #1f2b45;
    min-width: 0;
    background: transparent;

    &::placeholder {
      color: #94a3b8;
    }
  }

  @media (max-width: 560px) {
    flex-wrap: wrap;
    padding: 0.65rem;
  }
`;

export const PublishBtn = styled.button`
  background: #1f2b45;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 1.1rem;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #162033;
  }
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const NoticeCard = styled.div`
  border: 1px solid #eef1f6;
  border-radius: 12px;
  padding: 0.95rem 1.05rem;
`;

export const NoticeHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.55rem;
`;

export const NoticeAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
    color: #fff;
    background: #c57a67;
  }

  strong {
    display: block;
    font-size: 0.88rem;
    color: #1f2b45;
  }

  span {
    font-size: 0.72rem;
    color: #94a3b8;
  }
`;

export const IconGhostBtn = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.2rem;
  display: inline-flex;
  border-radius: 6px;

  &:hover {
    background: #f1f5f9;
    color: #1f2b45;
  }
`;

export const NoticeText = styled.p`
  margin: 0;
  color: #475569;
  font-size: 0.88rem;
  line-height: 1.55;
`;

export const ScheduleCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  background: #f8fafc;
  border-radius: 14px;
  padding: 1rem 1.15rem;
  margin-bottom: 1.5rem;

  @media (max-width: 700px) {
    grid-template-columns: auto 1fr;
    gap: 0.75rem 1rem;
  }
`;

export const ScheduleIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #fff1ed;
  color: #c57a67;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScheduleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  small {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #94a3b8;
    text-transform: uppercase;
  }

  strong {
    font-size: 1.05rem;
    color: #1f2b45;
    font-weight: 700;
  }

  @media (max-width: 700px) {
    &:last-child {
      grid-column: 2;
    }
  }
`;

export const UpcomingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.6rem;
`;

export const UpcomingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.35rem 0;
  flex-wrap: wrap;
`;

export const DateChip = styled.div`
  width: 48px;
  min-width: 48px;
  background: #1f2b45;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  padding: 0.35rem 0.2rem;
  line-height: 1.1;

  strong {
    display: block;
    font-size: 0.95rem;
    font-weight: 800;
  }

  span {
    font-size: 0.55rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.85;
  }
`;

export const UpcomingInfo = styled.div`
  flex: 1;
  min-width: 120px;

  strong {
    display: block;
    font-size: 0.9rem;
    color: #1f2b45;
  }

  span {
    font-size: 0.75rem;
    color: #94a3b8;
  }
`;

export const UpcomingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-left: auto;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;
    margin-left: 0;
    padding-left: 56px;
  }
`;

export const StatusHint = styled.span<{ $tone: "ok" | "warn" | "wait" }>`
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ $tone }) =>
    $tone === "ok" ? "#16a34a" : $tone === "warn" ? "#2563eb" : "#f59e0b"};
`;

export const ConfirmBtn = styled.button`
  background: #1f2b45;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.75rem;
  font-size: 0.72rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background: #162033;
  }
`;

export const HistoryWrap = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #eef1f6;
  width: 100%;
  box-sizing: border-box;
`;

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 520px;

  thead {
    background: #1f2b45;
    color: #fff;

    th {
      text-align: left;
      font-size: 0.78rem;
      font-weight: 600;
      padding: 0.7rem 1rem;
    }
  }

  tbody td {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const DoneBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: #dcfce7;
  color: #16a34a;
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 600;
`;

export const AddPill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #1f2b45;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.45rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background: #162033;
  }
`;

export const LessonBlock = styled.div`
  margin-bottom: 1.35rem;

  h3 {
    margin: 0 0 0.55rem;
    font-size: 0.92rem;
    font-weight: 700;
    color: #1f2b45;
  }
`;

export const MaterialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.2rem;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

export const FileGlyph = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #eff6ff;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const FileMeta = styled.div`
  flex: 1;
  min-width: 0;

  strong {
    display: block;
    font-size: 0.88rem;
    color: #1f2b45;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.72rem;
    color: #94a3b8;
  }
`;

export const RowActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
`;

export const RowIconBtn = styled.button<{ $danger?: boolean }>`
  background: none;
  border: none;
  color: ${({ $danger }) => ($danger ? "#ef4444" : "#64748b")};
  cursor: pointer;
  padding: 0.35rem;
  display: inline-flex;
  border-radius: 6px;

  &:hover {
    background: ${({ $danger }) => ($danger ? "#fef2f2" : "#f1f5f9")};
  }
`;

export const CompactOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 1rem;
`;

export const CompactModal = styled.div`
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(31, 43, 69, 0.22);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const CompactHeader = styled.div`
  background: #1f2b45;
  color: #fff;
  padding: 0.85rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    display: inline-flex;
    padding: 0.2rem;
  }
`;

export const CompactBody = styled.div`
  padding: 1rem 1.1rem 1.2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const CompactLabel = styled.label`
  font-size: 0.82rem;
  color: #475569;
  font-weight: 500;
`;

export const CompactSelect = styled.select`
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.65rem 0.8rem;
  font-family: inherit;
  font-size: 0.88rem;
  color: #1f2b45;
  outline: none;
  background: #fff;

  &:focus {
    border-color: #c57a67;
  }
`;

export const RenameBox = styled.div`
  background: #f8fafc;
  border-radius: 10px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  span {
    font-size: 0.78rem;
    font-weight: 600;
    color: #1f2b45;
  }

  input {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.5rem 0.7rem;
    font-family: inherit;
    outline: none;
  }
`;

export const SaveMini = styled.button`
  align-self: flex-end;
  background: #1f2b45;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
`;

export const DropzoneMini = styled.div<{ $active?: boolean }>`
  border: 1.5px dashed ${({ $active }) => ($active ? "#c57a67" : "#dbe3ee")};
  border-radius: 12px;
  padding: 1.4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  color: #94a3b8;
  text-align: center;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#fff8f6" : "#fafbfc")};

  p {
    margin: 0;
    font-size: 0.82rem;
  }
`;

export const AddMaterialPill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #eef2f7;
  color: #1f2b45;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 0.95rem;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background: #e2e8f0;
  }
`;

export const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const StudentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.75rem 0.85rem;
  border: 1px solid #eef1f6;
  border-radius: 12px;
`;

export const BackLink = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.75rem;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0;

  &:hover {
    color: #fff;
  }
`;
