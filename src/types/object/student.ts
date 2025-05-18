import { PrefixObject } from "./prefix";
import { GenderObject } from "./gender";
import { GradeLevelObject } from "./gradelevel";
import { StudentClassroomObject } from "./student-classroom";
import { IPaginationResponse } from "../interface";

export interface StudentObject {
  studentid: number;

  prefixid?: number;

  firstname: string;

  lastname: string;

  genderid?: number;

  birthdate: Date;

  gradelevelid?: number;

  prefix?: PrefixObject;

  gender?: GenderObject;

  gradelevel?: GradeLevelObject;

  student_classroom?: StudentClassroomObject[];
}

export type StudentPaginationObject =
  IPaginationResponse<StudentClassroomObject>;
