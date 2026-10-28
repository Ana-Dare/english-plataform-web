import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  Check,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  AlignLeft,
} from "lucide-react";
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
  Tag,
} from "./style";
import { useStudentProfile } from "../hooks/useStudentProfile";
import useToast from "../../../contexts/Toast/useToast";
import { isValidEmail } from "../../TeacherDashboard/Students/helpers/validateEmail";
import { isValidPhone } from "../../TeacherDashboard/Students/helpers/validatePhone";
import { useAuth } from "../../../contexts/Auth/AuthContext";

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
};

const toDateInput = (value: string | null | undefined) => {
  if (!value) return "";
  return value.split("T")[0] ?? "";
};

const MyProfile: React.FC = () => {
  const { addToast } = useToast();
  const { setUser, user: authUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    user,
    isLoading,
    isError,
    updateProfile,
    isUpdating,
    uploadPhoto,
    isUploadingPhoto,
  } = useStudentProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    certificateName: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    const names = splitName(user.name);
    setFormData({
      firstName: names.firstName,
      lastName: names.lastName,
      email: user.email,
      phone: user.phone ?? "",
      birthDate: toDateInput(user.birthdate),
      certificateName: user.name,
      description: user.profile?.notes ?? "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      next.firstName = "Informe o nome.";
    }
    if (!formData.lastName.trim()) {
      next.lastName = "Informe o sobrenome.";
    }
    if (!isValidEmail(formData.email)) {
      next.email = "E-mail inválido.";
    }
    if (formData.phone && !isValidPhone(formData.phone)) {
      next.phone = "Telefone inválido.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      addToast("A imagem deve ter no máximo 5MB.", "warning");
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      addToast("Formato inválido. Use JPG ou PNG.", "warning");
      return;
    }
    uploadPhoto(file, {
      onSuccess: (avatarUrl) => {
        if (authUser) {
          const nextUser = { ...authUser, avatarUrl };
          setUser(nextUser);
          localStorage.setItem("@App:user", JSON.stringify(nextUser));
        }
        addToast("Foto de perfil atualizada!", "success");
      },
      onError: () =>
        addToast("Não foi possível enviar a foto. Tente novamente.", "error"),
    });
  };

  const handleSave = () => {
    if (!validate()) {
      addToast("Corrija os campos destacados antes de salvar.", "warning");
      return;
    }
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    updateProfile(
      {
        name: fullName,
        email: formData.email.trim(),
        phone: formData.phone || null,
        birthdate: formData.birthDate || null,
      },
      {
        onSuccess: (updated) => {
          if (authUser) {
            const nextUser = {
              ...authUser,
              name: updated.name,
              email: updated.email,
              avatarUrl: updated.avatar_url ?? authUser.avatarUrl,
            };
            setUser(nextUser);
            localStorage.setItem("@App:user", JSON.stringify(nextUser));
          }
          addToast("Perfil atualizado com sucesso!", "success");
        },
        onError: () =>
          addToast("Não foi possível salvar o perfil. Tente novamente.", "error"),
      },
    );
  };

  if (isLoading) {
    return (
      <ProfileContainer>
        <HeaderArea>
          <h1>Meu Perfil</h1>
          <p>Carregando seus dados...</p>
        </HeaderArea>
      </ProfileContainer>
    );
  }

  if (isError || !user) {
    return (
      <ProfileContainer>
        <HeaderArea>
          <h1>Meu Perfil</h1>
          <p>Não foi possível carregar seus dados. Tente novamente.</p>
        </HeaderArea>
      </ProfileContainer>
    );
  }

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
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <ImageIcon size={48} color="#A0AABF" />
                )}
              </AvatarPlaceholder>
              <CameraButton>
                <Camera size={18} />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handlePhotoChange}
                  disabled={isUploadingPhoto}
                />
              </CameraButton>
            </AvatarWrapper>
            <ProfileInfo>
              <ProfileName>
                {formData.firstName} {formData.lastName}
              </ProfileName>
              <ProfileEmail>
                <Mail size={16} /> {formData.email}
              </ProfileEmail>
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
              {errors.firstName && (
                <span style={{ color: "#dc2626", fontSize: "0.8rem" }}>
                  {errors.firstName}
                </span>
              )}
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
              {errors.lastName && (
                <span style={{ color: "#dc2626", fontSize: "0.8rem" }}>
                  {errors.lastName}
                </span>
              )}
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
              {errors.email && (
                <span style={{ color: "#dc2626", fontSize: "0.8rem" }}>
                  {errors.email}
                </span>
              )}
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
              {errors.phone && (
                <span style={{ color: "#dc2626", fontSize: "0.8rem" }}>
                  {errors.phone}
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <label>Data de Nascimento</label>
              <InputWrapper>
                <Calendar size={18} className="icon" />
                <Input
                  type="date"
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
                  readOnly
                />
              </InputWrapper>
            </FormGroup>
          </FormGrid>

          <FormGroup style={{ marginBottom: "8px" }}>
            <label>Observações</label>
            <InputWrapper>
              <AlignLeft size={18} className="icon" style={{ top: "20px" }} />
              <TextArea
                name="description"
                value={formData.description}
                readOnly
              />
            </InputWrapper>
          </FormGroup>

          <SaveButton
            type="button"
            onClick={handleSave}
            disabled={isUpdating || isUploadingPhoto}
          >
            <Check /> {isUpdating ? "Salvando..." : "Salvar alterações"}
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
              <Tag>
                {user.profile?.levelId
                  ? `Nível ${user.profile.levelId}`
                  : "Não definido"}
              </Tag>
            </InfoBlock>
            <InfoBlock>
              <span className="label">Tipo de Plano</span>
              <Tag>{user.profile?.vip ? "VIP" : "Regular"}</Tag>
            </InfoBlock>
            <InfoBlock>
              <span className="label">Data da Matrícula</span>
              <span className="value">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("pt-BR")
                  : "--"}
              </span>
            </InfoBlock>
          </InfoGrid>
        </FormCard>
      </ContentGrid>
    </ProfileContainer>
  );
};

export default MyProfile;
