import Link from 'next/link';
import React from 'react';

type SelectorProps = {
  children?: React.ReactNode;
  type: string;
};

export default function SearchSelector(props: SelectorProps) 
{
  return (
    <Link
      href={`search${document.location.search.split('&type')[0]}&type=${props.type}`}
      className='cursor-pointer text-blue-500 font-medium text-sm hover:underline'
    >
      {props.children}
    </Link>
  );
}
