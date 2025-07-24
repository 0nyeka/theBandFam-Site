import { supabase } from '../utils/supabase';


// Profile functions
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
}

export async function updateProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
  
  return { data, error };
}

export async function createProfile(profile: any) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile]);
  
  return { data, error };
}

// Project functions
export async function getProjects(filters = {}) {
  let query = supabase
    .from('projects')
    .select('*, owner:profiles(id, username, avatar_url)');
  
  // Apply any filters
  Object.entries(filters).forEach(([key, value]) => {
    query = query.eq(key, value);
  });
  
  const { data, error } = await query;
  return { data, error };
}

export async function getProjectById(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      owner:profiles(id, username, avatar_url),
      members:project_members(
        profile:profiles(id, username, avatar_url),
        role
      )
    `)
    .eq('id', projectId)
    .single();
  
  return { data, error };
}

export async function createProject(project: any) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project]);
  
  return { data, error };
}

export async function updateProject(projectId: string, updates: any) {
  const { data, error } = await supabase
    .from('projects')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId);
  
  return { data, error };
}

export async function deleteProject(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);
  
  return { data, error };
}