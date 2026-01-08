import { notFound } from 'next/navigation';
import { DUMMY_NEWS } from '@/dummy-news';

const NewsImagePage = ({params}) => {
  const { "news-id": newsId } = params;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsId);

  if(!newsItem){
    notFound();
  }


  return (
    <>
    <h2>Normal Route</h2>
    <div className='fullscreen-image'>
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
    </>
  )
}

export default NewsImagePage