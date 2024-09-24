<template>
  <div ref="containerRef" class="img-comp-container">
    <input class="move-area" type="text" ref="moveRef"
      @mousedown="slideDown" 
      @mousemove="slideMove"
      @keydown="keyDownSlide"
    >
    <div class="img-comp-img">
      <img :src="imageUrl1" :width="width" :height="height">
    </div>
    <!-- <div ref="sliderRef" class="img-comp-slider move"></div> -->
    <img ref="sliderRef" src="@/assets/expand-arrows.png" class="img-comp-slider move" alt="">
    <div ref="imgOverlay" class="img-comp-img img-comp-overlay move">
      <img :src="imageUrl2" :width="width" :height="height">
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'

const props = defineProps({
  img: {
    type: Array,
    required: true
  },
  width: {
    type: Number,
    required: false,
    default: 600
  },
  height: {
    type: Number,
    required: false,
    default: 400
  }
})

const imageUrl1 = new URL(props.img[0] as string, import.meta.url).href
const imageUrl2 = new URL(props.img[1] as string, import.meta.url).href
const imgOverlay = ref<HTMLElement | null>(null)
const sliderRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

var slider: HTMLElement
var img: HTMLElement
var container: HTMLElement
var clicked: boolean

onMounted(() => {
  slider = sliderRef.value as HTMLElement
  img = imgOverlay.value as HTMLElement
  container = containerRef.value as HTMLElement
  slider.style.left = (img.offsetWidth / 2) - (slider.offsetWidth / 2) + "px"
  slider.style.top = (img.offsetHeight / 2) - (slider.offsetHeight / 2) + "px"
  img.style.width = (img.offsetWidth / 2) + "px"
  window.addEventListener('mouseup', slideLeave)
})

function slideDown(e: MouseEvent) {
  console.log('slideDown')
  // e.preventDefault()
  clicked = true
  let mouseX = e.offsetX
  slider.style.left = mouseX - (slider.offsetWidth / 2) + "px"
  img.style.width = mouseX + 'px'
}

function slideMove(e: MouseEvent) {
  console.log('slideMove');
  if (!clicked) return false
  let mouseX = e.offsetX
  console.log(mouseX);
  
  if (mouseX < 0) mouseX = 0
  slider.style.left = mouseX - (slider.offsetWidth / 2) + "px"
  img.style.width = mouseX + 'px'
}

function keyDownSlide(e: KeyboardEvent) {
  console.log('keyDownSlide')
  let width = parseInt(img.style.width)
  let offset: number
  if (e.key === 'ArrowLeft') {
    offset = width < 20 ? 0 : width - 20
    slider.style.left =  offset - slider.offsetWidth / 2 + 'px'
    img.style.width = offset + 'px'
    return
  }
  offset = width + 20 > container.offsetWidth ? container.offsetWidth : width + 20
  slider.style.left =  offset - slider.offsetWidth / 2 + 'px'
  img.style.width = offset + 'px'
}

function slideLeave(e: MouseEvent) {
  console.log('slideLeave')
  clicked = false
}


</script>
<style>
* {box-sizing: border-box;}

.move-area {
  position: absolute;
  z-index: 10;
  width: inherit;
  height: inherit;
  opacity: 0;
  cursor: default;
}

.img-comp-container {
  position: relative;
  height: 400px; /*should be the same height as the images*/
  width: 600px;
}

.img-comp-img {
  position: absolute;
  width: auto;
  height: auto;
  overflow: hidden;
}

.img-comp-img img {
  display: block;
  vertical-align: middle;
}

.img-comp-slider {
  position: absolute;
  z-index: 9;
  /* cursor: ew-resize; */
  /*set the appearance of the slider:*/
  width: 40px;
  height: 40px;
  /* background-color: #2196F3; */
  opacity: 0.7;
  border-radius: 50%;
}

.move {
  transition: all .1s ease-out;
}


</style>

