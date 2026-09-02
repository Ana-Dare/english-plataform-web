import type { RegisterStudentParams } from "../../../../interfaces/students";

/** Campos extras coletados no formulário que não fazem parte do payload da API */
export interface StudentFormExtras {
  gender: string;
  photoUrl?: string | null; // data URL para preview
  photoBlob?: Blob | null; // blob para envio
  turma: string;
}

/** Estado completo do formulário de cadastro (payload + extras de UI) */
export type StudentFormState = RegisterStudentParams & StudentFormExtras;

export interface LevelOption {
  id: number;
  name: string;
}

/** Chaves validáveis da etapa 1 (dados pessoais) */
export type PersonalFieldKey =
  | "name"
  | "cpf_hash"
  | "email"
  | "phone"
  | "birthdate";

export type FieldErrors = Partial<Record<PersonalFieldKey, string>>;
