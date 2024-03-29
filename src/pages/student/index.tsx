import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Table, Column } from "react-virtualized/dist/commonjs/Table";
import FilterStudent from "@/components/filter-student";
import useSWR from "swr";
import axios from "axios";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Pagination from "@/components/common/pagination";

const HomePage = () => {
  // const { page, totalCount, pageSize, data: students } = studentData;
  const router = useRouter();

  const [students, setStudents] = useState([]);

  const moveToDetail = (id: string) => {
    router.pathname = '/student/detail';
    router.query.id = id;
    router.push(router)
  }

  const getLstStudent = async () => {
    const res = await axios.get('/api/student')
    setStudents(res?.data?.data ?? {})
  }

  useEffect(() => {
    getLstStudent()
  }, [])

  return (
    <div>
      <Head>
        <title>Thông tin thiếu nhi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-8">
        {/* {totalCount} {page} {pageSize} */}
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
              rowClassName="border-b flex items-center hover:bg-secondary hover:bg-opacity-10 transition ease-out cursor-pointer"
              onRowClick={({ rowData }) => moveToDetail(rowData.id)}
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
            {/* <Pagination activePage={page} pageSize={pageSize} totalCount={totalCount} /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
