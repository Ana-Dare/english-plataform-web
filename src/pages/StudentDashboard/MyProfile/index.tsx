import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Camera, CheckCircle, Save, Mail, Key, Bell, Smartphone } from 'lucide-react';
import {
  ProfileContainer, HeaderArea, BigAvatar, HeaderTexts,
  SectionCard, SectionTitle, FormGrid, FormGroup, InputWrapper, ButtonContainer, SaveButton, SuccessMessage
} from './style';

const MyProfile: React.FC = () => {
  // States for Personal Info
  const [name, setName] = useState('Aluno Fulano Siciliano da Silva');
  const [email, setEmail] = useState('fulano.siciliano.silva@gmail.com');
  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [infoSaved, setInfoSaved] = useState(false);

  // Avatar State
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  // States for Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  
  // States for Preferences
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);
  const [prefsSaved, setPrefsSaved] = useState(false);

  const handleSaveInfo = () => {
    setIsSavingInfo(true);
    setInfoSaved(false);
    setTimeout(() => {
      setIsSavingInfo(false);
      setInfoSaved(true);
      setTimeout(() => setInfoSaved(false), 3000);
    }, 1500);
  };

  const handleSavePassword = () => {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      alert("Por favor, preencha as senhas corretamente. A nova senha e a confirmação devem ser iguais.");
      return;
    }
    setIsSavingPassword(true);
    setPasswordSaved(false);
    setTimeout(() => {
      setIsSavingPassword(false);
      setPasswordSaved(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSaved(false), 3000);
    }, 1500);
  };

  const handleSavePrefs = () => {
    setIsSavingPrefs(true);
    setPrefsSaved(false);
    setTimeout(() => {
      setIsSavingPrefs(false);
      setPrefsSaved(true);
      setTimeout(() => setPrefsSaved(false), 3000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <ProfileContainer>
        <HeaderArea>
          <BigAvatar>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <User size={40} />
            )}
            <div className="edit-icon" title="Alterar foto" onClick={() => fileInputRef.current?.click()}>
              <Camera size={16} />
            </div>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImageChange} 
            />
          </BigAvatar>
          <HeaderTexts>
            <h1>Configurações do Perfil</h1>
            <p>Gerencie suas informações pessoais e opções de segurança.</p>
          </HeaderTexts>
        </HeaderArea>

        <SectionCard>
          <SectionTitle>
            <User size={24} /> Informações Pessoais
          </SectionTitle>
          <FormGrid>
            <FormGroup>
              <label>Nome Completo</label>
              <InputWrapper>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Seu nome"
                />
                <User size={18} />
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <label>Endereço de E-mail</label>
              <InputWrapper>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Seu e-mail"
                />
                <Mail size={18} />
              </InputWrapper>
            </FormGroup>
          </FormGrid>
          
          <ButtonContainer>
            {infoSaved && (
              <SuccessMessage>
                <CheckCircle size={18} /> Dados atualizados!
              </SuccessMessage>
            )}
            <SaveButton $loading={isSavingInfo} onClick={handleSaveInfo} disabled={isSavingInfo}>
              {isSavingInfo ? 'Salvando...' : <><Save size={18} /> Salvar Alterações</>}
            </SaveButton>
          </ButtonContainer>
        </SectionCard>

        <SectionCard>
          <SectionTitle>
            <Lock size={24} /> Segurança (Alterar Senha)
          </SectionTitle>
          
          <FormGroup style={{ maxWidth: '400px' }}>
            <label>Senha Atual</label>
            <InputWrapper>
              <input 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Digite sua senha atual"
              />
              <Lock size={18} />
            </InputWrapper>
          </FormGroup>

          <FormGrid>
            <FormGroup>
              <label>Nova Senha</label>
              <InputWrapper>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                />
                <Key size={18} />
              </InputWrapper>
            </FormGroup>
            <FormGroup>
              <label>Confirmar Nova Senha</label>
              <InputWrapper>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                />
                <CheckCircle size={18} />
              </InputWrapper>
            </FormGroup>
          </FormGrid>

          <ButtonContainer>
            {passwordSaved && (
              <SuccessMessage>
                <CheckCircle size={18} /> Senha alterada com segurança!
              </SuccessMessage>
            )}
            <SaveButton $loading={isSavingPassword} onClick={handleSavePassword} disabled={isSavingPassword}>
              {isSavingPassword ? 'Atualizando...' : <><Lock size={18} /> Atualizar Senha</>}
            </SaveButton>
          </ButtonContainer>
        </SectionCard>

        <SectionCard>
          <SectionTitle>
            <Bell size={24} /> Preferências de Notificação
          </SectionTitle>
          
          <FormGrid>
            <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#fafafa', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={24} color="#2563eb" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>E-mails Promocionais</span>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>Receba novidades e dicas semanais no seu e-mail.</span>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={emailNotif} 
                onChange={(e) => setEmailNotif(e.target.checked)} 
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </FormGroup>
            <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#fafafa', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Smartphone size={24} color="#2563eb" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>Lembretes de Aula</span>
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>Notificações sobre o início das suas aulas ao vivo.</span>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={pushNotif} 
                onChange={(e) => setPushNotif(e.target.checked)} 
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </FormGroup>
          </FormGrid>

          <ButtonContainer>
            {prefsSaved && (
              <SuccessMessage>
                <CheckCircle size={18} /> Preferências salvas!
              </SuccessMessage>
            )}
            <SaveButton $loading={isSavingPrefs} onClick={handleSavePrefs} disabled={isSavingPrefs}>
              {isSavingPrefs ? 'Salvando...' : <><Save size={18} /> Salvar Preferências</>}
            </SaveButton>
          </ButtonContainer>
        </SectionCard>

      </ProfileContainer>
    </motion.div>
  );
};

export default MyProfile;
