<template>
  <HeroBanner :data="homeHero" />
  <FeaturedWorks :works="featuredWorks" />
  <PaintingSpotlight :paintings="spotlightPaintings" />
</template>

<script setup lang="ts">
import HeroBanner from '../components/home/HeroBanner.vue'
import FeaturedWorks from '../components/home/FeaturedWorks.vue'
import PaintingSpotlight from '../components/home/PaintingSpotlight.vue'
import { homeHero } from '../data/homeHero'
import { featuredWorks } from '../data/featuredWorks'
import { spotlightPaintings } from '../data/spotlightPaintings'
</script>
