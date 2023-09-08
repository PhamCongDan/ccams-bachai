import React, { ReactNode } from 'react';

interface IBaseIcon {
  height?: number | string;
  width?: number | string;
  viewBox?: string;
  iconColor?: string;
  children: ReactNode;
  className?: string;
}
const BaseIcon = (props: IBaseIcon) => {
  const {
    height = 24,
    width = 24,
    viewBox = '0 0 24 24',
    iconColor = 'currentColor',
    children,
  } = props;
  return (
    <svg
      height={height}
      width={width}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={viewBox}
      role='presentation'>
      <g fill={iconColor}>{children}</g>
    </svg>
  );
};

export default BaseIcon;
