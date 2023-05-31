import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <nav className="flex justify-between items-center px-4">
        <h1 className="text-white font-bold text-xl">Creative News</h1>
        <ul className="flex space-x-4">
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/create" className="text-white">
            Create
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header
