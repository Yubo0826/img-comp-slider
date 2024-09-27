<template>
  <section class="image-comparison" ref="imageComparisonSlider">
    <div class="image-comparison__slider-wrapper">
      <label for="image-comparison-range" class="image-comparison__label">Move image comparison slider</label>
      <input 
        type="range" 
        min="0" 
        max="100" 
        v-model="sliderValue" 
        class="image-comparison__range" 
        id="image-compare-range" 
        @input="moveSliderRange" 
        @change="moveSliderRange"
      />

      <div 
        class="image-comparison__image-wrapper image-comparison__image-wrapper--overlay" 
        ref="imageWrapperOverlay"
      >
        <figure class="image-comparison__figure image-comparison__figure--overlay">
          <picture class="image-comparison__picture">
            <source media="(max-width: 40em)" srcset="https://images.unsplash.com/photo-1566702580807-95611c919b47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=400&q=80">
            <source media="(min-width: 40.0625em) and (max-width: 48em)" srcset="https://images.unsplash.com/photo-1566702580807-95611c919b47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&h=600&q=80">
            <img :src="imageBefore" alt="Mojave desert in the sun" class="image-comparison__image">
          </picture>
          <figcaption class="image-comparison__caption image-comparison__caption--before">
            <span class="image-comparison__caption-body">{{ beforeLabel }}</span>
          </figcaption>
        </figure>
      </div>

      <div class="image-comparison__slider" ref="slider">
        <span class="image-comparison__thumb" ref="thumb">
          <svg class="image-comparison__thumb-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="currentColor">
            <path class="image-comparison__thumb-icon--left" d="M12.121 4.703V.488c0-.302.384-.454.609-.24l4.42 4.214a.33.33 0 0 1 0 .481l-4.42 4.214c-.225.215-.609.063-.609-.24V4.703z"></path>
            <path class="image-comparison__thumb-icon--right" d="M5.879 4.703V.488c0-.302-.384-.454-.609-.24L.85 4.462a.33.33 0 0 0 0 .481l4.42 4.214c.225.215.609.063.609-.24V4.703z"></path>
          </svg>
        </span>
      </div>

      <div class="image-comparison__image-wrapper">
        <figure class="image-comparison__figure">
          <picture class="image-comparison__picture">
            <source media="(max-width: 40em)" srcset="https://images.unsplash.com/photo-1554110397-9bac083977c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&height=400&q=80">
            <source media="(min-width: 40.0625em) and (max-width: 48em)" srcset="https://images.unsplash.com/photo-1554110397-9bac083977c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&height=600&q=80">
            <img :src="imageAfter" alt="Mojave desert in the dark" class="image-comparison__image">
          </picture>
          <figcaption class="image-comparison__caption image-comparison__caption--after">
            <span class="image-comparison__caption-body">{{ afterLabel }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps<{
  img: string[],
  beforeLabel: string,
  afterLabel: string
}>()

const imageBefore = ref<string | null>(props.img[0] || null)
const imageAfter = ref<string | null>(props.img[1] || null)

const imageComparisonSlider = ref<HTMLElement | null>(null)
const imageWrapperOverlay = ref<HTMLElement | null>(null)
const slider = ref<HTMLElement | null>(null)
const thumb = ref<HTMLElement | null>(null)
const sliderValue = ref(50)

const moveSliderThumb = (e: MouseEvent) => {
  if (!slider.value || !thumb.value) return

  let position = e.layerY - 20
  const sliderRange = slider.value

  if (e.layerY <= sliderRange.offsetTop) {
    position = -20
  }

  if (e.layerY >= sliderRange.offsetHeight) {
    position = sliderRange.offsetHeight - 20
  }

  thumb.value.style.top = `${position}px`
}

const moveSliderRange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!slider.value || !imageWrapperOverlay.value) return

  const value = target.value
  slider.value.style.left = `${value}%`
  imageWrapperOverlay.value.style.width = `${value}%`
}

const setSliderState = (e: Event) => {
  if (e.type === 'input') {
    slider.value?.classList.add('image-comparison__range--active')
    return;
  }
  slider.value?.classList.remove('image-comparison__range--active')
}

onMounted(() => {
  const sliderElement = imageComparisonSlider.value?.querySelector<HTMLInputElement>('#image-compare-range');
  if (sliderElement && 'ontouchstart' in window === false) {
    sliderElement.addEventListener('mouseup', setSliderState)
    sliderElement.addEventListener('mousedown', moveSliderThumb)
  }

  sliderElement?.addEventListener('input', moveSliderRange)
  sliderElement?.addEventListener('change', moveSliderRange)
})

</script>

<style scoped>
/* Add your CSS here */
</style>


<style scoped>
body {
  font-family: "Helvetica", sans-serif;
}

.image-comparison {
  max-width: 48.063em;
  margin-right: auto;
  margin-left: auto;
}

.image-comparison__slider-wrapper {
  position: relative;
}

.image-comparison__label {
  font-size: 0;
  line-height: 0;
}

.image-comparison__label,
.image-comparison__range {
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
  cursor: ew-resize;
  z-index: 20;
}

@media (hover) {
  .image-comparison__range:hover ~ .image-comparison__slider .image-comparison__thumb {
    transform: scale(1.2);
  }
}

.image-comparison .image-comparison__slider-wrapper .image-comparison__range:active ~ .image-comparison__slider .image-comparison__thumb,
.image-comparison .image-comparison__slider-wrapper .image-comparison__range:focus ~ .image-comparison__slider .image-comparison__thumb,
.image-comparison .image-comparison__slider-wrapper .image-comparison__range--active ~ .image-comparison__slider .image-comparison__thumb {
  transform: scale(0.8);
  background-color: rgba(0, 97, 127, 0.5);
}

.image-comparison__image-wrapper--overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(50% + 1px);
  height: 100%;
  overflow: hidden;
}

.image-comparison__figure {
  margin: 0;
}
.image-comparison__figure::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
.image-comparison__figure:not(.image-comparison__figure--overlay) {
  position: relative;
  padding-top: 66.666666667%;
}

.image-comparison__image {
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
.image-comparison__figure--overlay .image-comparison__image {
  z-index: 1;
}

.image-comparison__caption {
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
  .image-comparison__caption {
    font-size: 12px;
  }
}

.image-comparison__caption--before {
  left: 12px;
  z-index: 2;
}

.image-comparison__caption--after {
  right: 12px;
  text-align: right;
}

.image-comparison__caption-body {
  max-width: 40vmin;
  padding: 6px 12px;
  background-color: rgba(0, 0, 0, 0.55);
}

.image-comparison__slider {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background-color: #fff;
  transition: background-color 0.3s ease-in-out;
  z-index: 10;
}
.image-comparison__range--active ~ .image-comparison__slider {
  background-color: rgba(255, 255, 255, 0);
}

.image-comparison__thumb {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0091df;
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 22px 0 rgba(0, 0, 0, 0.5);
  transform-origin: center;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.image-comparison__range::-webkit-slider-runnable-track {
  width: 40px;
  height: 40px;
  opacity: 0;
}

.image-comparison__range::-moz-range-thumb {
  width: 40px;
  height: 40px;
  opacity: 0;
}

.image-comparison__range::-webkit-slider-thumb {
  width: 40px;
  height: 40px;
  opacity: 0;
}

.image-comparison__range::-ms-fill-lower {
  background-color: transparent;
}

.image-comparison__range::-ms-track {
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
  cursor: col-resize;
}

.image-comparison__range::-ms-thumb {
  width: 0.5%;
  height: 100%;
  opacity: 0;
}

.image-comparison__range::-ms-tooltip {
  display: none;
}

</style>

