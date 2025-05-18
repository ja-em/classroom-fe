import { StudentObject } from "./student";

export interface PrefixObject {
  prefixid: number;

  prefixname: string;

  student?: StudentObject[];
}
