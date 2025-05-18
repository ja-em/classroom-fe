'use client';
import { useQueryString } from '@/hooks/query-string';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const SearchInput = () => {
  const [keyword, setKeyword] = useState('');
  const { pushQuery } = useQueryString();
  const onSearch = () => {
    pushQuery({ keyword });
  };
  return (
    <div className="join">
      <div>
        <label className="input join-item">
          <FaSearch />
          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                onSearch();
              }
            }}
          />
        </label>
      </div>
      <button className="btn btn-neutral join-item" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};
