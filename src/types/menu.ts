export enum MenuLink {
  Classroom = "/",
  Student = "/student",
  ClassroomStudent = "/classroom-student",
}

export const MenuItems: Partial<
  Record<MenuLink, { href: string; title: string }>
> = {
  [MenuLink.Classroom]: {
    href: MenuLink.Classroom,
    title: "Classroom",
  },
  [MenuLink.Student]: {
    href: MenuLink.Student,
    title: "Student",
  },
};
