import { supabase } from './supabase';

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/avatar.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });
  
  if (uploadError) {
    return { data: null, error: uploadError };
  }
  
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);
  
  // Update user profile with avatar URL
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: data.publicUrl })
    .eq('id', userId);
  
  return { 
    data: data.publicUrl, 
    error: updateError 
  };
}

export async function uploadProjectFile(projectId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${projectId}/${fileName}`;
  
  const { error, data } = await supabase.storage
    .from('projects')
    .upload(filePath, file);
  
  if (error) {
    return { data: null, error };
  }
  
  const { data: urlData } = supabase.storage
    .from('projects')
    .getPublicUrl(filePath);
  
  return { data: urlData.publicUrl, error: null };
}

export async function deleteFile(bucket: 'avatars' | 'projects', path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  return { error };
}