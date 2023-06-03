import Header from '@/components/Header'
import NewsPublication from '@/components/NewsPublication'
import { News } from '@/utils/interface'
import Head from 'next/head'

const newsData: News[] = [
  {
    title: 'Breaking News',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: 'May 30, 2025',
  },
  {
    title: 'Latest Updates',
    description:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    date: 'May 29, 2023',
  },
]

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <Header/>
        <div className="mt-8">
          {newsData.map((news, index) => (
            <NewsPublication news={news} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
