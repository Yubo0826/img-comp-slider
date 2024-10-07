# img-comparsion-slider
Vue3 component for comparing two images with a slider.

## Demo

https://yubo0826.github.io/img-comparsion-slider/

## **Installation**

```bash
npm i img-comp-slider
```

## Use

```html
<script setup lang="ts">
import { ImgCompSlider } from 'img-comp-slider'
import 'img-comp-slider/dist/style.css'

import { ref } from 'vue'

const img = ref<string[]>([
  '/src/assets/Florence_Italy_before.jpg',
  '/src/assets/Florence_Italy_after.jpg'
])
</script>

<template>
  <div>
    <img-comp-slider :img="img" beforeLabel="1910" afterLabel="2022"></img-comp-slider>
  </div>
</template>

```

## Props

### img

Array of two image URLs. The first image is for the "before" image, and the second image is for the "after" image.

- type: `Array<string>`
- required: `true`

```
['/img/before.jpg', '/img/after.jpg']
```

### beforeLabel

A label for the "before" image.

- type: `String`
- required: false

```
'before'
```

### afterLabel

A label for the "after" image.

- type: `String`
- required: false

```
'after'
```
