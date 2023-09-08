import React from 'react'

const OldSummaryScholastic = ({ historyScholastic }: any) => {  
  return (
    <section className="rounded-lg bg-white p-4 text-secondary">
      <h2 className="text-3xl font-bold">Quá trình học tập</h2>
      <table>
        <thead>
          <tr className='flex gap-4'>
            <th className='w-36'>Năm học</th>
            <th className='w-20'>Chi đoàn</th>
            <th className='w-80'>GLV</th>
          </tr>
        </thead>
        <tbody>
          {historyScholastic.map((item: { scholastic: string, className: string, teacher: string }, index: number) => {
            return (
              <tr key={index} className='flex gap-2'>
                <th className='w-36'>{item.scholastic}</th>
                <th className='w-20'>{item.className}</th>
                <th className='w-80 text-left'>{item.teacher}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default OldSummaryScholastic