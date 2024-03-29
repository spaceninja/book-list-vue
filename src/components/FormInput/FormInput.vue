<template>
  <div
    class="form__group"
    :class="[
      $attrs.class,
      {
        'form__group--check': isCheckbox,
      },
    ]"
  >
    <label v-if="!isCheckbox" class="form__label" :for="uuid">
      {{ label }}
    </label>

    <span :class="{ 'form__input-group': prepend || append }">
      <span v-if="prepend" class="form__input-group-prepend">
        {{ prepend }}
      </span>

      <!--
        I don't like the duplicated attributes across these three, but there's a
        bug when using a dynamic component where the textarea doesn't update.
        @see https://github.com/vuejs/vue/issues/6154
      -->
      <textarea
        v-if="isTextarea"
        :id="uuid"
        :value="modelValue"
        class="form__control form__control--textarea"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <input
        v-else-if="isCheckbox"
        :id="uuid"
        :checked="modelValue"
        :type="type"
        class="form__checkbox-input"
        v-bind="$attrs"
        @change="$emit('update:modelValue', !modelValue)"
      />
      <input
        v-else
        :id="uuid"
        :value="modelValue"
        :type="type"
        class="form__control"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <span v-if="append" class="form__input-group-append">
        {{ append }}
      </span>
    </span>

    <label
      v-if="isCheckbox"
      class="form__label form__checkbox-label"
      :for="uuid"
    >
      {{ label }}
    </label>

    <small v-if="help" class="form__help">
      {{ help }}
    </small>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { computed } from 'vue';
import { getUUID } from '../../utils/helpers';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  prepend: {
    type: String,
    default: null,
  },
  append: {
    type: String,
    default: null,
  },
  help: {
    type: String,
    default: null,
  },
});

defineEmits(['update:modelValue']);

const isCheckbox = computed(() => {
  return props.type === 'checkbox';
});

const isTextarea = computed(() => {
  return props.type === 'textarea';
});

const uuid = computed(() => {
  return getUUID();
});
</script>

<style lang="scss">
@import './FormInput';
</style>
