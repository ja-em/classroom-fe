"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { deleteStudentAction } from "@/actions/student";
import { toast } from "react-toastify";
import { StudentObject } from "@/types/object";

export const DeleteStudentButton = ({ item }: { item: StudentObject }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const name = `${item.prefix?.prefixname} ${item.firstname} ${item.lastname}`;
  const onDelete = async () => {
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
      <button className="btn btn-error btn-xs" onClick={() => setOpen(true)}>
        Delete
      </button>
      <ConfirmDialog
        dialogId={"confirm-delete" + "-" + item.studentid}
        open={open}
        onOpenChange={(o) => setOpen(o)}
        confirmLabel="Delete"
        dialogTitle="ยืนยันการลบนักเรียน"
        dialogDesc={`คุณแน่ใจหรือไม่ว่าต้องการลบ ${name}`}
        loading={loading}
        onConfirm={onDelete}
      />
    </>
  );
};
