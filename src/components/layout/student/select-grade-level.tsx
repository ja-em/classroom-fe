"use client";
import { useQueryString } from "@/hooks/query-string";
import { GradeLevelObject } from "@/types/object";

export const SelectGradeLevel = ({ items }: { items: GradeLevelObject[] }) => {
  const { pushQuery } = useQueryString();
  return (
    <select
      defaultValue={"init"}
      className="select max-w-32"
      onChange={(e) => {
        const value = e.target.value;

        pushQuery({
          gradlevelId: value !== "all" ? value : "",
        });
      }}
    >
      <option disabled={true} value={"init"}>
        เลือกระดับชั้น
      </option>
      <option value={"all"}>ทั้งหมด</option>
      {items.map((item) => (
        <option key={item.gradelevelid} value={item.gradelevelid}>
          {item.levelname}
        </option>
      ))}
    </select>
  );
};
