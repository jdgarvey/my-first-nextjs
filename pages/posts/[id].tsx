import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { Date } from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostById, Post } from "../../lib/posts";

import utilStyles from "../../styles/utilities.module.css";

interface PostProps {
  post: Post;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async ({ params }) => {
  return { props: { post: await getPostById(params?.id) || {} as Post } }
}

const Post: NextPage<PostProps> = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>Posts | {post.data.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.data.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date={post.data.date}></Date>
        </div>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </article>
    </Layout>
  )
}

export default Post;