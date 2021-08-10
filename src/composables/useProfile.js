import { ref } from 'vue';
import { supabase } from '../lib/supabase';
import { store } from '../store';

const loading = ref(true);
const username = ref('');
const website = ref('');
const avatar_url = ref('');

async function getProfile() {
  try {
    loading.value = true;
    store.user = supabase.auth.user();

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', store.user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    store.user = supabase.auth.user();

    const updates = {
      id: store.user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    });

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

export { loading, username, website, avatar_url, getProfile, updateProfile };
