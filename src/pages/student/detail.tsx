import { AttendanceStudent, BasicInformation, ExamResult, OldSummaryScholastic } from '@/components/detail-student';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getDetailStudent } from 'pages/api/student/[id]';
import React, { useMemo } from 'react'

interface IStudent {
  basicInformation: {
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
  },
  attendance: any[],
  historyScholastic: any[],
}

const StudentDetailPage = ({ student }: { student: IStudent }) => {  
  const fullName = useMemo(() => {
    return `${student.basicInformation.lastName} ${student.basicInformation.firstName}` || '';
  }, [student])

  return (
    <div >
      <Head>
        <title>{fullName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-8 flex flex-col gap-8">
        <BasicInformation student={student.basicInformation} />
        <AttendanceStudent attendanceData={student.attendance} />
        <ExamResult />
        <OldSummaryScholastic historyScholastic={student.historyScholastic} />
      </div>
    </div>
  )
}

export default StudentDetailPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: { id } } = context;
  const res = id && await getDetailStudent(id);
  if (!id || !res) return { notFound: true }
  
  return { props: { student: res } }
}
