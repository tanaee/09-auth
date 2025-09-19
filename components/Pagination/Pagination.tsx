"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
}
export default function Pagination({
  pageCount,
  onPageChange,
  forcePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName={css.pagination}
      activeClassName={css.active}
      forcePage={forcePage}
    />
  );
}
