import Header from '@/components/Header'
import NewsPublication from '@/components/NewsPublication'
import { News } from '@/utils/interface'
import Head from 'next/head'
import {useEffect, useState} from "react"
import axios from 'axios'

export default function Home() {
  const [news, setNews] = useState<News[]>([])

  const getNews = async() => {
    await axios.get('/api/news/list')
    .then((res) => {
      console.log(res)
      setNews(res.data as News[])
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    const loadData = async() => {
      await getNews()
    }
    loadData() 
  }, [])

  return (
    <div>
      <Head>
        <title>Home page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <Header />
        <div className="mt-8">
          {news.map((news, index) => (
            <NewsPublication news={news} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
