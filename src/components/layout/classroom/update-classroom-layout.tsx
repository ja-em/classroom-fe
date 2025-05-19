import { getClassroomByIdAction } from "@/actions/classroom";
import { AddClassroomLayout } from "./add-classroom-layout";
import { redirect } from "next/navigation";
import { MenuLink } from "@/types/menu";

export async function UpdateClassroomLayout({
  classroomId,
}: {
  classroomId: number;
}) {
  const res = await getClassroomByIdAction(classroomId);
  if (!res.ok) {
    return redirect(MenuLink.Classroom);
  }
  return (
    <AddClassroomLayout action="update" data={res.data.getClassroomById} />
  );
}
