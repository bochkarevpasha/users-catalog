import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  pageSizeOptions: number[];
  isLoading: boolean;
  hasResults: boolean;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLast: () => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  total,
  pageSize,
  pageSizeOptions,
  isLoading,
  hasResults,
  onFirst,
  onPrev,
  onNext,
  onLast,
  onPageSizeChange,
}) => {
  if (!hasResults) {
    return null;
  }

  return (
    <section className="pagination">
      <div className="pagination-info">
        <span>
          Страница {page + 1} из {totalPages}
        </span>
        <span className="pagination-total">
          Всего: {total} · На странице:
          <select
            className="page-size-select"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </span>
      </div>

      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-button pagination-button--icon"
          onClick={onFirst}
          disabled={page === 0 || isLoading}
          aria-label="Первая страница"
        >
          «
        </button>
        <button
          type="button"
          className="pagination-button pagination-button--icon"
          onClick={onPrev}
          disabled={page === 0 || isLoading}
        >
          ‹
        </button>
        <button
          type="button"
          className="pagination-button pagination-button--icon"
          onClick={onNext}
          disabled={page >= totalPages - 1 || isLoading}
        >
          ›
        </button>
        <button
          type="button"
          className="pagination-button pagination-button--icon"
          onClick={onLast}
          disabled={page >= totalPages - 1 || isLoading}
          aria-label="Последняя страница"
        >
          »
        </button>
      </div>
    </section>
  );
};

