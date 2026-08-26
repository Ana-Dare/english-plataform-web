export interface RegisterStudentParams {
  name: string;
  cpf_hash: string;
  email: string;
  phone: string;
  birthdate: string;
  vip: 0 | 1;
  active: 0 | 1;
  level_id: number;
  notes?: string;
}

export interface RegisterStudentRes {
  message: string;
  student_id: number;
  invitationSent: boolean;
}

export interface IStudents {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  birthdate: string | null;
  active: boolean;
  role: "student";
  createdAt: string;
  profile: {
    levelId: number | null;
    vip: boolean;
    notes: string | null;
  };
}

export interface ListStudentsRes {
  students: IStudents[];
}

export interface UpdateStudentParams {
  name?: string;
  email?: string;
  cpf_hash?: string;
  phone?: string | null;
  birthdate?: string | null;
  level_id?: number | null;
  vip?: 0 | 1;
  notes?: string;
}

export interface UpdateStudentVariables {
  userId: number;
  params: UpdateStudentParams;
}
