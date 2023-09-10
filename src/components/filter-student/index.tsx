import React, { useState } from 'react';
import Dropdown from '@/components/common/dropdown';
import DropdownItem from '@/components/common/dropdown/DropdownItem';
import axios from 'axios';

const UNIT_MENU = [
  {
    label: 'Ngành Chiên',
    key: 'chien',
    // value: 'KT',
  },
  {
    key: 'au',
    label: 'Ngành Ấu',
    // value: 'XT'
  },
  {
    key: 'thieu',
    label: 'Ngành Thiếu',
    // value: 'TS'
  },
  {
    key: 'nghia',
    label: 'Ngành Nghĩa',
    // value: 'SĐ'
  },
  {
    key: 'hiep',
    label: 'Ngành Hiệp',
    // value: 'VĐ'
  },
];

const FilterStudent = () => {
  const [unit, setUnit] = useState('');

  const changeUnit = async (unitKey: string) => {
    // const fetcher = async (url: string) =>
    // const { data, error, isLoading } = useSWR(
    //   '/api/units',
    //   fetcher
    // )

    setUnit(unitKey);
    const data = await axios
      .get('/api/grade', { params: { unitId: unitKey } })
      .then((res) => res.data);
    console.log(data);
  };
  return (
    <div>
      <Dropdown name='Ngành' value={unit}>
        {UNIT_MENU.map((item, index) => {
          return (
            <DropdownItem
              key={item.key}
              value={item.key}
              name={item.label}
              changeSelection={() => changeUnit(item.key)}
            />
          );
        })}
      </Dropdown>
    </div>
  );
};

export default FilterStudent;
