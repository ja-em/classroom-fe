import Link from "next/link";
import { TableWrapper } from "../../table/table-wrapper";
import { MenuLink } from "@/types/menu";
import { DeleteStudentButton } from "./delete-student";
import { getAllStudentAction } from "@/actions/student";
import { IStudentPageSearchParams } from "@/app/student/page";
import { SelectGradeWrapper } from "./select-grade-wrapper";
import { Suspense } from "react";
import { GetAllStudentInput } from "@/types/input";
import { StudentObject } from "@/types/object";
import { AddStudentClassroomButton } from "../student-classroom/add-student-classroom-button";

export async function StudentLayout({
  searchParams,
  classroomId,
  atStudentClassroomPage,
}: {
  searchParams: IStudentPageSearchParams;
  atStudentClassroomPage?: boolean;
  classroomId?: number;
}) {
  const { page, limit, keyword, gradlevelId } = searchParams;
  const filter: GetAllStudentInput = {
    page: page ? +page : 1,
    limit: limit ? +limit : 10,
    keyword: keyword,
    gradlevelId: gradlevelId ? +gradlevelId : undefined,
  };

  const res = await getAllStudentAction(filter);

  const renderActionColumn = (item: StudentObject) => {
    if (atStudentClassroomPage) {
      const isInclude = (item?.student_classroom ?? []).some(
        (e) => e.classroomid === classroomId
      );
      if (isInclude) {
        return (
          <button disabled className="btn btn-success btn-xs">
            Already in this classroom
          </button>
        );
      }
      return (
        <AddStudentClassroomButton item={item} classroomId={classroomId ?? 0} />
      );
    }
    return (
      <>
        <Link
          className="btn btn-warning btn-xs"
          href={`${MenuLink.Student}/${item.studentid}/update`}
        >
          Edit
        </Link>
        <DeleteStudentButton item={item} />
      </>
    );
  };
  return (
    <TableWrapper pagination={res}>
      <TableWrapper.RightArea>
        <div className="flex space-x-2">
          {!atStudentClassroomPage && (
            <Link
              href={`${MenuLink.Student}/create`}
              className="btn btn-success"
            >
              Add Student
            </Link>
          )}
          <Suspense fallback={<div className="skeleton h-4 w-20"></div>}>
            <SelectGradeWrapper />
          </Suspense>
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
        {res.items.map((item) => {
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
                {renderActionColumn(item)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
}

StudentLayout.Loading = function Loading() {
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
