<template>
  <div class="mv-input-wrapper">
    <label v-if="label" :for="inputId" class="mv-input__label">
      {{ label }}
      <span v-if="required" class="mv-input__required">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="['mv-input', { 'mv-input--error': error }]"
      @input="handleInput"
      @blur="handleBlur"
    />
    <span v-if="error" class="mv-input__error">{{ error }}</span>
    <span v-if="hint && !error" class="mv-input__hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

interface Props {
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number'
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  label: '',
  placeholder: '',
  hint: '',
  error: '',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>()

const inputId = computed(() => {
  return `input-${Math.random().toString(36).substr(2, 9)}`
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<style scoped>
.mv-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

.mv-input__label {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.mv-input__required {
  color: #e53e3e;
}

.mv-input {
  padding: 0.75rem 1rem;
  font-size: 14px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}

.mv-input:focus {
  outline: none;
  border-color: #1ea7fd;
  box-shadow: 0 0 0 3px rgba(30, 167, 253, 0.1);
}

.mv-input:disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.mv-input--error {
  border-color: #e53e3e;
}

.mv-input--error:focus {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
}

.mv-input__error {
  font-size: 13px;
  color: #e53e3e;
}

.mv-input__hint {
  font-size: 13px;
  color: #666;
}
</style>
