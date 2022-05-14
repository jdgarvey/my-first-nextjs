import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remarkHtml from 'remark-html';
import { remark } from 'remark';

export interface Post {
  id: string;
  content: string;
  excerpt: string;
  data: {
    title: string;
    date: string;
  }
}

const postsDirectory = path.join(process.cwd(), 'posts');
export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const {orig, ...rest} = matter(fileContents, {excerpt: true});

    return { id, ...rest } as unknown as Post
  });

  return allPostsData.sort(({data: {date: a}}, {data: {date: b}}) => 
    a < b ? 1 : a > b ? -1 : 0);
}

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export const getPostById = async (id?: string) => {
  if (!id) return;
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {orig, ...rest} = matter(fileContents, {excerpt: true});
  const contentWithoutExcerpt = rest.content.replace(`${rest.excerpt}---`, '');
  const content = await (await remark().use(remarkHtml).process(contentWithoutExcerpt)).toString();
  return {
    id,
    ...rest,
    content,
  } as unknown as Post
}