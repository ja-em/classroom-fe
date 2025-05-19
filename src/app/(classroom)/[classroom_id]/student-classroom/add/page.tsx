import { IStudentPageSearchParams } from "@/app/student/page";
import { StudentLayout } from "@/components/layout/student/student";
import MainLayout from "@/components/main-layout";
import { MenuLink } from "@/types/menu";
import { Suspense } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default async function StudentPage({
  searchParams,
  params,
}: {
  params: Promise<{ classroom_id: string }>;
  searchParams: Promise<IStudentPageSearchParams>;
}) {
  const [searchParamsQuery, { classroom_id }] = await Promise.all([
    searchParams,
    params,
  ]);

  return (
    <MainLayout
      active={MenuLink.Classroom}
      title={
        <div className="flex items-center space-x-2">
          <p>Classroom Number {classroom_id}</p>
          <MdOutlineKeyboardDoubleArrowRight />
          <p>Add student to the classroom</p>
        </div>
      }
    >
      <Suspense fallback={<StudentLayout.Loading />}>
        <StudentLayout
          searchParams={searchParamsQuery}
          atStudentClassroomPage
          classroomId={+classroom_id}
        />
      </Suspense>
    </MainLayout>
  );
}
