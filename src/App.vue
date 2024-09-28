<script setup lang="ts">
import imgCompSlider from './components/ImgCompSlider.vue'
import { ref } from 'vue'

const img = ref<string[]>([
  '/src/assets/Florence_Italy_before.jpg',
  '/src/assets/Florence_Italy_after.jpg'
])
</script>

<template>
  <div>
    <h1>Image comparion slider</h1>
    <img-comp-slider :img="img" beforeLabel="1910" afterLabel="2022"></img-comp-slider>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Edu+QLD+Beginner:wght@400..700&family=Pacifico&display=swap');
</style>
<style>
h1 {
  font-family: "Edu QLD Beginner", cursive;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  text-align: center;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
