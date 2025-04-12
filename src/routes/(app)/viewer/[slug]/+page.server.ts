import { BE_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

interface ReturnType {
  success: boolean;
  data: {
    chapter: {
      id: string;
      chapterNum: number;
      title: string;
      createdAt: string;
      content: string;
      novelId: string;
    };
    novel: {
      id: string;
      title: string;
      cover: string;
      banner: string;
    };
    prev: string | null;
    next: string | null;
  };
}

export const load = async ({ fetch, params }) => {
  if (params.slug.length !== 16) {
    throw error(404, 'Chapter Not Found');
  }
  const res = await fetch(`${BE_URL}/chapters/ch_${params.slug}`);

  if (res.status === 404) {
    throw error(404, 'Chapter Not Found');
  }

  const chapter: ReturnType = await res.json();

  return chapter.data;
};
