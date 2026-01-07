import NewsList from '@/components/news-list';
import { getAvailableNewsYears, getNewsForYear } from '@/lib/news';
import Link from 'next/link';
import React from 'react'

const ArchiveFilterPage = ({params}) => {
  const filter = params.filter;
  // const news = getNewsForYear(filter);
  const links = getAvailableNewsYears();

  return (
     <header id="archive-header">
      <nav>
        <ul>
          {links.map((year) => (
            <li key={year}>
              <Link href={`/archive/${year}`}>{year}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>

  )
}

export default ArchiveFilterPage