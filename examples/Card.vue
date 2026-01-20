<template>
  <div class="mv-card">
    <img v-if="imageUrl" :src="imageUrl" :alt="title" class="mv-card__image" />
    <div class="mv-card__content">
      <h3 v-if="title" class="mv-card__title">{{ title }}</h3>
      <p v-if="description" class="mv-card__description">{{ description }}</p>
      <slot></slot>
    </div>
    <div v-if="ctaLabel || $slots.footer" class="mv-card__footer">
      <slot name="footer">
        <a v-if="ctaLabel && ctaUrl" :href="ctaUrl" class="mv-card__cta">
          {{ ctaLabel }}
        </a>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  title?: string
  description?: string
  imageUrl?: string
  ctaLabel?: string
  ctaUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  imageUrl: '',
  ctaLabel: '',
  ctaUrl: '',
})
</script>

<style scoped>
.mv-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  max-width: 400px;
}

.mv-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.mv-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.mv-card__content {
  padding: 1.5rem;
}

.mv-card__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: #1a1a1a;
}

.mv-card__description {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.mv-card__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e0e0e0;
  background: #f9f9f9;
}

.mv-card__cta {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #1ea7fd;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s ease;
}

.mv-card__cta:hover {
  background: #1890db;
}
</style>
