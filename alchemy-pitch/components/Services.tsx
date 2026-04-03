"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

type Service = {
  title: string
  count: string
  image: string
}

const services: Service[] = [
  {
    title: "Web & Mobile Development",
    count: "14",
    image: "/services/web.png",
  },
  {
    title: "A/V Production",
    count: "14",
    image: "/services/av.png",
  },
  {
    title: "Digital Marketing",
    count: "06",
    image: "/services/marketing.png",
  },
  {
    title: "Event Management",
    count: "10",
    image: "/services/event.png",
  },
]

const IMAGE_HEIGHT = 480

export default function Services() {
  const activeIndex = useRef<number | null>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])

  const closeRow = (index: number, duration = 0.45) => {
    const imageContainer = imageContainerRefs.current[index]
    const image = imageRefs.current[index]
    const text = textRefs.current[index]
    if (!imageContainer) return

    gsap.killTweensOf([imageContainer, image, text])

    gsap.to(imageContainer, {
      height: 0,
      marginTop: 0,
      duration,
      ease: "power3.inOut",
    })
    gsap.to(image, {
      scale: 1.08,
      duration,
      ease: "power3.inOut",
    })
    gsap.to(text, {
      opacity: 1,
      y: 0,
      duration: duration * 0.8,
      ease: "power2.out",
      delay: duration * 0.3,
    })
  }

  const openRow = (index: number) => {
    const imageContainer = imageContainerRefs.current[index]
    const image = imageRefs.current[index]
    const text = textRefs.current[index]
    if (!imageContainer) return

    gsap.killTweensOf([imageContainer, image, text])

    gsap.to(text, {
      opacity: 0,
      y: -16,
      duration: 0.25,
      ease: "power2.in",
    })
    gsap.to(imageContainer, {
      height: IMAGE_HEIGHT,
      marginTop: 20,
      duration: 0.55,
      ease: "power3.inOut",
      delay: 0.05,
    })
    gsap.fromTo(
      image,
      { scale: 1.08 },
      {
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
        delay: 0.1,
      }
    )
  }

  const handleMouseEnter = (index: number) => {
    if (activeIndex.current === index) return

    // Close previously open row
    if (activeIndex.current !== null) {
      closeRow(activeIndex.current, 0.4)
    }

    activeIndex.current = index
    openRow(index)
  }

  const handleMouseLeave = () => {
    if (activeIndex.current === null) return
    closeRow(activeIndex.current)
    activeIndex.current = null
  }

  // Set initial GSAP states after mount
  useEffect(() => {
    imageContainerRefs.current.forEach((el) => {
      if (el) gsap.set(el, { height: 0, marginTop: 0 })
    })
    imageRefs.current.forEach((el) => {
      if (el) gsap.set(el, { scale: 1.08 })
    })
  }, [])

  return (
    <section className="w-full flex flex-col items-center py-24 bg-white">
      {/* Title */}
      <h2 className="text-7xl md:text-8xl font-bold text-center mb-16 text-black">
        Our Services
      </h2>

      {/* Services Container */}
      <div className="w-full max-w-[1000px] bg-gray-100 rounded-2xl p-12">
        <div className="space-y-10 max-w-3xl mx-auto" onMouseLeave={handleMouseLeave}>
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { rowRefs.current[index] = el }}
              onMouseEnter={() => handleMouseEnter(index)}
              className="cursor-pointer text-center"
            >
              {/* Service Title & Count */}
              <div
                ref={(el) => { textRefs.current[index] = el }}
                className="flex justify-center items-center gap-4 flex-wrap"
              >
                <span className="text-5xl md:text-6xl lg:text-7xl font-light text-[#8f8d8d]">
                  {service.title}
                </span>
                <span className="text-sm md:text-base bg-white px-3 py-1 rounded-full font-medium text-black">
                  {service.count}
                </span>
              </div>

              {/* Image Container — in normal flow, height animated by GSAP */}
              <div
                ref={(el) => { imageContainerRefs.current[index] = el }}
                className="overflow-hidden rounded-2xl w-full"
                style={{ height: 0, marginTop: 0 }}
              >
                <div
                  ref={(el) => { imageRefs.current[index] = el }}
                  className="w-full will-change-transform"
                  style={{ transformOrigin: "center center" }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full object-cover rounded-2xl"
                    style={{ height: IMAGE_HEIGHT }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}