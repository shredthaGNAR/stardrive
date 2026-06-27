import { visit } from 'unist-util-visit';
import type { RehypePlugin } from '@astrojs/markdown-remark';
import type { Root } from 'hast';

// scheme: youtube.com/watch?v=VIDEO_ID&t=TIME&list=PLAYLIST_ID&title=TITLE with t and list being optional
const ID_PATTERN = /^[\w-]+$/;

type YoutubeParts = {
  videoId: string;
  time: string;
  list: string;
  title: string | null;
};

const parseYoutube = (textContent: string): YoutubeParts | null => {
  const normalized = /^https?:\/\//.test(textContent) ? textContent : `https://${textContent}`;

  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '');
  let videoId: string | null = null;

  if (host === 'youtu.be') {
    videoId = url.pathname.slice(1);
  } else if (host === 'youtube.com' && url.pathname === '/watch') {
    videoId = url.searchParams.get('v');
  }

  if (!videoId || !ID_PATTERN.test(videoId)) return null;

  const t = url.searchParams.get('t');
  const listId = url.searchParams.get('list');
  const title = url.searchParams.get('title');

  return {
    videoId,
    time: t && ID_PATTERN.test(t) ? '&amp;start=' + t.replace(/s$/, '') : '',
    list: listId && ID_PATTERN.test(listId) ? '&amp;listType=playlist&amp;list=' + listId : '',
    title: title || null,
  };
};

export const rehypeYoutubePlugin: RehypePlugin = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName != 'p' || node.children.length !== 1 || node.children[0].type != 'text') {
        return;
      }

      const textContent = node.children[0].value;
      const parsed = parseYoutube(textContent);

      if (!parsed) return;

      const { videoId, time, list, title } = parsed;

      // Replace YouTube component with iframe
      node.tagName = 'div';
      node.properties = { class: 'video-container' };
      node.children = [
        {
          type: 'element',
          tagName: 'iframe',
          properties: {
            class: 'video-embed',
            width: '560',
            height: '315',
            src: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0${time}${list}`,
            title: title ?? 'YouTube video player',
            frameBorder: '0',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            allowFullscreen: true,
          },
          children: [],
        },
      ];
    });
  };
};
