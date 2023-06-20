import { useRouter } from "next/router";
import React, { useMemo } from "react";

interface IPagination {
  totalCount: number;
  activePage: number;
  pageSize: number;
}

const Pagination = (props: IPagination) => {
  const router = useRouter();
  const { totalCount, activePage, pageSize } = props;

  const changePage = (page: number) => {
    router.query.page = `${page}`;
    router.push(router);
  };

  const sumPages = useMemo(() => {
    return (
      Math.round(totalCount / pageSize) + (totalCount % pageSize === 0 ? 0 : 1)
    );
  }, [totalCount, pageSize]);

  // const generateButton = () => {
  //   const buttons = [];
  //   for (let i = 0; i < sumPages; i++) {
  //     buttons.push(
  //       <button
  //         key={i}
  //         onClick={() => changePage(i + 1)}
  //         className={`${
  //           Number(i + 1) === activePage
  //             ? "btn-primary--contained"
  //             : "btn-primary--outlined"
  //         }`}
  //       >
  //         {i + 1}
  //       </button>
  //     );
  //   }
  //   return <div className="flex gap-2 max-w-[500px]">{buttons}</div>;
  // };

  const arrowButton = (type: string) => {
    return (
      <button
        onClick={() => type === 'previous' ? changePage(Math.max((activePage - 1), 1)) : changePage(Math.min((activePage + 1), sumPages))}
        className={`btn-primary--contained ${((type === 'previous' && activePage === 1) || (type === 'next' && activePage === sumPages)) ? 'hidden' : ''}`}
      >
        {type === 'previous' ? `◀` : '▶'}
      </button>
    )
  }
  const currentPage = () => {
    return (
      <button
        className={`btn-primary--outlined`}
      >
        {activePage}
      </button>
    )
  }
  return (
    <div className={`${sumPages === 1 ? 'hidden' : 'flex gap-2 justify-end '}`}>
      {arrowButton('previous')}
      {currentPage()}
      {arrowButton('next')}
    </div>
  );
};

export default Pagination;
