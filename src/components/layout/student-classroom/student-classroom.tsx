import Link from "next/link";
import { TableWrapper } from "../../table/table-wrapper";
import { MenuLink } from "@/types/menu";
import { getStudentClassroomByClassroomIdAction } from "@/actions/student-classroom";
import { redirect } from "next/navigation";
import { DeleteStudentClassroomButton } from "./delete-student-classroom-button";

export async function StudentClassroomLayout({
  classroomId,
}: {
  classroomId: number;
}) {
  const res = await getStudentClassroomByClassroomIdAction(classroomId);
  if (!res.ok) {
    return redirect(MenuLink.Classroom);
  }
  return (
    <TableWrapper pagination={res.data.getStudentClassroomByClassroomId}>
      <TableWrapper.RightArea>
        <div className="flex space-x-2">
          <Link
            href={`${MenuLink.Classroom}${classroomId}/student-classroom/add`}
            className="btn btn-success"
          >
            Add Student to this classroom
          </Link>
        </div>
      </TableWrapper.RightArea>
      {/* head */}
      <thead>
        <tr className="bg-black text-white">
          <th>เลขประจำตัวนักเรียน</th>
          <th>คำนำหน้าชื่อ</th>
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>เพศ</th>
          <th>ระดับชั้น</th>
          <th>วันเกิด</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {res.data.getStudentClassroomByClassroomId.items
          // .map((e) => e.student)
          .map((obj) => {
            const { student: item } = obj;
            return (
              <tr key={item.studentid}>
                <th>{item.studentid}</th>
                <td>{item.prefix?.prefixname}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.gender?.gendername}</td>
                <td>{item.gradelevel?.levelname}</td>
                <td>{item.birthdate.toString().split("T")[0]}</td>
                <td className="flex justify-end space-x-2">
                  <DeleteStudentClassroomButton
                    item={item}
                    classroomId={classroomId}
                    studentClassroomId={obj.student_classroom_id}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </TableWrapper>
  );
}

StudentClassroomLayout.Loading = function Loading() {
  return (
    <TableWrapper>
      <TableWrapper.RightArea>
        <div className="flex space-x-2">
          <Link href={""} className="btn btn-success">
            Loading...
          </Link>
        </div>
      </TableWrapper.RightArea>
      {/* head */}
      <thead>
        <tr className="bg-black text-white">
          <th>เลขประจำตัวนักเรียน</th>
          <th>คำนำหน้าชื่อ</th>
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>เพศ</th>
          <th>ระดับชั้น</th>
          <th>วันเกิด</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colSpan={8}>Loading...</td>
        </tr>
      </tbody>
    </TableWrapper>
  );
};
