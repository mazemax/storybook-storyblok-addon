<template>
  <button
    :class="['mv-button', `mv-button--${variant}`, `mv-button--${size}`]"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  label: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.mv-button {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mv-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.mv-button--primary {
  background: #1ea7fd;
  color: white;
}

.mv-button--primary:hover:not(:disabled) {
  background: #1890db;
}

.mv-button--secondary {
  background: #6c757d;
  color: white;
}

.mv-button--secondary:hover:not(:disabled) {
  background: #5a6268;
}

.mv-button--outline {
  background: transparent;
  border: 2px solid #1ea7fd;
  color: #1ea7fd;
}

.mv-button--outline:hover:not(:disabled) {
  background: #1ea7fd;
  color: white;
}

/* Sizes */
.mv-button--small {
  padding: 6px 12px;
  font-size: 12px;
}

.mv-button--medium {
  padding: 10px 20px;
  font-size: 14px;
}

.mv-button--large {
  padding: 14px 28px;
  font-size: 16px;
}
</style>
