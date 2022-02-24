import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

const Navigation: NextPage<any> = ({ chapters, chapterId, comicSlug }) => {
    const selectedIndex = chapters.indexOf(chapters.find((chap: { id: any; }) => chap.id === chapterId));
    const router = useRouter();
    const prevChapter = useCallback(() => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapters[selectedIndex + 1].chap}`,
            query: { id: chapters[selectedIndex + 1].id }
        })
    }, [comicSlug, chapters, selectedIndex, router])
    const nextChapter = useCallback(() => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapters[selectedIndex - 1].chap}`,
            query: { id: chapters[selectedIndex - 1].id }
        })
    }, [comicSlug, chapters, selectedIndex, router])
    const selectChapter = (chapterSlug: string) => {
        router.push({
            pathname: `/comic/${comicSlug}/${chapterSlug}`,
            query: {
                id: chapters.find((chap: { chap: any; }) => chap.chap === chapterSlug)?.id,
            },
        });
    }
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.keyCode === 37) {
                prevChapter();
            } else if (e.keyCode === 39) {
                nextChapter();
            }
        };
        window.addEventListener("keyup", handler);

        return () => window.removeEventListener("keyup", handler);
    }, [prevChapter, nextChapter]);


    return (
        <div className='flex items-center gap-1 w-full justify-center'>
            <button disabled={selectedIndex === chapters.length - 1} onClick={prevChapter} className='p-2 bg-link hover:bg-link-hover w-10 h-10 text-white disabled:opacity-50'>
                <i className="fas fa-chevron-left"></i>
            </button>
            <select
                onChange={(e) => selectChapter(e.target.value)}
                value={chapters[selectedIndex].chap}
                id="selectChapter"
                className='text-black p-2 h-10 my-1 min-w-[200px] max-w-[350px] outline-none'
            >
                {
                    chapters.map((item: any, index: any) => (
                        <option key={index} className=' text-black' value={item.chap}>{item.name}</option>
                    ))
                }
            </select>
            <button disabled={selectedIndex < 1} onClick={nextChapter} className='p-2 bg-link hover:bg-link-hover w-10 h-10 text-white disabled:opacity-50'>
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Navigation;