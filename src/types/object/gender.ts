import { StudentObject } from "./student";

export interface GenderObject {
  genderid: number;

  gendername: string;

  student?: StudentObject[];
}
