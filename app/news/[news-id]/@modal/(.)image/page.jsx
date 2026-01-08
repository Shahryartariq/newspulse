import { notFound } from 'next/navigation'; 
import { DUMMY_NEWS } from '@/dummy-news'; 

const InterceptedNewsImagePage = ({ params }) => { 
  const { "news-id": newsId } = params; 
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsId); 

  if (!newsItem) { 
    notFound(); 
  } 

  return ( 
    <> 
      <div className='modal-backdrop'/>
      <dialog className='modal' open> 
        <div className='fullscreen-image'> 
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} /> 
        </div> 
      </dialog>
    </> 
  ) 
} 

export default InterceptedNewsImagePage;