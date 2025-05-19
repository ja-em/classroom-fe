import { PaginationInput } from "./pagination";

export class GetAllClassroomInput extends PaginationInput {}

export interface CreateClassroomInput {
  classname: string;
  academic_year: number;
  homeroom_teacher: string;
}

export interface UpdateClassroomInput extends Partial<CreateClassroomInput> {
  classroomid: number;
}

export interface CreateStudentClassroomInput {
  classroomId: number;
  studentId: number;
}
