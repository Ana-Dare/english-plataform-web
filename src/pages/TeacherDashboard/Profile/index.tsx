/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useRef, useEffect } from "react";
import { useProfile } from "../../../contexts/ProfileContext";
import { useAuth } from "../../../contexts/Auth/AuthContext";
import {
  ProfileWrapper,
  ProfileContainer,
  ProfilePageTitle,
  ProfilePageSubtitle,
  PhotoSection,
  AvatarUpload,
  AvatarImage,
  UploadOverlay,
  PhotoInfo,
  PhotoActions,
  PhotoBtn,
  FormSection,
  FormSectionTitle,
  FormGrid,
  FormGroup,
  FormLabel,
  FormInput,
  InputWrapper,
  FormTextarea,
  TextareaWrapper,
  SaveButton,
} from "./style";
import {
  Camera,
  Upload,
  Trash2,
  User,
  Mail,
  Phone,
  FileText,
  Save,
  UserCircle,
  Badge,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useToast from "../../../contexts/Toast/useToast";
import { getInitials, getAvatarColorByName } from "../../../utils/avatar";
import { updateUser } from "../../../services/auth";

const ProfileTab: React.FC = () => {
  const { addToast } = useToast();
  const { profile, updateProfile, updatePhoto } = useProfile();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [phone, setPhone] = useState(profile.phone);
  const [description, setDescription] = useState(profile.description);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Sincronizar com dados do usuário autenticado
  useEffect(() => {
    if (user) {
      const nameParts = user.name.split(" ");
      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
    }
  }, [user]);

  const validateProfile = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Nome é obrigatório";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Sobrenome é obrigatório";
    }
    if (phone && !/^[\d\s\-()]+$/.test(phone)) {
      newErrors.phone = "Telefone inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast("Arquivo muito grande. Máximo 5MB.", "error");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        addToast("Formato inválido. Use JPG ou PNG.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePhoto(reader.result as string);
        addToast("Foto de perfil atualizada!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    updatePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    addToast("Foto de perfil removida.", "success");
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) {
      addToast("Corrija os erros antes de salvar.", "error");
      return;
    }

    if (!user) {
      addToast("Usuário não encontrado.", "error");
      return;
    }

    setIsSaving(true);
    try {
      // Combine nome e sobrenome
      const fullName = `${firstName} ${lastName}`.trim();

      // Chamar API para atualizar usuário
      await updateUser(user.id, {
        name: fullName,
        email: user.email,
        phone,
      });

      // Atualizar dados do usuário no contexto de autenticação
      const updatedUserData = {
        ...user,
        name: fullName,
      };
      localStorage.setItem("@App:user", JSON.stringify(updatedUserData));

      // Atualizar profile local também
      updateProfile({
        firstName,
        lastName,
        email: user.email,
        phone,
        description,
      });

      addToast("Perfil atualizado com sucesso!", "success");
    } catch {
      addToast("Erro ao atualizar perfil. Tente novamente.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const roleLabel = {
    student: "Aluno",
    teacher: "Professor",
    admin: "Administrador",
  };

  return (
    <AnimatePresence>
      <ProfileWrapper>
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: "1.5rem" }}
        >
          <ProfilePageTitle>Meu Perfil</ProfilePageTitle>
          <ProfilePageSubtitle>
            Gerencie suas informações pessoais e configurações de conta
          </ProfilePageSubtitle>
        </motion.div>

        <ProfileContainer
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <PhotoSection as={motion.div} variants={itemVariants}>
            <AvatarUpload>
              <AvatarImage $hasPhoto={!!profile.photoUrl}>
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt="Foto de perfil" />
                ) : (
                  user && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: user
                          ? getAvatarColorByName(user.name)
                          : "#1F2B45",
                        color: "#ffffff",
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {getInitials(user.name)}
                    </div>
                  )
                )}
              </AvatarImage>
              <UploadOverlay htmlFor="photo-upload">
                <Camera size={16} />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  ref={fileInputRef}
                />
              </UploadOverlay>
            </AvatarUpload>
            <PhotoInfo>
              <h3>
                {firstName || "Meu"} {lastName || "Perfil"}
              </h3>
              <p>
                Formatos aceitos: JPG, PNG.
                <br />
                Tamanho máximo: 5MB.
              </p>
              <PhotoActions>
                <PhotoBtn
                  $variant="primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={14} />
                  {profile.photoUrl ? "Trocar foto" : "Enviar foto"}
                </PhotoBtn>
                {profile.photoUrl && (
                  <PhotoBtn $variant="danger" onClick={handleRemovePhoto}>
                    <Trash2 size={14} />
                    Remover
                  </PhotoBtn>
                )}
              </PhotoActions>
            </PhotoInfo>
          </PhotoSection>

          {/* Account Info Section */}
          <FormSection as={motion.div} variants={itemVariants}>
            <FormSectionTitle>
              <Badge size={20} />
              Informações da Conta
            </FormSectionTitle>
            <FormGrid>
              <FormGroup>
                <FormLabel>
                  <User size={14} />
                  Função
                </FormLabel>
                <InputWrapper>
                  <Badge className="input-icon" />
                  <FormInput
                    type="text"
                    value={roleLabel[user?.role || "student"]}
                    disabled
                    placeholder="Função"
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  <Mail size={14} />
                  Email da Conta
                </FormLabel>
                <InputWrapper>
                  <Mail className="input-icon" />
                  <FormInput
                    type="email"
                    value={user?.email || ""}
                    disabled
                    placeholder="seu@email.com"
                  />
                </InputWrapper>
              </FormGroup>
            </FormGrid>
          </FormSection>

          {/* Personal Info Section */}
          <FormSection as={motion.div} variants={itemVariants}>
            <FormSectionTitle>
              <UserCircle size={20} />
              Informações Pessoais
            </FormSectionTitle>
            <FormGrid>
              <FormGroup>
                <FormLabel>
                  <User size={14} />
                  Nome
                </FormLabel>
                <InputWrapper>
                  <User className="input-icon" />
                  <FormInput
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) {
                        setErrors({ ...errors, firstName: "" });
                      }
                    }}
                    placeholder="Seu nome"
                    style={{
                      borderColor: errors.firstName ? "#dc2626" : undefined,
                    }}
                  />
                </InputWrapper>
                {errors.firstName && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#dc2626",
                      fontSize: "0.875rem",
                      marginTop: "4px",
                    }}
                  >
                    <AlertCircle size={14} />
                    {errors.firstName}
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  <User size={14} />
                  Sobrenome
                </FormLabel>
                <InputWrapper>
                  <User className="input-icon" />
                  <FormInput
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) {
                        setErrors({ ...errors, lastName: "" });
                      }
                    }}
                    placeholder="Seu sobrenome"
                    style={{
                      borderColor: errors.lastName ? "#dc2626" : undefined,
                    }}
                  />
                </InputWrapper>
                {errors.lastName && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#dc2626",
                      fontSize: "0.875rem",
                      marginTop: "4px",
                    }}
                  >
                    <AlertCircle size={14} />
                    {errors.lastName}
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  <Phone size={14} />
                  Telefone
                </FormLabel>
                <InputWrapper>
                  <Phone className="input-icon" />
                  <FormInput
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) {
                        setErrors({ ...errors, phone: "" });
                      }
                    }}
                    placeholder="(00) 00000-0000"
                    style={{
                      borderColor: errors.phone ? "#dc2626" : undefined,
                    }}
                  />
                </InputWrapper>
                {errors.phone && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#dc2626",
                      fontSize: "0.875rem",
                      marginTop: "4px",
                    }}
                  >
                    <AlertCircle size={14} />
                    {errors.phone}
                  </div>
                )}
              </FormGroup>

              <FormGroup $fullWidth>
                <FormLabel>
                  <FileText size={14} />
                  Descrição
                </FormLabel>
                <TextareaWrapper>
                  <FileText className="input-icon" />
                  <FormTextarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Conte um pouco sobre você..."
                  />
                </TextareaWrapper>
              </FormGroup>
            </FormGrid>

            <SaveButton onClick={handleSaveProfile} disabled={isSaving}>
              <Save size={18} />
              {isSaving ? "Salvando..." : "Salvar alterações"}
            </SaveButton>
          </FormSection>
        </ProfileContainer>
      </ProfileWrapper>
    </AnimatePresence>
  );
};

export default ProfileTab;
