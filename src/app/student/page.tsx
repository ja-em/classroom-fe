import { StudentLayout } from "@/components/layout/student/student";
import MainLayout from "@/components/main-layout";
import { GetAllStudentInput } from "@/types/input";
import { MenuLink } from "@/types/menu";
import { Suspense } from "react";

export type IStudentPageSearchParams = Record<keyof GetAllStudentInput, string>;

export default async function StudentPage({
  searchParams,
}: {
  searchParams: Promise<IStudentPageSearchParams>;
}) {
  const params = await searchParams;

  return (
    <MainLayout active={MenuLink.Student}>
      <Suspense fallback={<StudentLayout.Loading />}>
        <StudentLayout searchParams={params} />
      </Suspense>
    </MainLayout>
  );
}
