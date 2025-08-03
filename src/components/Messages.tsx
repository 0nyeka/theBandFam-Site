// Leave necessary imports
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { 
  Send, 
  MessageCircle, 
  User, 
  Users, 
  ArrowLeft
} from 'lucide-react';
import { supabase } from '../utils/supabase';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

