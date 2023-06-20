import React from 'react';

interface IDropdownItem {
  name: string;
  value: string | number;
  changeSelection: (value: string | number) => void;
}

const DropdownItem = ({ name, value, changeSelection }: IDropdownItem) => {
  const onchange = (value: string | number) => {
    changeSelection(value)
  }
  return (
    <button onClick={() => onchange(value)} className='w-full bg-white z-20 block py-2 px-4 hover:bg-gray-100 text-left rounded-none'>
      {name}
    </button>
  )
}

export default DropdownItem