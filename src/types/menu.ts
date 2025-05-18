export enum MenuLink {
  Classroom = '/',
  Student = '/student',
  ClassroomStudent = '/classroom-student',
}

export const MenuItems: Record<MenuLink, { href: string; title: string }> = {
  [MenuLink.Classroom]: {
    href: MenuLink.Classroom,
    title: 'Classroom',
  },
  [MenuLink.Student]: {
    href: MenuLink.Student,
    title: 'Student',
  },
  [MenuLink.ClassroomStudent]: {
    href: MenuLink.ClassroomStudent,
    title: 'Classroom Student',
  },
};
