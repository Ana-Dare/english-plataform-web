import re

filepath = 'src/pages/TeacherDashboard/Certificates/index.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
"""import {
  Container,
  HeaderActions,
  FilterSelect,
  CertificateGrid,
  CertificateCard,
  CertificateHeader,
  InitialsAvatar,
  CertificateInfo,
  StudentName,
  StudentMeta,
  ProgressBarContainer,
  ProgressBarFill,
  CardFooter,
  ActionBtn,
  DetailContainer,
  DetailHeader,
  DetailBanner,
  BannerTop,
  BannerTitle,
  BannerSubtitle,
  StatusBadge,
  DetailContent,
  PremiumCard,
  DetailSection,
  SectionTitle,
  DataGrid,
  DataGroup,
  DataLabel,
  DataValue,
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDate,
  MaterialGrid,
  MaterialCard,
  MaterialIcon,
  MaterialInfo,
  MaterialTitle,
  MaterialMeta,
} from "./style";""",
"""import {
  Container,
  HeaderActions,
  FilterSelect,
  CertificateGrid,
  CertificateCard,
  CertificateHeader,
  InitialsAvatar,
  CertificateInfo,
  StudentName,
  StudentMeta,
  ProgressBarContainer,
  ProgressBarFill,
  CardFooter,
  ActionBtn,
  DetailContainer,
  DetailHeader,
  DetailBanner,
  BannerTop,
  BannerTitle,
  BannerSubtitle,
  StatusBadge,
  DetailContent,
  PremiumCard,
  DetailSection,
  SectionTitle,
  DataGrid,
  DataGroup,
  DataLabel,
  DataValue,
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDate,
  MaterialGrid,
  MaterialCard,
  MaterialIcon,
  MaterialInfo,
  MaterialTitle,
  MaterialMeta,
  ActionButtonsWrapper,
} from "./style";"""
)

content = content.replace(
"""          <PremiumCard>
            <DetailSection>
              <SectionTitle>
                <FileBadge size={18} /> Dossi de Materiais""",
"""          <PremiumCard>
            <DetailSection>
              <SectionTitle>
                <FileBadge size={18} /> Dossiê de Materiais"""
)

content = content.replace(
"""            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
                marginTop: "1.5rem",
              }}
            >
              <SendCertificateBtn
                onClick={() =>
                  addToast(
                    `Certificado de ${selectedStudent.name} emitido com sucesso!`,
                    "success",
                  )
                }
                style={{ padding: "1rem 2.5rem", fontSize: "1.05rem" }}
              >
                <Upload size={20} /> Emitir Certificado Oficial
              </SendCertificateBtn>
              <SendCertificateBtn
                onClick={() =>
                  addToast(
                    `Baixando certificado de ${selectedStudent.name}...`,
                    "info",
                  )
                }
                style={{
                  padding: "1rem 2.5rem",
                  fontSize: "1.05rem",
                  background: "#f0f4f8",
                  color: "#1F2B45",
                  border: "1px solid #d0d5dd",
                  boxShadow: "none",
                }}
              >
                <Download size={20} /> Baixar Certificado
              </SendCertificateBtn>
            </div>""",
"""            <ActionButtonsWrapper>
              <SendCertificateBtn
                onClick={() =>
                  addToast(
                    `Certificado de ${selectedStudent.name} emitido com sucesso!`,
                    "success",
                  )
                }
                style={{ padding: "1rem 2.5rem", fontSize: "1.05rem" }}
              >
                <Upload size={20} /> Emitir Certificado Oficial
              </SendCertificateBtn>
              <SendCertificateBtn
                onClick={() =>
                  addToast(
                    `Baixando certificado de ${selectedStudent.name}...`,
                    "info",
                  )
                }
                style={{
                  padding: "1rem 2.5rem",
                  fontSize: "1.05rem",
                  background: "#f0f4f8",
                  color: "#1F2B45",
                  border: "1px solid #d0d5dd",
                  boxShadow: "none",
                }}
              >
                <Download size={20} /> Baixar Certificado
              </SendCertificateBtn>
            </ActionButtonsWrapper>"""
)


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated TeacherDashboard/Certificates/index.tsx")
