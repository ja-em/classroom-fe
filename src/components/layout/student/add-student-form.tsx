"use client";
import { createStudentAction, updateStudentAction } from "@/actions/student";
import { CreateStudentInput } from "@/types/input";
import { MenuLink } from "@/types/menu";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export function AddStudentFormProvider({
  children,
  className,
  action = "create",
  studentId,
}: {
  children: React.ReactNode;
  className?: string;
  action?: "create" | "update";
  studentId?: number;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let res: { ok: boolean; error?: any };
    setLoading(true);
    const input: CreateStudentInput = {
      prefixid: +(formData.get("prefixid") as string),
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      genderid: +(formData.get("genderid") as string),
      birthdate: formData.get("birthdate") as unknown as Date,
      gradelevelid: +(formData.get("gradelevelid") as string),
    };
    if (action === "create") {
      res = await createStudentAction(input);
    } else {
      res = await updateStudentAction({
        ...input,
        studentid: studentId ?? 0,
      });
    }
    setLoading(false);
    if (res.ok) {
      toast.success(action.toLocaleUpperCase() + " Success");
      router.push(MenuLink.Student);
    } else {
      toast.error(res.error);
    }
  };
  return (
    <form className={className} onSubmit={onSubmit}>
      <div className="max-w-xl w-full">
        {children}
        <button
          type="submit"
          className="btn btn-success w-full"
          disabled={loading}
        >
          {loading && <span className="loading loading-spinner" />}
          บันทึก
        </button>
      </div>
    </form>
  );
}
