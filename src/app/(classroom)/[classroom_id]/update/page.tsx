import { UpdateClassroomLayout } from "@/components/layout/classroom/update-classroom-layout";
import MainLayout from "@/components/main-layout";
import { MenuLink } from "@/types/menu";
import { Suspense } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default async function CreateClassroomPage({
  params,
}: {
  params: Promise<{ classroom_id: string }>;
}) {
  const { classroom_id } = await params;
  return (
    <MainLayout
      active={MenuLink.Classroom}
      title={
        <div className="flex items-center space-x-2">
          <p>Classroom</p>
          <MdOutlineKeyboardDoubleArrowRight />
          <p>Update</p>
        </div>
      }
      hideSearch
    >
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateClassroomLayout classroomId={+classroom_id} />
      </Suspense>
    </MainLayout>
  );
}
