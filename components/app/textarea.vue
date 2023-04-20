<template>
  <div class="input-group" :class="class">
    <div
      class="flex items-center border p-2 rounded-lg bg-white"
      :class="[error && 'input--error', focus && 'border-color-1']"
    >
      <div class="flex-0 mr-3" v-if="$slots.left">
        <slot name="left" />
      </div>
      <textarea
        v-model="value"
        class="flex-1 text-xs outline-transparent lg:text-sm"
        @focus="focus = true"
        @blur="focus = false"
        rows="10"
        :placeholder="placeholder"
        height="50"
      />
      <div v-if="$slots.right">
        <slot name="right" />
      </div>
    </div>
    <div class="text-xs pt-1 text-red-500" v-if="error && errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  modelValue: string;
  placeholder?: string;
  error?: boolean | undefined;
  errorMessage?: string | undefined;
  class?: string | undefined;
  type?: 'text' | 'password' | 'email';
};

type Emits = {
  (e: 'update:modelValue', value: string): void;
};

const focus = ref(false);

const props = withDefaults(defineProps<Props>(), {
  error: false,
  type: 'text',
});

const emits = defineEmits<Emits>();
const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emits('update:modelValue', val),
});
</script>

<style scoped></style>
