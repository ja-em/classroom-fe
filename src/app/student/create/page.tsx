import { AddStudentLayout } from '@/components/layout/student/add-student-layout';
import MainLayout from '@/components/main-layout';
import { MenuLink } from '@/types/menu';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

export default async function CreateStudentPage() {
  return (
    <MainLayout
      active={MenuLink.Student}
      title={
        <div className="flex items-center space-x-2">
          <p>Student</p>
          <MdOutlineKeyboardDoubleArrowRight />
          <p>Create</p>
        </div>
      }
      hideSearch
    >
      <AddStudentLayout />
    </MainLayout>
  );
}
