import Link from "next/link";
import clsx from "clsx";
import { TableSize } from "./table-size";
import { IPaginationResponse } from "@/types/interface";

function getPagination(current: number, total: number): (number | string)[] {
  const delta = 1;
  const range: (number | string)[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1); // always show first page

  if (left > 2) {
    range.push("...");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) {
    range.push("...");
  }

  if (total > 1) {
    range.push(total); // always show last page
  }

  return range;
}

export const TablePagination = ({
  pagination = {
    items: [],
    totalItem: 0,
    totalPage: 0,
    page: 1,
    limit: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
}: {
  pagination?: IPaginationResponse<any>;
}) => {
  return (
    <>
      <div className="join">
        <Link
          className={clsx("join-item btn ", {
            "btn-disabled": !pagination?.hasPreviousPage,
          })}
          href={`?page=${pagination.page - 1}`}
        >
          «
        </Link>
        {getPagination(pagination.page, pagination.totalPage).map((page, i) => {
          if (typeof page === "number") {
            return (
              <Link
                key={page + i}
                className={clsx("join-item btn btn-square ", {
                  "bg-black text-white": pagination.page === page,
                })}
                href={`?page=${page}`}
              >
                {page}
              </Link>
            );
          } else {
            return (
              <button key={page + i} className="join-item btn btn-disabled">
                {page}
              </button>
            );
          }
        })}
        <Link
          className={clsx("join-item btn ", {
            "btn-disabled": !pagination.hasNextPage,
          })}
          href={`?page=${pagination.page + 1}`}
        >
          »
        </Link>
      </div>
      <TableSize />
    </>
  );
};
