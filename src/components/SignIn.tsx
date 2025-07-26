import { useState } from 'react';
import { Music, Eye, EyeOff, LogIn } from 'lucide-react';
import { supabase } from '../utils/supabase.ts';

interface SignInProps {
  onSignIn: (userData: any) => void;
  onSwitchToSignUp: () => void;
}

// Leave necessary imports

export function SignIn() {
  return null;
}