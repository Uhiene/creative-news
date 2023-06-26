import { News, searchNews } from '@/utils/interface'
import Link from 'next/link'
import React, { useState } from 'react'

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [result, setResult] = useState<News[]>([])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await searchNews(searchTerm)
    setResult(response as News[])
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    {result.length > 0 && (
        <ul className="mt-4 bg-gray-100 p-4 rounded-md">
        {result.map((news, i) => (
          <li key={i} className="mb-2">
            <Link href={'/news/' + news._id}>{news.title}</Link>
          </li>
        ))}
      </ul>
    )}
    </div>
  )
}

export default Search
