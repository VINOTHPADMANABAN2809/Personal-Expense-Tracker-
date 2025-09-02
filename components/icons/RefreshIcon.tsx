import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const RefreshIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5m-4-1v-4h4m-4 4V4m0 0h4M4 4l1.5 1.5A9 9 0 0115 19.5M20 20l-1.5-1.5A9 9 0 009 4.5" />
  </svg>
);
