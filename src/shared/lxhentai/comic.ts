import { parse } from "node-html-parser";
import axios from "@/utils/axios"
import decodeHTMLEntity from "@/utils/decodeHTML";

export const getComicInfo = async (comicSLug: string, source: string): Promise<any> => {
    const html = (await axios.get(`truyen/${comicSLug}`)).data;
    const dom = parse(html);
    let style = dom.querySelector('div.cover')?.getAttribute('style');
    const bg = style?.split(";")[0];
    const cover = 'https:' + bg?.replace('url(', '').replace(')', '').replace(/\"/gi, "").replace(/['"]+/g, '').split(":")[2].trim();
    const index = dom.querySelectorAll('.overflow-y-auto.overflow-x-hidden a li').map((item, index) => index).reverse();

    return {
        title: decodeHTMLEntity(dom.querySelector('div.truncate > span.font-semibold')?.innerText.trim()!),
        cover: `https://images.weserv.nl/?url=${encodeURIComponent(cover?.replace('lxhentai.com//', 'lxhentai.com/') as string)}`,
        author: dom.querySelector('.grow .mt-2 span a[href*="tac-gia"]')?.innerText ?? null,
        status: dom.querySelectorAll('.grow .mt-2')[2].querySelector(".text-blue-500")?.innerText,
        genres: dom.querySelectorAll('.grow .mt-2 span:last-child a').map(genre => genre.innerText),
        desc: dom.querySelector('.border-gray-200.py-4.border-t > p:nth-child(3)')?.innerText ?? '',
        chapters: dom.querySelectorAll('.overflow-y-auto.overflow-x-hidden a').map((chapter, i) => ({
            name: chapter.querySelector('.text-ellipsis')?.innerText.trim(),
            updateAt: chapter.querySelector('.timeago')?.getAttribute('datetime')?.split(' ')[0],
            view: 'null',
            id: chapter.getAttribute('href')?.split('/').pop()!,
            chap: chapter.getAttribute('href')?.split('/').pop()!,
            nameIndex: index[i] + 1
        })),
        source,
        lastUpdate: dom.querySelector(".timeago")?.getAttribute('datetime')
    }
}



