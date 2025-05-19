import { AddClassroomLayout } from "@/components/layout/classroom/add-classroom-layout";
import MainLayout from "@/components/main-layout";
import { MenuLink } from "@/types/menu";
import { Suspense } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function CreateClassroomPage() {
  return (
    <MainLayout
      active={MenuLink.Classroom}
      title={
        <div className="flex items-center space-x-2">
          <p>Classroom</p>
          <MdOutlineKeyboardDoubleArrowRight />
          <p>Create</p>
        </div>
      }
      hideSearch
    >
      <Suspense fallback={<div>Loading...</div>}>
        <AddClassroomLayout />
      </Suspense>
    </MainLayout>
  );
}
