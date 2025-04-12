'use client';

import Link from 'next/link';

export default function MenuLink({ item, pathname }) {
  return (
    <Link href={item.path} className="flex items-center px-4 py-2 rounded-lg mb-2 hover:bg-[#FDFAF6] transition-colors ${pathname === item.path && 'bg-[#CAE0BC]'}">
      {item.icon}
      <span className="ml-2">{item.title}</span>
    </Link>
  );
}