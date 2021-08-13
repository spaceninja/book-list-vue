<template>
  <MainLayout>
    <ProfileEdit />
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/Main.vue';
import ProfileEdit from '../components/ProfileEdit.vue';

export default {
  components: {
    MainLayout,
    ProfileEdit,
  },
};
</script>
