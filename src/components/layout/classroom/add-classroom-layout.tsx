"use client";
import {
  createClassroomAction,
  updateClassroomAction,
} from "@/actions/classroom";
import { InputField } from "@/components/input/input-field";
import { IGraphqlResponse } from "@/libs/graphql-request";
import { CreateClassroomInput } from "@/types/input";
import { MenuLink } from "@/types/menu";
import { ClassroomObject } from "@/types/object";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export const AddClassroomLayout = ({
  action = "create",
  data,
}: {
  action?: "create" | "update";
  data?: ClassroomObject;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let res: IGraphqlResponse;
    setLoading(true);

    const input: CreateClassroomInput = {
      classname: formData.get("classroomname") as string,
      academic_year: +(formData.get("academicyear") as string),
      homeroom_teacher: formData.get("classroomteacher") as string,
    };
    console.log({ input });
    if (action === "create") {
      res = await createClassroomAction(input);
    } else {
      res = await updateClassroomAction({
        ...input,
        classroomid: data?.classroomid ?? 0,
      });
    }
    setLoading(false);
    if (res.ok) {
      toast.success(`${action} success`.toUpperCase());
      router.push(MenuLink.Classroom);
    } else {
      toast.error(res.error);
    }
  };
  return (
    <form className="flex justify-center" onSubmit={onSubmit}>
      <div className="max-w-xl w-full">
        <InputField
          required
          minLength={1}
          name="classroomname"
          label="ชื่อห้อง"
          errorChild={<p>กรุณากรอกชื่อห้อง</p>}
          defaultValue={data?.classname}
        />
        <InputField
          required
          type="number"
          min="1900"
          max="3000"
          name="academicyear"
          label="ปีการศึกษา"
          errorChild={<p>กรุณากรอกปีการศึกษา 1900 - 3000</p>}
          defaultValue={data?.academic_year}
        />
        <InputField
          required
          minLength={1}
          name="classroomteacher"
          label="ครูที่ปรึกษา"
          errorChild={<p>กรุณากรอกครูที่ปรึกษา</p>}
          defaultValue={data?.homeroom_teacher}
        />
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
};
