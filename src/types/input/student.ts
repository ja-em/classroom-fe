import { PaginationInput } from "./pagination";

export interface GetAllStudentInput extends PaginationInput {
  keyword?: string;

  gradlevelId?: number;
}

export interface CreateStudentInput {
  prefixid: number;

  firstname: string;

  lastname: string;

  genderid: number;

  birthdate: Date;

  gradelevelid: number | null;
}

export interface UpdateStudentInput extends Partial<CreateStudentInput> {
  studentid: number;
}
