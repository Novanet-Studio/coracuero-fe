<template>
  <div class="input-group" :class="class">
    <input
      class="input bg-[#F7F4F4] text-xs md:text-sm lg:text-base"
      :class="isError && 'input--error'"
      :type="type"
      v-model="value"
      :placeholder="placeholder"
      height="50"
    />
    <div class="input__error" v-if="isError && errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  modelValue: string;
  placeholder?: string;
  isError?: boolean | undefined;
  errorMessage?: string | undefined;
  class?: string | undefined;
  type?: 'text' | 'password' | 'email' | 'date' | 'number';
};

type Emits = {
  (e: 'update:modelValue', value: string): void;
};

const props = withDefaults(defineProps<Props>(), {
  isError: false,
  type: 'text',
});

const emits = defineEmits<Emits>();
const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emits('update:modelValue', val),
});
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-xl p-4 focus:border-yellow-400 outline-transparent md:p-3;
}

.input--error {
  @apply border-red-500;
}

.input-group {
  @apply py-3 pt-2 md:py-2 first:mb-4;
}

.input__error {
  @apply pt-3 text-red-500 text-xs md:text-sm lg:text-base;
}
</style>
