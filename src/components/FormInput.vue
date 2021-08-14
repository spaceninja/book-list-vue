<template>
  <div
    class="form__group"
    :class="{
      'form__group--check': isCheckbox,
    }"
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
        @input="$emit('update:modelValue', $event.target.value)"
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
import { defineProps, defineEmits, computed } from 'vue';

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

<style>
/* .form {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr;
  margin: 1em auto;

  @media only screen and (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.form__group--doublewide {
  @media only screen and (min-width: 640px) {
    grid-column-end: span 2;
  }
}

.form__control {
  background: var(--color-input-bg);
  border: 1px solid var(--color-input-border);
  border-radius: 0.25em;
  color: currentColor;
  display: block;
  font-size: 16px;
  padding: 0.375em 0.75em;
  width: 100%;
}

select {
  font-size: 16px;
}

.form__group--check {
  align-items: center;
  display: flex;
}

.form__checkbox-input {
  flex: none;
}

.form__checkbox-label {
  flex: 1;
  margin-left: 0.375em;
}

.form__input-group {
  display: flex;
}

.form__input-group:first-child {
  border-bottom-left-radius: 0.25em;
  border-top-left-radius: 0.25em;
}

.form__input-group:last-child {
  border-bottom-right-radius: 0.25em;
  border-top-right-radius: 0.25em;
}

.form__input-group .form__control {
  border-radius: 0;
  flex: 1;
}

.form__input-group-prepend,
.form__input-group-append {
  background: var(--color-input-append-bg);
  border: 1px solid var(--color-input-border);
  flex: none;
  padding: 0.375em 0.75em;
}

.form__input-group-prepend {
  border-right: 0;
}

.form__input-group-append {
  border-left: 0;
} */
</style>
