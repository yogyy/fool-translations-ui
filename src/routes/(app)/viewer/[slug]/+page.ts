import { error } from '@sveltejs/kit';

export async function load({ data, fetch }) {
  const res = await fetch(data.chapter.content); // this should be url of .md file from cloud storage
  if (!res.ok) throw error(404, 'Chapter not found');

  const content: string = await res.text();
  return { ...data, content };
}
