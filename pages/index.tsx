import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utilities.module.css';
import styles from '../styles/Home.module.css'
import { getSortedPostsData, Post } from '../lib/posts'

export const getStaticProps = async () => ({props: {posts: getSortedPostsData()}});

const Home: NextPage<{posts: Post[]}> = ({posts}) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello! I am a passionate dev that loves taking a concept and turning it into reality!</p>
        <p>
          (This is a sample website - you&apos;ll be building a site like this or <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
      <hr />
      {posts.map(post => (
        <section key={post.id}>
          <h3 style={{marginBottom: 0}}>{post.data.title}</h3>
          <small>{post.data.date}</small>
          <p>{post.excerpt}</p>
          <Link href={`posts/${post.id}`}>
            <button>Read more</button>
          </Link>
          <hr />
        </section>
      ))}
    </Layout> 
  )
}

export default Home
