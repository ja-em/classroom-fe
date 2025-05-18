"use client";

import { isEmpty, isNil } from "lodash";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback } from "react";

export const toQueryString = (
  qs: Record<string, string>,
  oldParam?: ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(oldParam?.toString());
  Object.keys(qs).forEach((key) => {
    const value = qs[key];
    if (typeof value === "number") {
      params.set(key, value);
    } else if (!isNil(value) && !isEmpty(value)) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });
  return params.toString();
};

export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushQuery = useCallback(
    (qs: Parameters<typeof toQueryString>[0]) => {
      const queryString = toQueryString(qs, searchParams);
      router.push(pathname + "?" + queryString);
    },
    [searchParams]
  );
  return { pushQuery };
};
