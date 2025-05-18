import { MenuLink } from "@/types/menu";
import MainLayout from "@/components/main-layout";
import { Suspense } from "react";
import { ClassroomLayout } from "@/components/layout/classroom/classroom-layout";
import { GetAllClassroomInput } from "@/types/input";

export default async function Index({
  searchParams,
}: {
  searchParams: Promise<Partial<Record<keyof GetAllClassroomInput, string>>>;
}) {
  const search = await searchParams;
  return (
    <MainLayout active={MenuLink.Classroom}>
      <Suspense fallback={<ClassroomLayout.Loading />}>
        <ClassroomLayout searchParams={search} />
      </Suspense>
    </MainLayout>
  );
}
