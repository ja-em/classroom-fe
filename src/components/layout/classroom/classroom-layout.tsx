import Link from "next/link";
import { TableWrapper } from "../../table/table-wrapper";
import { MenuLink } from "@/types/menu";
import { getAllClassroomAction } from "@/actions/classroom";
import { GetAllClassroomInput } from "@/types/input";
import { DeleteClassroomButton } from "./delete-classroom";

export async function ClassroomLayout({
  searchParams,
}: {
  searchParams: Partial<Record<keyof GetAllClassroomInput, string>>;
}) {
  const filter: GetAllClassroomInput = {
    keyword: searchParams.keyword,
    page: searchParams?.page ? +searchParams.page : 1,
    limit: searchParams?.limit ? +searchParams.limit : 10,
  };
  const res = await getAllClassroomAction(filter);
  return (
    <TableWrapper pagination={res}>
      <TableWrapper.RightArea>
        <div className="flex space-x-2">
          <Link
            href={`${MenuLink.Classroom}create`}
            className="btn btn-success"
          >
            Add Classroom
          </Link>
        </div>
      </TableWrapper.RightArea>
      {/* head */}
      <thead>
        <tr className="bg-black text-white">
          <th>เลขที่ห้อง</th>
          <th>ชื่อห้อง</th>
          <th>ปีการศึกษา</th>
          <th>ครูประจําชั้น</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {res?.items.map((item) => {
          return (
            <tr key={item.classroomid}>
              <td>{item.classroomid}</td>
              <td>{item.classname}</td>
              <td>{item.academic_year}</td>
              <td>{item.homeroom_teacher}</td>
              <td className="flex justify-end space-x-2">
                <Link
                  className="btn btn-primary btn-xs"
                  href={`${MenuLink.Classroom}${item.classroomid}/classroom-student`}
                >
                  Student
                </Link>
                <Link
                  className="btn btn-warning btn-xs"
                  href={`${MenuLink.Classroom}${item.classroomid}/update`}
                >
                  Edit
                </Link>
                <DeleteClassroomButton item={item} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
}

ClassroomLayout.Loading = function Loading() {
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
          <th>เลขที่ห้อง</th>
          <th>ชื่อห้อง</th>
          <th>ปีการศึกษา</th>
          <th>ครูประจําชั้น</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colSpan={5}>Loading...</td>
        </tr>
      </tbody>
    </TableWrapper>
  );
};
