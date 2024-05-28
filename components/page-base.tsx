"use client";

export default function PageBase( { children } : any ) {
  return (
    <div key="1" className="flex h-[calc(100vh-65px)] w-full overflow-hidden">
      { children }
    </div>
  )
}

