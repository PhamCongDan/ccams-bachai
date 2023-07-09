import Head from 'next/head'
import React, { useEffect, useMemo } from 'react'
import { AttendanceStudent, BasicInformation, ExamResult, OldSummaryScholastic } from '@/components/detail-student'
import { useRouter } from 'next/router'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllStudent, getAllStudentIds } from 'pages/api/student'
import { getDetailStudent } from 'pages/api/student/[id]/index';

interface IStudent {
  id: string;
  img: string;
  bod: string;
  saintName: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  phone: string[];
  teacher: string[];
  className: string;
  catholicity: string;
}

const StudentDetailPage = ({ student }: { student: IStudent }) => {  
  // const getDetailStudent = async (id: string | string[]) => {    
  //   const res = await axios.get(`/api/student/${id}`)
  //   console.log(res);
  // }

  const fullName = useMemo(() => {
    return `${student.lastName} ${student.firstName}` || '';
  }, [student])

  // useEffect(() => {
  //   if (!id) return;
  //   getDetailStudent(id);
  // }, [id])
  return (
    <div >
      <Head>
        <title>{fullName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="ml-[300px] p-8 flex flex-col gap-8">
        <BasicInformation student={student} />
        <AttendanceStudent />
        <ExamResult />
        <OldSummaryScholastic />
      </div>
    </div>
  )
}

export default StudentDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getAllStudentIds();
  const studentId = response.map((item: { id: string }) => {
    return {
      params: { id: item.id }
    }
  })

  return {
    paths: studentId,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;  
  const res = await getDetailStudent(params?.id)
  // console.log(res);
  
  // const data = await response.json()
  // console.log(data);

  return {
    props: {
      student: res,
    },
  };
}