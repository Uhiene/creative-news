import Header from '@/components/Header'
import { News } from '@/utils/interface'
import axios from 'axios'
import Head from 'next/head'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify';

export default function Create() {
  const [news, setNews] = useState<News>({
    title: '',
    description: '',
  })

  const [creating, setCreating] = useState<Boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNews({
      ...news,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCreating(true)
    await axios.post('/api/news/create', news)
    .then((res) => {
      console.log(res)
      setNews({
        title: '',
        description: '',
      })
      setCreating(false)
      toast.success("News Created Successfully")
    })
    .catch((error) => {
      console.log(error)
      setCreating(false)
      toast.error("News Creation Failed")
    })
  }

  return (
    <div>
      <Head>
        <title>Create Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <Header />
        <div className="mt-8">
          <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                name="title"
                value={news.title}
                onChange={handleChange}
                placeholder="Enter news title"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={news.description}
                onChange={handleChange}
                placeholder="Enter news description"
                required
              ></textarea>
            </div>
           
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={creating}
              >
                {creating ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
