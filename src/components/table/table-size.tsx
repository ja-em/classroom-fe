'use client';
import { useQueryString } from '@/hooks/query-string';

export const TableSize = () => {
  const { pushQuery } = useQueryString();
  return (
    <select
      defaultValue={10}
      className="select max-w-32"
      onChange={(e) => {
        pushQuery({ page: '1', limit: e.target.value });
      }}
    >
      <option disabled={true}>Limit</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
    </select>
  );
};
