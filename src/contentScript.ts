import { getVrfCode } from './vrf';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page

type AnimeInfo = {
  id: string;
  romajiTitle: string;
  englishTitle: string;
};

type Ani9SearchResult = {
  html: string;
};

function prependHtml(el: Element, str: string) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.prepend(div.children[0]);
  }
}

const parser = new DOMParser()

async function getHref() {
  const anime = JSON.parse(
    document.getElementById('anime')?.innerText as string
  ) as AnimeInfo;

  const title =
    anime.englishTitle !== '' ? anime.englishTitle : anime.romajiTitle;

  const vrf = encodeURIComponent(getVrfCode(title));
  const searchUrl = `https://9anime.to/ajax/anime/search?vrf=${vrf}&keyword=${title}`;

  const searchRes = (await extFetch(searchUrl)) as Ani9SearchResult;
  const searchContent = searchRes.html.replace(/\\/g, '');

  const searchDoc = parser.parseFromString(searchContent, 'text/html')

  const links = [...searchDoc.getElementsByTagName('a')]
  console.log(links)

  const link = links.find(link => {
    const text = link.innerText
    if (text.includes('(Dub)')) {
        return false
    }
    
    return true
  })

  if (!link) {
    return
  }
  
  return `https://9anime.id${link.getAttribute('href')}`;
}

async function main() {
  const pageUrl = document.URL;

  console.log(pageUrl);

  if (pageUrl.match(/livechart.me\/anime\/[0-9]*\/streams$/)) {
    const ani9Href = await getHref();

    const el = document.getElementsByClassName('grouped-list');

    if (!el.length) {
      return;
    }

    prependHtml(
      el[0],
      `
      <li class="grouped-list-item">
        <div class="stream grid-x align-middle">
            <div class="cell shrink mr1">
            <div class="streaming-service-logo-wrap">
                <noscript
                ><img
                    alt="Crunchyroll logo"
                    width="40"
                    height="40"
                    src="https://play-lh.googleusercontent.com/9Bwy_5wQn9JNyNxwVzL3YvoABc656TIX9rYHQdFwnLy9ZPCmpkyFrzJogeFy3dd5l-d4" /></noscript
                ><img
                alt="9anime logo"
                width="40"
                height="40"
                src="https://play-lh.googleusercontent.com/9Bwy_5wQn9JNyNxwVzL3YvoABc656TIX9rYHQdFwnLy9ZPCmpkyFrzJogeFy3dd5l-d4"
                class="lazy-img"
                data-controller="lazy-image"
                data-lazy-loaded="true"
                />
            </div>
            </div>
            <div class="cell auto">
            <a
                class="stream-link"
                href="${ani9Href}"
                target="_blank"
                rel="nofollow noopener"
                >9anime</a
            >
            <div class="stream-info-bar"></div>
            </div>
        </div>
        </li>
      `
    );
  } else if (pageUrl.match(/^https:\/\/www.livechart.me\/anime\/[0-9]*$/)) {
    const ani9Href = await getHref();

    const el = document.getElementById('streams-list');

    if (!el) {
      return;
    }

    prependHtml(
      el,
      `
        <li title="9anime">
        <a
            target="_blank"
            rel="nofollow noopener"
            href="${ani9Href}"
            ><img
            src="https://play-lh.googleusercontent.com/9Bwy_5wQn9JNyNxwVzL3YvoABc656TIX9rYHQdFwnLy9ZPCmpkyFrzJogeFy3dd5l-d4"
            alt="9anime logo"
            width="40"
            height="40"
        /></a>
        </li>
        `
    );
  }
}

main();

function extFetch(
  input: RequestInfo,
  init?: RequestInit | undefined
): Promise<any> {
  return new Promise((resolve) =>
    chrome.runtime.sendMessage(
      {
        type: 'FETCH',
        input,
        init,
      },
      resolve
    )
  );
}
