"use client"
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/items', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
  }, [])
  console.log(data)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Rent Items</h1>
    </main>
  )
}
