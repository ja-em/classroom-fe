"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { deleteStudentAction } from "@/actions/student";
import { toast } from "react-toastify";
import { StudentObject } from "@/types/object";

export const AddStudentClassroomButton = ({
  item,
  classroomId,
}: {
  item: StudentObject;
  classroomId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const name = `${item.prefix?.prefixname} ${item.firstname} ${item.lastname}`;
  const onAddStudentClassroom = async () => {
    setLoading(true);
    const res = await deleteStudentAction(item.studentid);
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
      <button className="btn btn-success btn-xs" onClick={() => setOpen(true)}>
        Add to classroom
      </button>
      <ConfirmDialog
        dialogId={"confirm-add" + "-" + item.studentid}
        open={open}
        onOpenChange={(o) => setOpen(o)}
        confirmLabel="Add"
        dialogTitle="ยืนยันการเพิ่มนักเรียนเข้าห้องเรียน"
        dialogDesc={`คุณแน่ใจหรือไม่ว่าต้องการเพิ่มนักเรียน ${name} เข้าห้องเลขที่ ${classroomId}`}
        loading={loading}
        onConfirm={onAddStudentClassroom}
      />
    </>
  );
};
