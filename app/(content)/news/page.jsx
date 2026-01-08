import Link from 'next/link';
import { DUMMY_NEWS } from '@/dummy-news';
import NewsList from '@/components/news-list';


const NewsPage = () => {
  return (
    <>
    <h1>NewsPage</h1>
    <NewsList news={DUMMY_NEWS} />

    </>
  )
}

export default NewsPage;