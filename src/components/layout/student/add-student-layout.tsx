import { getAllGenderAction } from "@/actions/gender";
import { getAllGradeLevelAction } from "@/actions/grade-level";
import { getAllPrefixAction } from "@/actions/prefix";
import { DateField } from "@/components/input/date-field";
import { InputField } from "@/components/input/input-field";
import { SelectField } from "@/components/input/select-field";
import { Suspense } from "react";
import { AddStudentFormProvider } from "./add-student-form";
import { StudentObject } from "@/types/object";

const Loading = <span className="loading loading-bars loading-md"></span>;

export const AddStudentLayout = ({
  action,
  data,
}: Pick<Parameters<typeof AddStudentFormProvider>[0], "action"> & {
  data?: StudentObject;
}) => {
  return (
    <AddStudentFormProvider
      className="flex justify-center"
      action={action}
      studentId={data?.studentid}
    >
      <Suspense fallback={Loading}>
        <AddStudentLayout.PrefixWrapper
          defaultValue={data?.prefixid?.toString()}
        />
      </Suspense>
      <InputField
        label="ชื่อ"
        minLength={1}
        required
        errorChild={<p>กรุณากรอกชื่อ</p>}
        name="firstname"
        defaultValue={data?.firstname}
      />
      <InputField
        label="นามสกุล"
        minLength={1}
        errorChild={<p>กรุณากรอกนามสกุล</p>}
        required
        name="lastname"
        defaultValue={data?.lastname}
      />
      <Suspense fallback={Loading}>
        <AddStudentLayout.GenderWrapper
          defaultValue={data?.genderid?.toString()}
        />
      </Suspense>
      <Suspense fallback={Loading}>
        <AddStudentLayout.GradeLevelWrapper
          defaultValue={data?.gradelevelid?.toString()}
        />
      </Suspense>
      <DateField
        label="วันเกิด"
        minLength={3}
        errorChild={<p>กรุณากรอกวันเกิด</p>}
        required
        name="birthdate"
        defaultValue={
          data?.birthdate ? data.birthdate.toString().split("T")[0] : undefined
        }
      />
    </AddStudentFormProvider>
  );
};

AddStudentLayout.GradeLevelWrapper = async function GradeLevelWrapper({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const res = await getAllGradeLevelAction();
  return (
    <SelectField
      label="ระดับชั้น"
      name="gradelevelid"
      required
      errorChild={<p>กรุณาเลือกระดับชั้น</p>}
      items={res.map((r) => ({
        label: r.levelname,
        value: r.gradelevelid.toString(),
      }))}
      defaultValue={defaultValue}
    />
  );
};

AddStudentLayout.PrefixWrapper = async function PrefixWrapper({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const res = await getAllPrefixAction();
  return (
    <SelectField
      label="คำนำหน้าชื่อ"
      name="prefixid"
      errorChild={<p>กรุณาเลือกคำนำหน้าชื่อ</p>}
      required
      items={res.map((r) => ({
        label: r.prefixname,
        value: r.prefixid.toString(),
      }))}
      defaultValue={defaultValue}
    />
  );
};

AddStudentLayout.GenderWrapper = async function GenderWrapper({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const res = await getAllGenderAction();
  return (
    <SelectField
      label="เพศ"
      name="genderid"
      errorChild={<p>กรุณาเลือกเพศ</p>}
      required
      items={res.map((r) => ({
        label: r.gendername,
        value: r.genderid.toString(),
      }))}
      defaultValue={defaultValue}
    />
  );
};
