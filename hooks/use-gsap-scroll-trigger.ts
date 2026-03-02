'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollTriggerAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const {
      trigger = element,
      start = 'top 80%',
      end = 'top 20%',
      animation = {},
      markers = false,
      once = true,
    } = options

    // Default animation: fade in and slide up
    const defaultAnimation = {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: 'power3.out',
    }

    const finalAnimation = { ...defaultAnimation, ...animation }

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: 30,
    })

    // Create ScrollTrigger animation
    ScrollTrigger.create({
      trigger,
      start,
      end,
      onEnter: () => {
        gsap.to(element, finalAnimation)
      },
      markers,
      once,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [options])

  return ref
}

export function useParallaxScroll(intensity = 0.5) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    ScrollTrigger.create({
      trigger: element,
      onUpdate: (self) => {
        gsap.to(element, {
          y: -window.innerHeight * self.getVelocity() * intensity * 0.001,
          overwrite: 'auto',
          duration: 0.5,
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [intensity])

  return ref
}

export function useStaggerAnimation(containerRef, childSelector = '.stagger-item') {
  useEffect(() => {
    if (!containerRef.current) return

    const children = containerRef.current.querySelectorAll(childSelector)

    gsap.set(children, {
      opacity: 0,
      y: 30,
    })

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [childSelector])

  return containerRef
}
