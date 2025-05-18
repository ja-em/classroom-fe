import React from "react";
import { TablePagination } from "./table-pagination";
import { IPaginationResponse } from "@/types/interface";

export const TableWrapper = ({
  children,
  pagination,
}: {
  children: React.ReactNode;
  pagination?: IPaginationResponse<any>;
}) => {
  let RightArea: React.ReactNode;
  const remainChlid: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === TableWrapper.RightArea) {
      RightArea = child;
    } else {
      remainChlid.push(child);
    }
  });
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex  ">
        <div className="flex-1">{RightArea}</div>
        <div className=" flex justify-end space-x-2">
          <TablePagination pagination={pagination} />
        </div>
      </div>
      <div className="overflow-x-auto rounded-md shadow-xl">
        <table className="table table-zebra">{remainChlid}</table>
      </div>
    </div>
  );
};

TableWrapper.RightArea = function RightArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
};
