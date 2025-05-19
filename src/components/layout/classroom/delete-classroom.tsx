"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { toast } from "react-toastify";
import { ClassroomObject } from "@/types/object";
import { removeClassroomAction } from "@/actions/classroom";

export const DeleteClassroomButton = ({ item }: { item: ClassroomObject }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const name = `${item.classname} ปีการศึกษา ${item.academic_year}`;
  const onDelete = async () => {
    setLoading(true);
    const res = await removeClassroomAction(item.classroomid);
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
        Delete
      </button>
      <ConfirmDialog
        dialogId={"confirm-delete" + "-" + item.classroomid}
        open={open}
        onOpenChange={(o) => setOpen(o)}
        confirmLabel="Delete"
        dialogTitle="ยืนยันการลบห้องเรียน"
        dialogDesc={`คุณแน่ใจหรือไม่ว่าต้องการลบห้องเรียน ${name}`}
        loading={loading}
        onConfirm={onDelete}
      />
    </>
  );
};
