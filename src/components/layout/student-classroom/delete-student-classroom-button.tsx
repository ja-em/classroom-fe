"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { toast } from "react-toastify";
import { StudentObject } from "@/types/object";
import { removeStudentClassroomAction } from "@/actions/student-classroom";

export const DeleteStudentClassroomButton = ({
  item,
  classroomId,
  studentClassroomId,
}: {
  item: StudentObject;
  classroomId: number;
  studentClassroomId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const name = `${item.prefix?.prefixname} ${item.firstname} ${item.lastname}`;
  const onAddStudentClassroom = async () => {
    setLoading(true);
    const res = await removeStudentClassroomAction(
      studentClassroomId,
      classroomId
    );
    setLoading(false);
    if (res.ok) {
      setOpen(false);
      toast.success("Delete success");
    } else {
      toast.error(res.error);
    }
  };
  return (
    <>
      <button className="btn btn-error btn-xs" onClick={() => setOpen(true)}>
        Delete from classroom
      </button>
      <ConfirmDialog
        dialogId={"confirm-delete" + "-" + item.studentid}
        open={open}
        onOpenChange={(o) => setOpen(o)}
        confirmLabel="Delete"
        dialogTitle="ยืนยันการลบนักเรียนออกจากห้องเรียน"
        dialogDesc={`คุณแน่ใจหรือไม่ว่าต้องการลบนักเรียน ${name} ออกจากห้องเลขที่ ${classroomId}`}
        loading={loading}
        onConfirm={onAddStudentClassroom}
      />
    </>
  );
};
