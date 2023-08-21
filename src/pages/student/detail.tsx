import { AttendanceStudent, BasicInformation, ExamResult, OldSummaryScholastic } from '@/components/detail-student';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getDetailStudent } from 'pages/api/student/[id]';
import React, { useMemo } from 'react'

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: { id } } = context;
  const res = id ? await getDetailStudent(id) : null;
  return { props: { student: res } }
}
