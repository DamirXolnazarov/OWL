<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

let bigBall, smallBall, hoverables
let idleTimer = null
const visible = ref(true)

const updateCursor = (e) => {
  visible.value = true
  clearTimeout(idleTimer)

  const mouseX = e.pageX
  const mouseY = e.pageY

  // small ball: faster & direct
  gsap.to(smallBall, {
    x: mouseX - 10,
    y: mouseY - 10,
    duration: 0.08,
    ease: 'power2.out',
  })

  // big ball: smooth trailing
  gsap.to(bigBall, {
    x: mouseX - 30,
    y: mouseY - 30,
    duration: 0.35,
    ease: 'power3.out',
  })


}

const handleHoverIn = () => {
  gsap.to(bigBall, { scale: 4, duration: 0.3, ease: 'power2.out' })
}
const handleHoverOut = () => {
  gsap.to(bigBall, { scale: 1, duration: 0.3, ease: 'power2.out' })
}

onMounted(() => {
  bigBall = document.querySelector('.cursor__ball--big')
  smallBall = document.querySelector('.cursor__ball--small')
  hoverables = document.querySelectorAll('.hoverable')

  document.body.addEventListener('mousemove', updateCursor)
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', handleHoverIn)
    el.addEventListener('mouseleave', handleHoverOut)
  })
})

onUnmounted(() => {
  document.body.removeEventListener('mousemove', updateCursor)
  hoverables?.forEach((el) => {
    el.removeEventListener('mouseenter', handleHoverIn)
    el.removeEventListener('mouseleave', handleHoverOut)
  })
  clearTimeout(idleTimer)
})
</script>

<template>
  <!-- Mix blend on parent for inter-circle interaction -->
  <div
    class="cursor pointer-events-none fixed inset-0 z-[9999] mix-blend-difference transition-opacity duration-500"
    :class="{ 'opacity-0': !visible, 'opacity-100': visible }"
  >
    <!-- Small circle under the big one -->
    <div class="cursor__ball cursor__ball--small absolute">
      <svg width="20" height="20">
        <circle cx="10" cy="10" r="8" fill="#f7f8fa" />
      </svg>
    </div>

    <!-- Big circle that inverts colors -->
    <div class="cursor__ball cursor__ball--big absolute">
      <svg width="60" height="60">
        <circle cx="30" cy="30" r="25" fill="#f7f8fa" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.cursor__ball {
  transition: transform 0.2s ease;
  opacity: 1;
}
</style>
