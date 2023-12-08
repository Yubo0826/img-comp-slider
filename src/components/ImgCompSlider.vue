<template>
  <div class="img-comp-container">
    <span class="move-area"
      @mousedown="slideDown" 
      @mousemove="slideMove" 
      @mouseup="slideLeave" 
    ></span>
    <div class="img-comp-img">
      <img :src="imageUrl1" :width="width" :height="height">
    </div>
    <div ref="sliderRef" class="img-comp-slider"></div>
    <div ref="imgOverlay" class="img-comp-img img-comp-overlay">
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
    default: 300
  },
  height: {
    type: Number,
    required: false,
    default: 200
  }
})

const imageUrl1 = new URL(props.img[0] as string, import.meta.url).href
const imageUrl2 = new URL(props.img[1] as string, import.meta.url).href
const imgOverlay = ref<HTMLElement | null>(null)
const sliderRef = ref<HTMLElement | null>(null)

var clicked: boolean

onMounted(() => {
  const slider = sliderRef.value as HTMLElement
  const img = imgOverlay.value as HTMLElement
  slider.style.left = (img.offsetWidth / 2) - (slider.offsetWidth / 2) + "px"
  slider.style.top = (img.offsetHeight / 2) - (slider.offsetHeight / 2) + "px"
  img.style.width = (img.offsetWidth / 2) + "px"
})

function slideDown(e: MouseEvent) {
  e.preventDefault()
  clicked = true
  const slider = sliderRef.value as HTMLElement
  const img = imgOverlay.value as HTMLElement
  let mouseX = e.offsetX
  slider.style.left = mouseX - (slider.offsetWidth / 2) + "px"
  img.style.width = mouseX + 'px'
}

function slideMove(e: MouseEvent) {
  if (!clicked) return false
  e.preventDefault()
  const slider = sliderRef.value as HTMLElement
  const img = imgOverlay.value as HTMLElement
  let mouseX = e.offsetX
  if (mouseX < 0) mouseX = 0
  slider.style.left = mouseX - (slider.offsetWidth / 2) + "px"
  img.style.width = mouseX + 'px'
}

function slideLeave(e: MouseEvent) {
  console.log('slideLeave');
  
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
}

.img-comp-container {
  position: relative;
  height: 200px; /*should be the same height as the images*/
  width: 300px;
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
  background-color: #2196F3;
  opacity: 0.7;
  border-radius: 50%;
}

.move {
  transition: all .1s ease-out;
}


</style>

