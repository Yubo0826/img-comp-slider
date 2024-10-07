<template>
  <section v-if="imageBefore && imageAfter" class="img-comp" ref="imageComparisonSlider">
    <div class="img-comp__slider-wrapper">
      <label for="img-comp-range" class="img-comp__label">Move image comparison slider</label>
      <input 
        type="range" 
        min="0" 
        max="100" 
        v-model="sliderValue" 
        class="img-comp__range" 
        id="image-compare-range" 
        @input="moveSliderRange" 
        @change="moveSliderRange"
      />

      <div 
        class="img-comp__image-wrapper img-comp__image-wrapper--overlay" 
        ref="imageWrapperOverlay"
      >
        <figure class="img-comp__figure img-comp__figure--overlay">
          <picture class="img-comp__picture">
            <source :srcset="imageBefore" media="(max-width: 40em)">
            <source :srcset="imageBefore" media="(min-width: 40.0625em) and (max-width: 48em)">
            <img :src="imageBefore" alt="" class="img-comp__image">
          </picture>
          <figcaption class="img-comp__caption img-comp__caption--before">
            <span class="img-comp__caption-body">{{ beforeLabel }}</span>
          </figcaption>
        </figure>
      </div>

      <div class="img-comp__slider" ref="slider">
        <span class="img-comp__thumb" ref="thumb">
          <svg class="img-comp__thumb-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="15" viewBox="0 0 18 10" fill="currentColor">
            <path class="img-comp__thumb-icon--left" d="M12.121 4.703V.488c0-.302.384-.454.609-.24l4.42 4.214a.33.33 0 0 1 0 .481l-4.42 4.214c-.225.215-.609.063-.609-.24V4.703z"></path>
            <path class="img-comp__thumb-icon--right" d="M5.879 4.703V.488c0-.302-.384-.454-.609-.24L.85 4.462a.33.33 0 0 0 0 .481l4.42 4.214c.225.215.609.063.609-.24V4.703z"></path>
          </svg>
        </span>
      </div>

      <div class="img-comp__image-wrapper">
        <figure class="img-comp__figure">
          <picture class="img-comp__picture">
            <source :srcset="imageAfter" media="(max-width: 40em)">
            <source :srcset="imageAfter" media="(min-width: 40.0625em) and (max-width: 48em)">
            <img :src="imageAfter" alt="" class="img-comp__image">
          </picture>
          <figcaption class="img-comp__caption img-comp__caption--after">
            <span class="img-comp__caption-body">{{ afterLabel }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'

interface Props {
  img: string[]
  beforeLabel?: string,
  afterLabel?: string,
  direction?: string
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal'
})

const imageBefore = ref<string | null>(props.img[0] || null)
const imageAfter = ref<string | null>(props.img[1] || null)

const imageComparisonSlider = ref<HTMLElement | null>(null)
const imageWrapperOverlay = ref<HTMLElement | null>(null)
const slider = ref<HTMLElement | null>(null)
const thumb = ref<HTMLElement | null>(null)
const sliderValue = ref(50)

// 定義移動 thumb 的方法，處理滑動過程中的事件
const moveSliderThumb = (e: MouseEvent) => {
  if (!slider.value || !thumb.value) return

  let position = e.offsetY - 20
  const sliderRange = slider.value

  if (e.offsetY <= sliderRange.offsetTop) {
    position = -20
  }

  if (e.offsetY >= sliderRange.offsetHeight) {
    position = sliderRange.offsetHeight - 20
  }

  thumb.value.style.top = `${position}px`
}

// 定義移動 slider 的方法，處理 range 輸入的事件
const moveSliderRange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!slider.value || !imageWrapperOverlay.value) return

  const value = target.value
  slider.value.style.left = `${value}%`
  imageWrapperOverlay.value.style.width = `${value}%`
}

// 設置 slider 的狀態，當滑動開始或結束時觸發
const setSliderState = (e: Event) => {
  if (e.type === 'input') {
    slider.value?.classList.add('img-comp__range--active')
    return;
  }
  slider.value?.classList.remove('img-comp__range--active')
}

// 使用 onMounted，在組件掛載後為 slider 添加事件監聽器
onMounted(() => {
  const sliderElement = imageComparisonSlider.value?.querySelector<HTMLInputElement>('#image-compare-range')
  if (sliderElement && 'ontouchstart' in window === false) {
    sliderElement.addEventListener('mouseup', setSliderState)
    sliderElement.addEventListener('mousedown', moveSliderThumb)
  }

  sliderElement?.addEventListener('input', moveSliderRange)
  sliderElement?.addEventListener('change', moveSliderRange)
})

</script>

<style>
.img-comp {
  max-width: 48.063em;
  margin-right: auto;
  margin-left: auto;
}

.img-comp__slider-wrapper {
  position: relative;
}

.img-comp__label {
  font-size: 0;
  line-height: 0;
}

.img-comp__label,
.img-comp__range {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: none;
  z-index: 20;
}

@media (hover) {
  .img-comp__range:hover ~ .img-comp__slider .img-comp__thumb {
    transform: scale(1.6);
  }
}

/* .img-comp .img-comp__slider-wrapper .img-comp__range:active ~ .img-comp__slider .img-comp__thumb,
.img-comp .img-comp__slider-wrapper .img-comp__range:focus ~ .img-comp__slider .img-comp__thumb,
.img-comp .img-comp__slider-wrapper .img-comp__range--active ~ .img-comp__slider .img-comp__thumb {
  transform: scale(0.8);
  background-color: rgba(0, 97, 127, 0.5);
} */

.img-comp__image-wrapper--overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(50% + 1px);
  height: 100%;
  overflow: hidden;
}

.img-comp__figure {
  margin: 0;
}
.img-comp__figure::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
.img-comp__figure:not(.img-comp__figure--overlay) {
  position: relative;
  padding-top: 66.666666667%;
}

.img-comp__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
  -o-object-position: 0 50%;
     object-position: 0 50%;
  overflow: hidden;
}
.img-comp__figure--overlay .img-comp__image {
  z-index: 1;
}

.img-comp__caption {
  position: absolute;
  bottom: 12px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}
@media screen and (max-width: 40.063em) {
  .img-comp__caption {
    font-size: 12px;
  }
}

.img-comp__caption--before {
  left: 12px;
  z-index: 2;
}

.img-comp__caption--after {
  right: 12px;
  text-align: right;
}

.img-comp__caption-body {
  max-width: 40vmin;
  padding: 6px 12px;
  background-color: rgba(0, 0, 0, 0.55);
}

.img-comp__slider {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background-color: #fff;
  transition: background-color 0.3s ease-in-out;
  z-index: 10;
}
.img-comp__range--active ~ .img-comp__slider {
  background-color: rgba(255, 255, 255, 0);
}

.img-comp__thumb {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #0091df; */
  color: #fff;
  border-radius: 50%;
  /* box-shadow: 0 0 22px 0 rgba(0, 0, 0, 0.5); */
  transform-origin: center;
  transition: transform 0.3s ease-in-out
  /* background-color 0.3s ease-in-out; */
}

.img-comp__range::-webkit-slider-runnable-track {
  width: 40px;
  height: 40px;
  opacity: 0;
}

.img-comp__range::-moz-range-thumb {
  width: 40px;
  height: 40px;
  opacity: 0;
}

.img-comp__range::-webkit-slider-thumb {
  width: 40px;
  height: 40px;
  opacity: 0;
}

.img-comp__range::-ms-fill-lower {
  background-color: transparent;
}

.img-comp__range::-ms-track {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: transparent;
  outline: none;
}

.img-comp__range::-ms-thumb {
  width: 0.5%;
  height: 100%;
  opacity: 0;
}

.img-comp__range::-ms-tooltip {
  display: none;
}

</style>

