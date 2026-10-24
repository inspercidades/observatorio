"use client"

import arrowLeft from "@/app/assets/images/arrow-left.png"
import arrowRight from "@/app/assets/images/arrow-right.png"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { Swiper as SwiperType } from "swiper"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import Image from "next/image"
import "swiper/css"
import "swiper/css/navigation"

interface SlideData {
  id: number
  videoSrc?: string
  imageSrc?: string
  title: string
  subtitle: string
  link: string
}

const slides: SlideData[] = [
  {
    id: 1,
    videoSrc: "/videos/v1.mp4",
    imageSrc: "/images/city-aerial.jpg",
    title: "Mobilidade inteligente  e humana para um Brasil mais conectado e sustentável",
    subtitle: "Indicadores e evidências para transformar a mobilidade urbana brasileira",
    link: "/sobre"
  },
  {
    id: 2,
    videoSrc: "/videos/v2.mp4",
    imageSrc: "/images/transportation.jpg",
    title: "Evento - Gestão metropolitana: desafios e oportunidades",
    subtitle: "Desafio da implementação das autoridades metropolitanas no Brasil",
    link: "https://youtu.be/F45qQPCDtJk?si=FwHsDuCksT7Ieco8"
  },
  {
    id: 3,
    videoSrc: "/videos/v3.mp4",
    imageSrc: "/images/sustainable-city.jpg",
    title: "Criar uma ampla base de dados de mobilidade urbana e conectar cidades",
    subtitle: "Construir caminhos para a democratização e acesso aos dados de mobilidade urbana",
    link: "/dados/catalogo-de-dados"
  },
  {
    id: 4,
    videoSrc: "/videos/v4.mp4",
    imageSrc: "/images/sustainable-city.jpg",
    title: "Insper Cidades na mobilidade: Urbanismo social",
    subtitle: "A transformação do território a partir do urbanismo social sob o olhar da mobilidade urbana",
    link: "https://www.youtube.com/watch?v=TG8uj64SAKo&t=40s"
  },

]

export function HeroSwiper() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const swiperRef = useRef<{ swiper: SwiperType }>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<HTMLVideoElement[]>([])

  const handleSlideChange = (swiper: SwiperType) => {
    // Handle loop properly by using realIndex instead of activeIndex
    setActiveIndex(swiper.realIndex)
    setProgress(0) // Reset progress when slide changes

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    // Start progress animation after a small delay to ensure state is updated
    setTimeout(() => {
      if (isVisible) {
        startProgressAnimation()
      }
    }, 50)
  }

  const startProgressAnimation = () => {
    // Clear any existing interval first
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }

    const startTime = Date.now()
    const duration = 10000 // 10 seconds

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
          progressIntervalRef.current = null
        }
      }
    }, 16) // ~60fps
  }

  const pauseAllVideos = () => {
    videoRefs.current.forEach(video => {
      if (video && !video.paused) {
        video.pause()
      }
    })
  }

  const playAllVideos = () => {
    videoRefs.current.forEach(video => {
      if (video && video.paused) {
        video.play().catch(console.error)
      }
    })
  }

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext()
    }
  }

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)

        if (visible) {
          // Resume videos and progress when visible
          playAllVideos()
          if (swiperRef.current) {
            swiperRef.current.swiper.autoplay.start()
          }
          // Only start progress if not already running
          if (!progressIntervalRef.current) {
            startProgressAnimation()
          }
        } else {
          // Pause videos and progress when not visible
          pauseAllVideos()
          if (swiperRef.current) {
            swiperRef.current.swiper.autoplay.stop()
          }
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
            progressIntervalRef.current = null
          }
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the component is visible
        rootMargin: '0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Start progress animation on mount
  useEffect(() => {
    // Start progress animation after component mounts
    const timer = setTimeout(() => {
      startProgressAnimation()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        speed={1000}
        onSlideChange={handleSlideChange}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <Link href={slide.link} className="block h-full">
              {/* Video/Image Background */}
              <div className="absolute inset-0">
                {slide.videoSrc ? (
                  <video
                    ref={(el) => {
                      if (el) {
                        videoRefs.current[slide.id - 1] = el
                      }
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to image if video fails to load
                      const target = e.target as HTMLVideoElement
                      target.style.display = 'none'
                      const fallback = target.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'block'
                    }}
                  >
                    <source src={slide.videoSrc} type="video/mp4" />
                  </video>
                ) : null}

                {/* Fallback Image Background */}
                <div
                  className={`w-full h-full bg-cover bg-center ${slide.videoSrc ? 'hidden' : 'block'
                    }`}
                  style={{
                    backgroundImage: slide.imageSrc
                      ? `url(${slide.imageSrc})`
                      : 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)'
                  }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-end h-full pb-20 px-4 2xl:px-16">
                <div className="max-w-4xl">
                  <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white max-w-2xl leading-tight mb-4">
                      {slide.title}
                    </h1>

                    <p className="text-md md:text-xl text-white/90 leading-relaxed mb-6">
                      {slide.subtitle}
                    </p>

                    {/* Progress Bar and Navigation Controls - Mobile/Tablet */}
                    <div className="lg:hidden">
                      {/* Progress Bar Indicators */}
                      <div className="flex items-center gap-2 mb-4">
                        {slides.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (swiperRef.current) {
                                swiperRef.current.swiper.slideTo(index)
                              }
                            }}
                            className="w-16 h-1 bg-white/20 hover:bg-white/30 transition-all duration-300 relative overflow-hidden"
                            aria-label={`Go to slide ${index + 1}`}
                          >
                            <div
                              className={`h-full transition-all duration-75 ease-linear ${index === activeIndex
                                ? 'bg-white/90'
                                : 'bg-white/20'
                                }`}
                              style={{
                                width: index === activeIndex ? `${progress}%` : '0%'
                              }}
                            />
                          </button>
                        ))}
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center gap-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handlePrevSlide()
                          }}
                          className="w-12 h-12 flex items-center justify-center bg-trasparent"
                          aria-label="Previous slide"
                        >
                          <Image
                            width={24}
                            height={24}
                            src={arrowLeft.src}
                            alt="Previous slide"
                            className="w-8 h-8 group-hover:scale-110 transition-transform"
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleNextSlide()
                          }}
                          className="w-12 h-12 flex items-center justify-center bg-transparent"
                          aria-label="Next slide"
                        >
                          <Image
                            width={24}
                            height={24}
                            src={arrowRight.src}
                            alt="Next slide"
                            className="w-8 h-8 group-hover:scale-110 transition-transform"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Progress Bar and Navigation Controls - Desktop */}
      <div className="absolute bottom-15 left-0 right-0 z-20 px-4 2xl:px-16 hidden lg:block">
        <div className="flex items-center justify-between">
          {/* Progress Bar Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (swiperRef.current) {
                    swiperRef.current.swiper.slideTo(index)
                  }
                }}
                className="w-16 h-1 bg-white/20 hover:bg-white/30 transition-all duration-300 relative overflow-hidden"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-full transition-all duration-75 ease-linear ${index === activeIndex
                    ? 'bg-white/90'
                    : 'bg-white/20'
                    }`}
                  style={{
                    width: index === activeIndex ? `${progress}%` : '0%'
                  }}
                />
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-0">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handlePrevSlide()
              }}
              className="w-12 h-12  flex items-center justify-center transition-all duration-300 group"
              aria-label="Previous slide"
            >
              <Image
                width={24}
                height={24}
                src={arrowLeft.src}
                alt="Previous slide"
                className="w-8 h-8 group-hover:scale-110 transition-transform"
              />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleNextSlide()
              }}
              className="w-12 h-12  flex items-center justify-center transition-all duration-300 group"
              aria-label="Next slide"
            >
              <Image
                width={24}
                height={24}
                src={arrowRight.src}
                alt="Next slide"
                className="w-8 h-8 group-hover:scale-110 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>


    </section>
  )
} 