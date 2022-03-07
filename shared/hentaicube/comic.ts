import { parse } from "node-html-parser";
import axios from "../axios"
import decodeHTMLEntity from "../decodeHTML";
import { store } from "../../store";

export const getComicInfo = async (comicSLug: string): Promise<any> => {
    const html = (await axios.get(`manga/${comicSLug}/`)).data;
    const state = store.getState().reducer;
    const dom = parse(html);
    let author = '';
    let genres = [];
    let status = '';
    let url = encodeURI(dom.querySelector('.tab-summary img')?.getAttribute('src')?.replace('-193x278', '')!);
    let desc = '';
    dom.querySelectorAll('.description-summary > .summary__content ul li').map((item) => {
        desc += '●  ' + item.innerText + '\n';
    })

    for (const test of dom.querySelectorAll('.post-content .post-content_item')) {
        switch (test.querySelector('.summary-heading > h5')?.innerText.trim()) {
            case 'Tác giả':
                author = test.querySelector('.author-content')?.innerText!;
                break;
            case 'Thể loại':
                for (const t of test.querySelectorAll('.genres-content > a')) {
                    const genre = t.innerText.trim();
                    // const id = t.getAttribute('href')
                    genres.push(genre);
                }
                break;
            case 'Tình trạng':
                status = test.querySelector('.summary-content')?.innerText.trim().toLowerCase().includes("đang") ? 'Ongoing' : 'Completed';
                break;
            default:
                break;
        }
    }

    const index = dom.querySelectorAll('.listing-chapters_wrap li').map((item, index) => index).reverse();

    return {
        title: decodeHTMLEntity(dom.querySelector('.post-title > h1')?.innerText.trim()!),
        cover: `/api/proxy?url=${encodeURI(url as string)}&source=${state.source}`,
        author: author !== '' ? author : 'Updating',
        status: status !== '' ? status : 'Updating',
        genres,
        desc,
        chapters: dom.querySelectorAll('.listing-chapters_wrap li').map((chapter, i) => ({
            name: chapter.querySelectorAll('a')[0]?.innerText.trim(),
            updateAt: chapter.querySelector('span')?.innerText.trim(),
            view: 'N/A',
            id: index[i].toString(),
            chap: chapter.querySelectorAll('a')[0].getAttribute('href')?.split('/').slice(5, -1)[0],
        }))
    }
}


