import { IPaginationResponse } from "../interface";
import { StudentClassroomObject } from "./student-classroom";

export interface ClassroomObject {
  classroomid: number;

  classname: string;

  academic_year: number;

  homeroom_teacher: string;

  student_classroom?: StudentClassroomObject[];
}

export type ClassroomPaginationObject = IPaginationResponse<ClassroomObject>;
