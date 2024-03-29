import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

interface IStudent {
  id: string;
  bod: string;
  img: string;
  saintName: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  phone: string[];
  teacher: string[];
  catholicity: string;
  className: string;
}

const BasicInformation = ({ student }: { student: IStudent }) => {
  const {
    id,
    bod,
    saintName,
    firstName,
    lastName,
    fatherName,
    motherName,
    phone = [],
    teacher,
    catholicity,
    className,
    img,
  } = student;

  const [formatBod, setFormatBod] = useState('');

  useEffect(() => {
    if (bod) {
      setFormatBod(new Date(bod).toLocaleDateString('fr-FR'));
    }
  }, [bod]);

  return (
    <section className='rounded-lg bg-white p-4 text-secondary'>
      <h2 className='text-3xl font-bold'>Thông tin cá nhân</h2>
      <div className='float-right w-[200px]'>
        {img ? <Image width={200} height={300} alt={id} src={img} /> : null}
      </div>
      <div className='text-lg mt-2'>
        <div className='flex flex-row'>
          <div className='basis-1/5'>ID</div>
          <div className='basis-2/3'>{id}</div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-1/5'>Tên Thánh</div>
          <div className='basis-2/3 font-bold'>{saintName}</div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-1/5'>Họ Tên</div>
          <div className='basis-2/5 font-bold uppercase'>
            {lastName} {firstName}
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-1/5'>Chi Đoàn</div>
          <div className='basis-2/5'>{className}</div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-1/5'>Ngày sinh</div>
          <div className='basis-2/5'>{formatBod}</div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-1/5'>Tên Cha</div>
          <div className='basis-2/5'>{fatherName}</div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-1/5'>Tên Mẹ</div>
          <div className='basis-2/5'>{motherName}</div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-1/5'>Giáo họ</div>
          <div className='basis-2/5'>{catholicity}</div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-1/5'>SĐT</div>
          <div className='basis-2/5'>
            {phone.filter((item: string) => (item ? item : null)).join(' - ')}
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='basis-1/5'>GLV</div>
          <div className='basis-2/5'>{teacher}</div>
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;
