// Leave necessary imports
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx';
import { Badge } from './ui/badge.tsx';
import { Skeleton } from './ui/skeleton.tsx';
import { 
  Send, 
  MessageCircle, 
  User, 
  Users, 
  ArrowLeft
} from 'lucide-react';
import { supabase } from '../utils/supabase.ts';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

