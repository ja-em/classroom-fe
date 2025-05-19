import { StudentClassroomLayout } from "@/components/layout/student-classroom/student-classroom";
import MainLayout from "@/components/main-layout";
import { MenuLink } from "@/types/menu";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default async function StudentClassroomPage({
  params,
}: {
  params: Promise<{ classroom_id: string }>;
}) {
  const { classroom_id } = await params;
  if (Number.isNaN(+classroom_id)) {
    return redirect(MenuLink.Classroom);
  }
  return (
    <MainLayout
      active={MenuLink.Classroom}
      title={
        <div className="flex items-center space-x-2">
          <p>Classroom Number {classroom_id}</p>
          <MdOutlineKeyboardDoubleArrowRight />
          <p>Manage Student Classroom</p>
        </div>
      }
      hideSearch
    >
      <Suspense fallback={<div>Loading...</div>}>
        <StudentClassroomLayout classroomId={+classroom_id} />
      </Suspense>
    </MainLayout>
  );
}
