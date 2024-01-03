<template>
  <div class="form__group">
    <label class="form__label" :for="uuid">
      {{ label }}
    </label>
    <div class="tag-input">
      <input
        :id="uuid"
        v-model="newTag"
        class="form__control"
        type="text"
        :style="{ 'padding-inline-start': paddingInlineStart + 'px' }"
        @keydown.prevent.enter="addTag(newTag)"
        @keydown.delete="newTag.length || removeTag(tags.length - 1)"
      />
      <ul ref="tagsUl" class="tag-input__tag-list">
        <li v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
          {{ tag }}
          <button
            class="tag-input__delete"
            type="button"
            @click="removeTag(index)"
          >
            <span aria-hidden="true" class="button__icon">❌</span>
            <span class="sr-only">Delete</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {
  defineEmits,
  defineProps,
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
} from 'vue';
import { getUUID } from '../../utils/helpers';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const paddingInlineStart = ref(12);
const tagsUl = ref(null);
const tags = ref(props.modelValue);
const newTag = ref('');

const uuid = computed(() => {
  return getUUID();
});

const addTag = (tag) => {
  tags.value.push(tag);
  newTag.value = '';
};

const removeTag = (index) => {
  tags.value.splice(index, 1);
};

const onTagsChange = () => {
  const cushion = 12;
  paddingInlineStart.value = tagsUl.value.clientWidth + cushion;
  tagsUl.value.scrollTo(tagsUl.value.scrollWidth, 0);
  emit('update:modelValue', tags.value);
};

watch(tags, () => nextTick(onTagsChange), { deep: true });

onMounted(() => {
  onTagsChange();
  console.log('TagsInput Mounted', props.modelValue);
});
</script>

<style lang="scss">
@import './TagInput';
</style>
