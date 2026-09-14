<template>
  <HeroBanner :data="homeHero" />
  <FeaturedWorks :works="featuredWorks" />
  <ArtistSpotlight :spotlight="artistSpotlight" />
</template>

<script setup lang="ts">
import HeroBanner from '../components/home/HeroBanner.vue'
import FeaturedWorks from '../components/home/FeaturedWorks.vue'
import ArtistSpotlight from '../components/home/ArtistSpotlight.vue'
import { homeHero } from '../data/homeHero'
import { featuredWorks } from '../data/featuredWorks'
import { artistSpotlight } from '../data/artistSpotlight'
</script>
