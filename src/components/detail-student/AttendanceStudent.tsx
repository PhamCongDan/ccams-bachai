import React, { useEffect, useState } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';

type AttendanceData = {
  id: string;
  attendanceDate: string;
  teacher: string;
  type: number;
};
interface IAttendanceStudent {
  attendanceData: AttendanceData[];
}

const AttendanceStudent = ({ attendanceData }: IAttendanceStudent) => {
  const [attendClass, setAttendClass] = useState([]);
  const [attendMass, setAttendMass] = useState([]);
  const initialValue = [...attendClass, ...attendMass] as DateObject[];
  const [values, setValues] = useState<DateObject[]>(initialValue);

  function isAttendClass(strDate: any) {
    return attendClass.some(
      ([start, end]) => strDate >= start && strDate <= end
    );
  }

  function isAttendMass(strDate: any) {
    return attendMass.some(
      ([start, end]) => strDate >= start && strDate <= end
    );
  }

  const formatData = (attendanceData: any) => {
    return attendanceData.map((item: AttendanceData) => {
      return [item.attendanceDate, item.attendanceDate];
    });
  };

  useEffect(() => {
    if (attendanceData.length) {
      const formatAttendanceDate = formatData(attendanceData);
      // for attend class
      const attendData = attendanceData.filter(
        (item: AttendanceData) => item.type === 2
      );
      setAttendClass(formatData(attendData));
      // for mass
      const mass = attendanceData.filter(
        (item: AttendanceData) => item.type === 1
      );
      setAttendMass(formatData(mass));
      setValues(formatAttendanceDate);
    }
  }, [attendanceData]);

  return (
    <section className='rounded-lg bg-white p-4 text-secondary'>
      <h2 className='text-3xl font-bold mb-4'>Điểm danh</h2>
      <Calendar
        multiple
        range
        readOnly
        maxDate={new Date()}
        value={values}
        numberOfMonths={3}
        highlightToday={false}
        onChange={(ranges: DateObject[]) => {
          setValues(ranges);
        }}
        mapDays={({ date }) => {
          let className = '';
          const strDate = date.format();

          if (isAttendClass(strDate)) className = 'attend-class';
          if (isAttendMass(strDate)) className += ' attend-mass';
          if (className) return { className: className.trim() };
        }}
      />
      <div className='flex gap-8 mt-4'>
        <div className='flex gap-2 items-center'>
          <div className='w-[24px] h-[24px] bg-primary rounded-full' />
          <span>Đi lễ</span>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='w-[24px] h-[24px] bg-[#fe9627] rounded-full' />
          <span>Học giáo lý</span>
        </div>
      </div>
    </section>
  );
};

export default AttendanceStudent;
