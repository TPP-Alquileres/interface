"use client"

export default function Home() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { id: null, email: null };
  return (
    <>Home User: {currentUser.id} {currentUser.email}</>
  )
}