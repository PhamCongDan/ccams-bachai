import React from 'react'

const AttendanceStudent = ({ attendanceData }: any) => {  
  return (
    <section className="rounded-lg bg-white p-4 text-secondary">
      <h2 className="text-3xl font-bold">Điểm danh</h2>
      <span>(30 ngày gần nhất)</span>
      <ul>
        {attendanceData.map((item: any) => {
          return (
            <li key={item.id} className='flex gap-2'>
              {item.attendanceDate} : {item.teacher}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default AttendanceStudent