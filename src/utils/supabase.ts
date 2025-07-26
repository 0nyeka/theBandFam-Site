import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData // This will be stored in user metadata
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Start a conversation between two users
export const createConversation = async (currentUserId: string, otherUserId: string) => {
  try {
    // Check if conversation already exists
    const { data: existingConversations } = await supabase
      .from('conversation_participants')
      .select(`
        conversation_id,
        conversations(
          conversation_participants(user_id)
        )
      `)
      .eq('user_id', currentUserId);
      
    const existingConversation = existingConversations?.find(convo => {
      const participants = convo.conversations;
      return participants.some((p: any) => p.user_id === otherUserId);
    });
    
    if (existingConversation) {
      return { conversationId: existingConversation.conversation_id };
    }
    
    // Create a new conversation
    const { data: newConversation, error: conversationError } = await supabase
      .from('conversations')
      .insert({})
      .select();
      
    if (conversationError) throw conversationError;
    
    const conversationId = newConversation[0].id;
    
    // Add participants
    const { error: participantsError } = await supabase
      .from('conversation_participants')
      .insert([
        { conversation_id: conversationId, user_id: currentUserId },
        { conversation_id: conversationId, user_id: otherUserId }
      ]);
      
    if (participantsError) throw participantsError;
    
    return { conversationId };
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (
  conversationId: string, 
  senderId: string, 
  content: string,
  attachment?: {
    type: 'image' | 'audio' | 'file';
    url: string;
    name?: string;
  }
) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        attachment: attachment || null
      })
      .select();
      
    if (error) throw error;
    
    return { message: data[0] };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Mark a conversation as read
export const markConversationAsRead = async (conversationId: string, userId: string) => {
  try {
    const { error } = await supabase
      .from('conversation_participants')
      .update({ last_read: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('user_id', userId);
      
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error marking conversation as read:', error);
    throw error;
  }
};

