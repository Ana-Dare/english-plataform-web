import React, { useState, useRef } from "react";
import { useProfile } from "../../../contexts/ProfileContext";
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
  PasswordToggle,
} from "./style";
import {
  Camera,
  Upload,
  Trash2,
  User,
  Mail,
  Phone,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Save,
  UserCircle,
  Shield,
} from "lucide-react";
import { useToast } from "../../../contexts/ToastContext";
import { motion, AnimatePresence } from "framer-motion";

const ProfileTab: React.FC = () => {
  const { addToast } = useToast();
  const { profile, updateProfile, updatePhoto } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [description, setDescription] = useState(profile.description);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePhoto(reader.result as string);
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

  const handleSaveProfile = () => {
    updateProfile({
      firstName,
      lastName,
      email,
      phone,
      description,
    });
    addToast("Perfil atualizado com sucesso!", "success");
  };

  const handleSavePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      addToast("Preencha todos os campos de senha.", "warning");
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast("As senhas não coincidem.", "error");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    addToast("Senha alterada com sucesso!", "success");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <AnimatePresence>
      <ProfileWrapper>
        <motion.div variants={itemVariants} initial="hidden" animate="visible" style={{ marginBottom: '1.5rem' }}>
          <ProfilePageTitle>Meu Perfil</ProfilePageTitle>
          <ProfilePageSubtitle>
            Gerencie suas informações pessoais e configurações de conta
          </ProfilePageSubtitle>
        </motion.div>

        <ProfileContainer as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
          
          <PhotoSection as={motion.div} variants={itemVariants}>
              <AvatarUpload>
                <AvatarImage $hasPhoto={!!profile.photoUrl}>
                  {profile.photoUrl ? (
                    <img src={profile.photoUrl} alt="Foto de perfil" />
                  ) : (
                    <User size={44} />
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
                <h3>{firstName || 'Meu'} {lastName || 'Perfil'}</h3>
                <p>
                  Formatos aceitos: JPG, PNG.
                  <br />Tamanho máximo: 5MB.
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
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Seu nome"
                    />
                  </InputWrapper>
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
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Seu sobrenome"
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    <Mail size={14} />
                    Email
                  </FormLabel>
                  <InputWrapper>
                    <Mail className="input-icon" />
                    <FormInput
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </InputWrapper>
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
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </InputWrapper>
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

              <SaveButton onClick={handleSaveProfile}>
                <Save size={18} />
                Salvar alterações
              </SaveButton>
            </FormSection>

            {/* Password Section */}
            <FormSection as={motion.div} variants={itemVariants}>
              <FormSectionTitle>
                <Shield size={20} />
                Alterar Senha
              </FormSectionTitle>
              <FormGrid>
                <FormGroup $fullWidth>
                  <FormLabel>
                    <Lock size={14} />
                    Senha atual
                  </FormLabel>
                  <InputWrapper>
                    <Lock className="input-icon" />
                    <FormInput
                      type={showCurrentPwd ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Digite sua senha atual"
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                    >
                      {showCurrentPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </PasswordToggle>
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    <Lock size={14} />
                    Nova senha
                  </FormLabel>
                  <InputWrapper>
                    <Lock className="input-icon" />
                    <FormInput
                      type={showNewPwd ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digite a nova senha"
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowNewPwd(!showNewPwd)}
                    >
                      {showNewPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </PasswordToggle>
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    <Lock size={14} />
                    Confirmar nova senha
                  </FormLabel>
                  <InputWrapper>
                    <Lock className="input-icon" />
                    <FormInput
                      type={showConfirmPwd ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirme a nova senha"
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                    >
                      {showConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </PasswordToggle>
                  </InputWrapper>
                </FormGroup>
              </FormGrid>

              <SaveButton onClick={handleSavePassword}>
                <Lock size={18} />
                Alterar senha
              </SaveButton>
            </FormSection>
        </ProfileContainer>
      </ProfileWrapper>
    </AnimatePresence>
  );
};

export default ProfileTab;
