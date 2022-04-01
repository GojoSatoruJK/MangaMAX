import { BsFillBookmarkFill, BsPlay } from 'react-icons/bs';
import { MdHistory } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import Router from 'next/router';
import { memo } from 'react';
import getRecents from 'hooks/getRecents';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowUp } from 'react-icons/fi';
import { setScroll } from 'store/action';


const ToolNav = () => {
  const { reducer: { type } }: any = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const recents = getRecents().data.pages[0].items[0];
  const url = recents?.url.replace('recents', type);
  const slug = recents?.slug;

  return (
    <div className="bg-nav w-auto justify-center items-center gap-5 flex bg-opacity-80 backdrop-blur-xl px-5 py-2 rounded-full fixed bottom-5 left-2/4 transform -translate-x-2/4">
      <MdHistory title='History' onClick={() => { dispatch(setScroll(0)); Router.push('/recents'); }} size={44} className='hover:text-white duration-300' />
      <span title='Bookmarks' onClick={() => { dispatch(setScroll(0)); Router.push('/bookmarks'); }} className='hover:border-white border-[3px] p-[6px] rounded-full hover:text-white duration-300'><BsFillBookmarkFill /></span>
      <span title='Search' onClick={() => Router.push('/search')} className='hover:border-white border-[3px] p-[4.2px] rounded-full hover:text-white duration-300'><BiSearch size={20} /></span>
      <BsPlay title='Play' onClick={() => slug && Router.push(url, `/comic/${slug}`)} className='hover:text-white duration-300 -ml-1' size={45} />
      <FiArrowUp title='Top' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} size={35} className='-ml-3 hover:text-white duration-300' />
    </div>
  );
};

export default memo(ToolNav);