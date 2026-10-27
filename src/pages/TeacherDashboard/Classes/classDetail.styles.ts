import styled from "styled-components";

export const ClassWorkspace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const ClassBanner = styled.div`
  background-color: #1f2b45;
  border-radius: 14px;
  padding: clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;

  h2 {
    color: white;
    font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
    line-height: 1.25;
    font-weight: 800;
    margin: 0;
    overflow-wrap: break-word;
  }
`;

export const ClassBannerTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ClassBannerTitle = styled.h2`
  color: white;
  font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
  line-height: 1.25;
  font-weight: 800;
  margin: 0;
  overflow-wrap: break-word;
`;

export const ClassBannerMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SoftBadge = styled.span<{ $bgColor?: string }>`
  background-color: ${({ $bgColor }) => $bgColor || "#C57A67"};
  color: #ffffff;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 700;
  border: none;
  white-space: nowrap;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const CefrBadge = styled.span`
  background-color: #3b82f6;
  color: #ffffff;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 700;
  border: none;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const ExtraBadge = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f59e0b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  font-weight: 800;
  border: 2px solid #1f2b45;
  margin-left: -8px;
  cursor: pointer;
  padding: 0;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

export const StudentsCount = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const AvatarStack = styled.div`
  display: flex;
  align-items: center;
`;

export const StackAvatar = styled.div<{ $color: string; $index: number }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #1f2b45;
  margin-left: ${({ $index }) => ($index > 0 ? "-8px" : "0")};
  user-select: none;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

export const TabsBar = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding-bottom: 4px;
  }
`;

export const ClassTab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0 0 1rem 0;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#1f2b45" : "#64748b")};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.2s;
  font-family: inherit;

  @media (max-width: 767px) {
    font-size: 0.875rem;
    padding: 0 0 0.75rem 0;
    gap: 6px;
  }

  svg {
    width: 18px;
    height: 18px;

    @media (max-width: 767px) {
      width: 16px;
      height: 16px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ $active }) => ($active ? "#1f2b45" : "transparent")};
    border-radius: 3px 3px 0 0;
    transition: background-color 0.2s;
  }

  &:hover {
    color: #1f2b45;
  }
`;

export const WorkspaceBody = styled.div`
  background: white;
  border-radius: 14px;
  padding: clamp(1.25rem, 2.5vw, 2rem);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  border: 1px solid #f2f2f2;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

export const PanelTitle = styled.h2`
  margin: 0 0 1.25rem;
  font-size: clamp(1.125rem, 1vw + 0.875rem, 1.5rem);
  line-height: 1.3;
  font-weight: 800;
  color: #1f2b45;
`;

export const PanelHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const ComposeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fafafa;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 8px 12px 8px 18px;
  margin-bottom: 24px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #1f2b45;
    background: #fff;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 0.95rem;
    color: #1f2b45;
    min-width: 0;
    background: transparent;

    &::placeholder {
      color: #94a3b8;
    }
  }

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: stretch;
    padding: 12px;
  }
`;

export const PublishBtn = styled.button`
  background: #1f2b45;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.4rem;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;

  &:hover {
    background: #0f172a;
  }
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NoticeCard = styled.div`
  background-color: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  position: relative;
`;

export const NoticeHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
`;

export const NoticeAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #c57a67;
  }

  strong {
    display: block;
    font-size: 0.95rem;
    font-weight: 700;
    color: #1f2b45;
    margin-bottom: 2px;
  }

  span {
    font-size: 0.75rem;
    color: #888;
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
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  font-size: 0.84rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #151d2f;
    box-shadow: 0 3px 10px rgba(31, 43, 69, 0.2);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #1f2b45;
  }
`;

export const MaterialsFilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const MaterialsFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  flex: 1;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    max-width: 100%;
  }
`;

export const MaterialSearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1.5px solid #1f2b45;
  border-radius: 999px;
  padding: 0 14px;
  height: 42px;
  min-width: 200px;
  flex: 1 1 220px;
  max-width: 320px;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #2a4a7f;
    box-shadow: 0 0 0 3px rgba(31, 43, 69, 0.1);
  }

  svg {
    color: #94a3b8;
    margin-right: 8px;
    flex-shrink: 0;
  }

  input {
    border: none;
    background: transparent;
    width: 100%;
    min-width: 0;
    height: 100%;
    font-size: 0.88rem;
    color: #1e293b;
    outline: none;
    font-family: inherit;

    &::placeholder {
      color: #94a3b8;
    }
  }

  @media (max-width: 768px) {
    flex: none;
    height: 42px;
    min-width: 0;
    max-width: 100%;
    width: 100%;
  }
`;

export const MaterialsEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1.5rem;
  background: #ffffff;
  border-radius: 20px;
  border: 1.5px dashed #cbd5e1;
  text-align: center;
  gap: 1rem;
  margin: 1rem 0;

  .icon-wrapper {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: #eef2f9;
    color: #1f2b45;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #1f2b45;
    font-family: "Rubik", sans-serif;
  }

  p {
    margin: 0;
    max-width: 500px;
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.55;
  }

  .buttons-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.5rem;
  }
`;

export const MaterialCard = styled.div`
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.1rem 1.25rem;
  margin-bottom: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 14px rgba(31, 43, 69, 0.06);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.9rem;
  }
`;

export const MaterialCardLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.95rem;
  flex: 1;
  min-width: 0;
`;

export const MaterialCardGlyph = styled.div<{ $type?: string }>`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${({ $type }) =>
    $type === "pdf"
      ? "#fee2e2"
      : $type === "image"
      ? "#ecfdf5"
      : $type === "link"
      ? "#eff6ff"
      : $type === "audio"
      ? "#fdf2f8"
      : "#eef2f9"};
  color: ${({ $type }) =>
    $type === "pdf"
      ? "#ef4444"
      : $type === "image"
      ? "#10b981"
      : $type === "link"
      ? "#3b82f6"
      : $type === "audio"
      ? "#ec4899"
      : "#1f2b45"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1.5px solid
    ${({ $type }) =>
      $type === "pdf"
        ? "#fecaca"
        : $type === "image"
        ? "#a7f3d0"
        : $type === "link"
        ? "#bfdbfe"
        : $type === "audio"
        ? "#fbcfe8"
        : "#dbe2ee"};
`;

export const MaterialCardContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: #1f2b45;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "Rubik", sans-serif;
  }

  p.desc {
    margin: 0;
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .badges-line {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    flex-wrap: wrap;
    margin-top: 0.2rem;
  }
`;

export const ViewDocPill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  height: 38px;
  padding: 0 1.1rem;
  border-radius: 999px;
  border: 1.5px solid #1f2b45;
  background: #ffffff;
  color: #1f2b45;
  font-size: 0.84rem;
  font-weight: 600;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(31, 43, 69, 0.06);

  &:hover {
    background: #1f2b45;
    color: #ffffff;
    box-shadow: 0 3px 8px rgba(31, 43, 69, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LessonBlock = styled.div`
  margin-bottom: 2rem;

  h3 {
    margin: 0 0 0.85rem;
    font-size: 1.02rem;
    font-weight: 700;
    color: #1f2b45;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "Rubik", sans-serif;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1.5px solid #eef1f6;
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
    background-color: #f8fafc;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
    transform: translateY(-1px);
  }

  .left-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 0;

    & > div:first-child {
      width: 42px;
      height: 42px;
      font-size: 0.92rem;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.16);
      margin-left: 0;
    }
  }

  .info-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;

    strong {
      color: #0f172a;
      font-size: 0.96rem;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .email-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.84rem;
      color: #64748b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      svg {
        flex-shrink: 0;
        color: #94a3b8;
      }
    }
  }

  .right-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .view-profile-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.84rem;
    font-weight: 600;
    color: #2563eb;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    transition: color 0.15s ease;

    &:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
  }

  .remove-student-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #ef4444;
    background: #fef2f2;
    border: 1px solid #fee2e2;
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s ease;

    &:hover {
      color: #dc2626;
      background: #fee2e2;
      border-color: #fca5a5;
      transform: translateY(-1px);
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;

    .right-content {
      width: 100%;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 0.5rem;
      border-top: 1px dashed #f1f5f9;
    }
  }
`;

export const StudentRowStatus = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
  background-color: ${({ $active }) =>
    $active !== false ? "#ecfdf5" : "#f1f5f9"};
  color: ${({ $active }) => ($active !== false ? "#16a34a" : "#64748b")};
  white-space: nowrap;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ $active }) =>
      $active !== false ? "#16a34a" : "#94a3b8"};
  }
`;

export const BackLink = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0;
  margin-bottom: 4px;
  transition: color 0.15s ease;

  &:hover {
    color: #fff;
  }
`;

export const TeacherSectionWrap = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TeacherCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  transition: all 0.2s ease;

  .left-content {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;

      .title-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        strong {
          color: #0f172a;
          font-size: 0.98rem;
          font-weight: 700;
        }
      }

      .email-row {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        color: #64748b;

        svg {
          color: #94a3b8;
          flex-shrink: 0;
        }
      }
    }
  }

  .right-content {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .remove-teacher-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #b91c1c;
    background: #ffffff;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s ease;

    &:hover {
      background: #fef2f2;
      border-color: #f87171;
      color: #991b1b;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;

    .right-content {
      width: 100%;
      justify-content: flex-end;
      padding-top: 0.5rem;
      border-top: 1px dashed #cbd5e1;
    }
  }
`;

export const TeacherAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #08142c;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 4px 10px rgba(8, 20, 44, 0.18);
  flex-shrink: 0;
`;

export const TeacherBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 3px 8px;
  border-radius: 6px;
  background: #dbeafe;
  color: #1e40af;
`;

export const EmptyTeacherCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1.25rem;
  background: #f8fafc;
  border: 1.5px dashed #cbd5e1;
  border-radius: 12px;
  color: #64748b;
  font-size: 0.85rem;

  .info {
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      color: #94a3b8;
    }
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #08142c;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;

    &:hover {
      background: #112347;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
