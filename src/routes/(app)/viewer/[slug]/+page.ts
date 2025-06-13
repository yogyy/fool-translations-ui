import type { Chapter } from '$lib/server/db/schema/novel.schema.js';
import { error } from '@sveltejs/kit';

export async function load({ data, fetch }) {
  const res = await fetch(data.chapter.content); // this should be url of .md file from cloud storage
  if (!res.ok) throw error(404, 'Chapter not found');

  const mockChapters = await fetch('/MOCK_DATA_chapters.json');
  const chapters: Chapter[] = await mockChapters.json();
  const content: string = await res.text();
  return { ...data, content, chapters };
}
