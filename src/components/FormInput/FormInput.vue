<template>
  <div
    class="form__group"
    :class="[
      $attrsClass,
      {
        'form__group--check': isCheckbox,
      },
    ]"
  >
    {{ $attrsNoClass }}

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
        v-bind="$attrsNoClass"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <input
        v-else-if="isCheckbox"
        :id="uuid"
        :checked="modelValue"
        :type="type"
        class="form__checkbox-input"
        v-bind="$attrsNoClass"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <input
        v-else
        :id="uuid"
        :value="modelValue"
        :type="type"
        class="form__control"
        v-bind="$attrsNoClass"
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
import { defineProps, defineEmits, computed, useAttrs } from 'vue';

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

/**
 * Generate a random UUID
 * This is total overkill, but I need a unique ID for each input component.
 * @see https://gist.github.com/jed/982883
 */
const getUUID = (a) => {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, getUUID);
};

const { class: attrsClass, ...attrsNoClass } = useAttrs();

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
