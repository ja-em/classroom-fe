import { StudentObject } from "./student";
import { ClassroomObject } from "./classroom";

export interface StudentClassroomObject {
  student_classroom_id: number;

  studentid: number;

  classroomid: number;

  student: StudentObject;

  classroom: ClassroomObject;
}
