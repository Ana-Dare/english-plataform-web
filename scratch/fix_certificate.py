import re

filepath = 'src/pages/StudentDashboard/Certificados/viewerStyle.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix ViewerContainer box-sizing
content = content.replace(
"""export const ViewerContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px); 
  overflow: hidden;
  background: #f8fafc;
`;""",
"""export const ViewerContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px); 
  overflow-x: hidden;
  overflow-y: auto;
  background: #f8fafc;
  box-sizing: border-box;
`;"""
)

# Fix CertificateWrapper box-sizing
content = content.replace(
"""export const CertificateWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: stretch;

  @media (max-width: 1024px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;""",
"""export const CertificateWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  align-items: stretch;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;"""
)

# Fix MainContent box-sizing and padding
content = content.replace(
"""export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 40px;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;""",
"""export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 40px;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 768px) {
    padding: 70px 20px 24px;
  }
`;"""
)

# Fix ActionBar box-sizing
content = content.replace(
"""export const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 380px;
  background: #1F2B45; 
  padding: 40px 32px;
  color: white;
  flex-shrink: 0;""",
"""export const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 380px;
  background: #1F2B45; 
  padding: 40px 32px;
  color: white;
  flex-shrink: 0;
  box-sizing: border-box;"""
)

# Fix CertificateImage box-sizing and mobile sizing
content = content.replace(
"""export const CertificateImage = styled.div`
  width: 100%;
  max-width: 900px;
  max-height: calc(100vh - 140px);
  aspect-ratio: 1.414 / 1;
  background: white;
  border: 10px solid #C57A67;
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  padding: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Times New Roman', serif;
  text-align: center;
  margin: auto;
  container-type: inline-size;

  @media (max-width: 768px) {
    border-width: 6px;
    padding: 20px;
    aspect-ratio: auto;
    min-height: 400px;
  }""",
"""export const CertificateImage = styled.div`
  width: 100%;
  max-width: 900px;
  max-height: calc(100vh - 140px);
  aspect-ratio: 1.414 / 1;
  background: white;
  border: 10px solid #C57A67;
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
  padding: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Times New Roman', serif;
  text-align: center;
  margin: auto;
  container-type: inline-size;
  box-sizing: border-box;

  @media (max-width: 768px) {
    border-width: 6px;
    padding: 20px;
    aspect-ratio: auto;
    min-height: 400px;
    max-height: none;
  }"""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed ViewerContainer box-sizing and padding")
