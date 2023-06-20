import React, { useEffect } from 'react'
import { useState } from 'react'
import { News, formatDate, showNews } from '@/utils/interface'
import Head from 'next/head'
import Header from '@/components/Header'
import { useRouter } from 'next/router'

const NewsPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [news, setNews] = useState<News>({
    title: '',
    description: '',
    timestamp: '',
    _id: '',
  })

  useEffect(() => {
    const loadData = async () => {
      const newsData: News = await showNews(id as string)
      setNews(newsData)
    }
    if (typeof window !== 'undefined' && router.isReady) {
      loadData()
    }
  }, [id, router.isReady])

  return (
    <div>
      <Head>
        <title>News Page | {news.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <Header />
        <div className="bg-white rounded shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
          <p className="text-gray-600">{news.description}</p>
          <p className="text-gray-500 text-sm mt-4">Published on: {formatDate(news.timestamp)}</p>
        </div>
      </div>
    </div>
  )
}

export default NewsPage
