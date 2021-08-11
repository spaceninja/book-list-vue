import { ref } from 'vue';
import { supabase } from '../lib/supabase';
import { store } from '../store';

const isLoading = ref(true);
const username = ref('');
const website = ref('');
const avatar_url = ref('');
const avatarBlob = ref('');
const isUploading = ref(false);

const getProfile = async () => {
  try {
    isLoading.value = true;
    store.user = supabase.auth.user();

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', store.user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      console.log('PROFILE DATA:', data);
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
};

const updateProfile = async () => {
  console.log('UPDATE PROFILE');
  try {
    isLoading.value = true;
    store.user = supabase.auth.user();

    const updates = {
      id: store.user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    console.log('UPDATES', updates);

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    });

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
};

const downloadImage = async (path) => {
  try {
    console.log('DOWNLOAD IMAGE', path);
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path);
    if (error) throw error;
    avatarBlob.value = URL.createObjectURL(data);
    console.log('DOWNLOADED IMAGE', avatarBlob.value);
  } catch (error) {
    console.error('Error downloading image: ', error.message);
  }
};

const uploadAvatar = async (event, emit) => {
  const files = event.target.files;
  console.log('UPLOAD AVATAR', event, emit, files);
  try {
    isUploading.value = true;
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;
    console.log('FILE PROCESSING', file, fileExt, fileName, filePath);

    let { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    console.log('UPLOAD RESULTS', data);
    avatar_url.value = filePath;
    emit('upload');
  } catch (error) {
    alert(error.message);
  } finally {
    isUploading.value = false;
  }
};

export {
  isLoading,
  username,
  website,
  avatar_url,
  avatarBlob,
  isUploading,
  getProfile,
  updateProfile,
  downloadImage,
  uploadAvatar,
};
