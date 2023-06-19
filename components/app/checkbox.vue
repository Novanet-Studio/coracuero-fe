<template>
  <div class="checkbox__wrapper">
    <input
      id="check"
      type="checkbox"
      class="p-1"
      v-model="value"
      @change="onChange"
    />
    <label for="check">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  modelValue: boolean;
  label: string;
  onChange?: () => void;
};

type Emits = {
  (e: 'update:modelValue', value: boolean): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const value = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emits('update:modelValue', val),
});
</script>

<style>
.checkbox__wrapper {
  @apply input-group flex items-center gap-2 text-sm text-gray-500;
}

.checkbox__wrapper label {
  @apply lg:text-base;
}
</style>
