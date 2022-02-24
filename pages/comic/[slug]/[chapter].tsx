import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { getChapter } from '../../../shared/api/chapter';
import Image from 'next/image';
import Navigation from '../../../components/Navigation';
import Link from 'next/link';

const Chapter: NextPage<any> = ({ chapter, chapterId, comicSlug }) => {

    return (
        <div className='flex  flex-col items-center mx-auto'>
            <p className="text-2xl">
                <Link href={`/comic/${comicSlug}`}>
                    <a className="text-link">{chapter.title}</a>
                </Link>
                <span className='w-full'> {chapter.chapterCurrent} <small>{chapter.updateAt}</small></span>
                
            </p>
            <Navigation chapters={chapter.chapters} chapterId={chapterId} comicSlug={comicSlug} />
            {
                chapter.images.map((image: string | undefined, index: any) => <img key={index} src={image} />)
            }
            <Navigation chapters={chapter.chapters} chapterId={chapterId} comicSlug={comicSlug} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
    try {
        const chapter = await getChapter(params?.slug, params?.chapter, query.id)
        return {
            props: {
                chapter,
                chapterId: query.id,
                comicSlug: params?.slug
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true
        }
    }
}

export default Chapter;