<template>
  <div class="input-group" :class="class">
    <div
      class="flex items-center bg-white p-2 rounded-xl md:p-3 lg:p-4"
      :class="[error && 'input--error', focus && 'ring-2 ring-color-1']"
    >
      <div class="flex-0 mr-3" v-if="$slots.left">
        <slot name="left" />
      </div>
      <input
        class="flex-1 outline-none text-xs md:text-sm"
        :type="type"
        v-model="value"
        @focus="focus = true"
        @blur="focus = false"
        :placeholder="placeholder"
        height="50"
      />
      <div v-if="$slots.right">
        <slot name="right" />
      </div>
    </div>
    <div class="">
      <div class="text-xs pt-1 text-red-500" v-if="error && errorMessage">
        {{ errorMessage }}
      </div>
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
