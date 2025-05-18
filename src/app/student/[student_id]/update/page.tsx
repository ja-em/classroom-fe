import { EditStudentLayout } from '@/components/layout/student/edit-student-layout';
import MainLayout from '@/components/main-layout';
import { MenuLink } from '@/types/menu';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

export default async function UpdateStudentPage({
  params,
}: {
  params: Promise<{ student_id: string }>;
}) {
  const { student_id } = await params;
  if (Number.isNaN(+student_id)) {
    redirect(MenuLink.Student);
  }

  return (
    <MainLayout
      active={MenuLink.Student}
      title={
        <div className="flex items-center space-x-2">
          <p>Student</p>
          <MdOutlineKeyboardDoubleArrowRight />
          <p>Update</p>
        </div>
      }
      hideSearch
    >
      <Suspense fallback={<div>Loading...</div>}>
        <EditStudentLayout studentId={+student_id} />
      </Suspense>
    </MainLayout>
  );
}
