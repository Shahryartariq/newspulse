import { notFound } from 'next/navigation';
import { getNewsItem } from '@/lib/news';

const NewsImagePage = async ({params}) => {
  const { "slug": newsId } = params;
  const newsItem = await getNewsItem(newsId);

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