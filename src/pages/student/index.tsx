import React, { useState } from "react";
import Head from "next/head";
import { Table, Column } from "react-virtualized/dist/commonjs/Table";
import FilterStudent from "@/components/filter-student";
import useSWR from "swr";
import axios from "axios";
import { getAllStudent } from "pages/api/students";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Pagination from "@/components/common/pagination";

const HomePage = ({ studentData }: any) => {
  const { page, totalCount, pageSize, data: students } = studentData;

  return (
    <div>
      <Head>
        <title>Thông tin thiếu nhi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ml-[300px] p-8">
        {totalCount} {page} {pageSize}
        <FilterStudent />
        {/* table */}
        {students?.length && (
          <>
            <Table
              // style={{ overflowX: 'auto' }}
              className="overflow-auto relative text-md text-left text-gray-500 z-0"
              width={950}
              height={800}
              headerHeight={44}
              rowHeight={50}
              rowCount={students.length}
              rowGetter={({ index }) => students[index]}
              // noRowsRenderer={() => emptyText}
              headerClassName="text-red-500"
              headerStyle={{ margin: 0 }}
              rowStyle={{ margin: 0 }}
              rowClassName="border-b flex items-center"
            >
              <Column
                label="STT"
                dataKey="id"
                cellRenderer={({ rowIndex }) => rowIndex + 1}
                width={50}
                className=""
              />
              <Column
                label="Tên Thánh"
                dataKey="saintName"
                width={100}
                maxWidth={100}
              />
              <Column label="Họ tên" dataKey="lastName" width={200} />
              <Column
                label="Tên"
                dataKey="firstName"
                width={100}
                maxWidth={100}
              />
              <Column
                label="Chi đoàn"
                dataKey="className"
                width={100}
                maxWidth={100}
              />
              <Column label="GLV" dataKey="teacher" width={400} maxWidth={400} />
            </Table>
            <Pagination activePage={page} pageSize={pageSize} totalCount={totalCount} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   // const data = await response.json()
//   const paths = response.map((page: number) => {
//     return {
//       params: { page: `${page}` }
//     }
//   })

//   return {
//     paths: paths,
//     fallback: false
//   }
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await getAllStudent(10);

//   // const data = await response.json()
//   // console.log(data);

//   return {
//     props: {
//       students: res,
//     },
//   };
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: { page } } = context;
  const res = Number(page) ? await getAllStudent(Number(page)) : await getAllStudent(1);
  
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  // const repo = await res.json()
  return { props: { studentData: res } }
}
