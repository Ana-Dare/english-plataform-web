import { FormHeader, FormWrapper } from "../style";
import Input from "../components/Input";
import Button from "../../Button";
import { useMemo, useRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import useResetPassword from "../../../contexts/Auth/hooks/useResetPassword";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckPasswordContainer,
  CheckPasswordItem,
  CheckPasswordLabel,
  CheckPasswordWrapper,
  FormError,
  type StatusPassword,
} from "./style";

interface ResetPasswordProps {
  title: string;
}

const STRENGTH_LEVELS: StatusPassword[] = [
  "veryWeak",
  "weak",
  "strong",
  "veryStrong",
];

const STRENGTH_LABEL: Record<StatusPassword, string> = {
  veryWeak: "Muito fraca",
  weak: "Fraca",
  strong: "Forte",
  veryStrong: "Excelente",
};

const containsNumber = (password: string) => /\d/.test(password);
const containsCapitalLetter = (password: string) => /[A-Z]/.test(password);
const containsSpecialCharacter = (password: string) =>
  /[!@#$%^&*(),.?":{}|<>]/.test(password);

const calculateStrength = (password: string): StatusPassword | null => {
  if (!password) return null;

  let score = 0;
  if (password.length >= 8) score++;
  if (containsNumber(password)) score++;
  if (containsCapitalLetter(password)) score++;
  if (containsSpecialCharacter(password)) score++;

  if (score <= 0) return null;
  return STRENGTH_LEVELS[Math.min(score, STRENGTH_LEVELS.length) - 1];
};

const FormResetPassword = ({ title }: ResetPasswordProps) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisiblePasswordConfirm, setIsVisiblePasswordConfirm] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = useResetPassword();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const token = searchParams.get("token");

  const statusPassword = useMemo(
    () => calculateStrength(newPassword),
    [newPassword],
  );
  const activeIndex = statusPassword
    ? STRENGTH_LEVELS.indexOf(statusPassword)
    : -1;
  const showCheck = newPassword.length > 0;

  const clearForm = () => {
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async () => {
    setError(null);

    if (!newPassword || !confirmPassword) {
      setError("Preencha todos os campos");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    if (!statusPassword || statusPassword === "veryWeak") {
      setError("Escolha uma senha mais forte");
      return;
    }
    if (!token) {
      setError("Token inválido ou ausente");
      return;
    }

    try {
      await resetPassword({ token, newPassword });
      clearForm();
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Não foi possível redefinir a senha. Tente novamente.");
    }
  };

  return (
    <FormWrapper>
      <FormHeader>
        <h2>{title}</h2>
      </FormHeader>
      <Input
        label="Nova senha"
        ref={inputRef}
        value={newPassword}
        onChange={(e) => setNewPassword(e.currentTarget.value)}
        placeholder="Digite sua nova senha"
        type={isVisiblePassword ? "text" : "password"}
        iconLeft={<Lock size={18} color="#94a3b8" />}
        iconRight={
          isVisiblePassword ? (
            <EyeOff
              size={18}
              color="#94a3b8"
              style={{ cursor: "pointer" }}
              onClick={() => setIsVisiblePassword((prev) => !prev)}
            />
          ) : (
            <Eye
              size={18}
              color="#94a3b8"
              style={{ cursor: "pointer" }}
              onClick={() => setIsVisiblePassword((prev) => !prev)}
            />
          )
        }
      />
      {showCheck && (
        <CheckPasswordContainer>
          <CheckPasswordWrapper>
            {STRENGTH_LEVELS.map((_, idx) => (
              <CheckPasswordItem
                key={idx}
                color={idx <= activeIndex ? statusPassword : null}
              />
            ))}
          </CheckPasswordWrapper>
          <CheckPasswordLabel color={statusPassword}>
            {statusPassword
              ? STRENGTH_LABEL[statusPassword]
              : "Use letras, números e símbolos"}
          </CheckPasswordLabel>
        </CheckPasswordContainer>
      )}

      <Input
        label="Confirmar nova senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        placeholder="Confirme sua nova senha"
        type={isVisiblePasswordConfirm ? "text" : "password"}
        iconLeft={<Lock size={18} color="#94a3b8" />}
        iconRight={
          isVisiblePasswordConfirm ? (
            <EyeOff
              size={18}
              color="#94a3b8"
              style={{ cursor: "pointer" }}
              onClick={() => setIsVisiblePasswordConfirm((prev) => !prev)}
            />
          ) : (
            <Eye
              size={18}
              color="#94a3b8"
              style={{ cursor: "pointer" }}
              onClick={() => setIsVisiblePasswordConfirm((prev) => !prev)}
            />
          )
        }
      />

      {error && <FormError>{error}</FormError>}

      <Button
        children="Redefinir"
        $variant="secondary"
        wide
        onClick={handleSubmit}
        style={{
          background: "#111f37",
          borderColor: "#111f37",
          color: "#fff",
        }}
      />
    </FormWrapper>
  );
};

export default FormResetPassword;
