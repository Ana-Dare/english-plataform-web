import type { StudentMock } from './CreateClassModal';

export interface ClassType {
  id: string;
  name: string;
  level: string;
  students: StudentMock[];
}
