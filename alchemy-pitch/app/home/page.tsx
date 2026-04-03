// app/layout.tsx or page.tsx
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
})

export default function Home() {
  return (
    <main className={`min-h-screen bg-gray-50 ${poppins.className}`}>
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="font-myfont text-5xl font-bold">
          Build Beautiful Websites & great user experience with Next.js, TypeScript and Tailwind CSS
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto font-poppins">
          Create fast, modern and responsive websites using Next.js,
          TypeScript and Tailwind CSS.
        </p>

        <button className="mt-8 px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition">
          Get Started
        </button>
      </section>
    </main>
  )
}