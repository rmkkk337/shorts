import Link from 'next/link';
import React, { ReactElement } from 'react';

interface SidebarLinkProps {
  pathname: string;
  url: string;
  icon?: ReactElement;
}

export default function SidebarLink({ pathname, children, url, icon }: React.PropsWithChildren<SidebarLinkProps>) 
{
  return (
    <>
      <Link
        href={url}
        className={`${
          pathname === url ? 'bg-zinc-200/30' : 'text-zinc-400 '
        } select-none hover:bg-zinc-200/30 rounded-md py-1.5 px-2 text-sm cursor-pointer duration-300 flex items-center gap-2`}
      >
        {icon}
        <p>{children}</p>
      </Link>
    </>
  );
}
