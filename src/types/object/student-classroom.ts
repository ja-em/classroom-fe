import { StudentObject } from "./student";
import { ClassroomObject } from "./classroom";
import { IPaginationResponse } from "../interface";

export interface StudentClassroomObject {
  student_classroom_id: number;

  studentid: number;

  classroomid: number;

  student: StudentObject;

  classroom: ClassroomObject;
}

export type StudentClassroomPaginationObject =
  IPaginationResponse<StudentClassroomObject>;
