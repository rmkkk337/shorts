import Link from 'next/link';
import React from 'react';

interface SidebarLinkProps {
  pathname: string;
  url: string;
}

export default function SidebarLink({ pathname, children, url }: React.PropsWithChildren<SidebarLinkProps>) 
{
  return (
    <Link
      href={url}
      className={`${
        pathname === url ? 'bg-zinc-200/30' : 'text-zinc-400 '
      } hover:bg-zinc-200/30 rounded-md py-1.5 px-2 text-sm cursor-pointer duration-300`}
    >
      {children}
    </Link>
  );
}
