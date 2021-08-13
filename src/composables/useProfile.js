import { ref } from 'vue';
import { supabase } from '../lib/supabase';
import { userSession } from '../composables/useAuth';

export const isLoading = ref(true);
export const isUploading = ref(false);
export const username = ref('');
export const website = ref('');
export const avatar_url = ref('');
export const avatarBlob = ref('');

/**
 * Get Profile
 *
 * Gets the profile information for the current user.
 *
 * @see https://supabase.io/docs/reference/javascript/select
 * @see https://supabase.io/docs/reference/javascript/eq
 * @see https://supabase.io/docs/reference/javascript/single
 *
 */
export const getProfile = async () => {
  try {
    isLoading.value = true;
    userSession.user = supabase.auth.user();
    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', userSession.user.id)
      .single();
    if (error && status !== 406) throw error;
    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Update Profile
 *
 * Updates the profile information for the current user.
 *
 * @see https://supabase.io/docs/reference/javascript/upsert
 */
export const updateProfile = async () => {
  try {
    isLoading.value = true;
    userSession.user = supabase.auth.user();
    const updates = {
      id: userSession.user.id,
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
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Download Avatar
 *
 * Downloads the avatar for the current user.
 *
 * @see https://supabase.io/docs/reference/javascript/storage-from-download
 *
 * @param {string} path - The file path to be downloaded
 */
export const downloadAvatar = async (path) => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path);
    if (error) throw error;
    avatarBlob.value = URL.createObjectURL(data);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Upload Avatar
 *
 * Uploads an avatar for the current user.
 *
 * @see https://supabase.io/docs/reference/javascript/storage-from-upload
 *
 * @param {Event} event
 * @param {function} emit - Vue emit function
 */
export const uploadAvatar = async (event, emit) => {
  const files = event.target.files;
  try {
    isUploading.value = true;
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.');
    }
    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    let { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);
    if (error) throw error;
    avatar_url.value = filePath;
    emit('upload');
  } catch (error) {
    alert(error.message);
  } finally {
    isUploading.value = false;
  }
};
