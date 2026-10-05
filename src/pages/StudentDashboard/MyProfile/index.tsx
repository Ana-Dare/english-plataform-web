import React, { useState } from 'react';
import { Camera, Check, Image as ImageIcon, User, Mail, Phone, Calendar, Award, AlignLeft } from 'lucide-react';
import {
  ProfileContainer,
  HeaderArea,
  ContentGrid,
  AvatarSection,
  AvatarWrapper,
  AvatarPlaceholder,
  CameraButton,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  FormCard,
  CardHeader,
  FormGrid,
  FormGroup,
  InputWrapper,
  Input,
  TextArea,
  SaveButton,
  ReadOnlyBadge,
  InfoGrid,
  InfoBlock,
  Tag
} from './style';

const MyProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: 'Ana Clara',
    lastName: 'Silva',
    email: 'ana.clara@email.com',
    phone: '(11) 98765-4321',
    birthDate: '22/08/1995',
    certificateName: 'Ana Clara Silva',
    description: 'Estudante dedicada, apaixonada por idiomas e novas culturas.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ProfileContainer>
      <HeaderArea>
        <h1>Meu Perfil</h1>
        <p>Gerencie suas informações pessoais</p>
      </HeaderArea>

      <ContentGrid>
        <FormCard>
          <AvatarSection>
            <AvatarWrapper>
              <AvatarPlaceholder>
                <ImageIcon size={48} color="#A0AABF" />
              </AvatarPlaceholder>
              <CameraButton>
                <Camera size={18} />
                <input type="file" accept="image/png, image/jpeg" />
              </CameraButton>
            </AvatarWrapper>
            <ProfileInfo>
              <ProfileName>{formData.firstName} {formData.lastName}</ProfileName>
              <ProfileEmail><Mail size={16} /> {formData.email}</ProfileEmail>
            </ProfileInfo>
          </AvatarSection>

          <CardHeader>
            <h3>Informações Pessoais</h3>
          </CardHeader>
          <FormGrid>
            <FormGroup>
              <label>Nome</label>
              <InputWrapper>
                <User size={18} className="icon" />
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <label>Sobrenome</label>
              <InputWrapper>
                <User size={18} className="icon" />
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            
            <FormGroup>
              <label>E-mail</label>
              <InputWrapper>
                <Mail size={18} className="icon" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <label>Telefone</label>
              <InputWrapper>
                <Phone size={18} className="icon" />
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <label>Data de Nascimento</label>
              <InputWrapper>
                <Calendar size={18} className="icon" />
                <Input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <label>Nome nos Certificados</label>
              <InputWrapper $highlight>
                <Award size={18} className="icon" />
                <Input
                  type="text"
                  name="certificateName"
                  value={formData.certificateName}
                  onChange={handleChange}
                />
              </InputWrapper>
            </FormGroup>
          </FormGrid>

          <FormGroup style={{ marginBottom: '8px' }}>
            <label>Descrição</label>
            <InputWrapper>
              <AlignLeft size={18} className="icon" style={{ top: '20px' }} />
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </InputWrapper>
          </FormGroup>

          <SaveButton>
            <Check /> Salvar alterações
          </SaveButton>
        </FormCard>

        <FormCard>
          <CardHeader>
            <div>
              <h3>Informações Acadêmicas</h3>
              <p>Somente sua professora pode alterar estes dados</p>
            </div>
            <ReadOnlyBadge>Somente leitura</ReadOnlyBadge>
          </CardHeader>
          <InfoGrid>
            <InfoBlock>
              <span className="label">Nível Atual</span>
              <Tag>Intermediário B1</Tag>
            </InfoBlock>
            <InfoBlock>
              <span className="label">Tipo de Plano</span>
              <Tag>VIP</Tag>
            </InfoBlock>
            <InfoBlock>
              <span className="label">Data da Matrícula</span>
              <span className="value">12 de março de 2025</span>
            </InfoBlock>
          </InfoGrid>
        </FormCard>
      </ContentGrid>
    </ProfileContainer>
  );
};

export default MyProfile;
