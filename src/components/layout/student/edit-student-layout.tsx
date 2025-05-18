import { getStudentByIdAction } from '@/actions/student';
import { AddStudentLayout } from './add-student-layout';

export const EditStudentLayout = async ({
  studentId,
}: {
  studentId: number;
}) => {
  const res = await getStudentByIdAction(studentId);

  return <AddStudentLayout action="update" data={res} />;
};
