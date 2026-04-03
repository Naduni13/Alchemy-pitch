// app/layout.tsx or page.tsx
import { Poppins } from 'next/font/google'
import Title from "../../components/Title"
import Services from "@/components/Services";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
})

export default function Home() {
  return (
    <main className={`min-h-screen bg-gray-50 ${poppins.className}`}>
      <Title/>
      
<Services />
    </main>
  )
}