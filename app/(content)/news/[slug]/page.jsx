
import { getNewsItem } from '@/lib/news';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const DetailedNewsPage = async ({ params }) => {
  const { "slug": newsId } = params;
  
  const newsItem = await getNewsItem(newsId)
  if (!newsItem) {
    notFound();
  }

  return (
    <article className='news-article'>
      <header>
      <Link href={`/news/${newsItem.slug}/image`}>
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
      </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date.toISOString()}>
          {newsItem.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  )
}

export default DetailedNewsPage