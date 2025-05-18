import { StudentObject } from "./student";

export interface GradeLevelObject {
  gradelevelid: number;

  levelname: string;

  student?: StudentObject[];
}
