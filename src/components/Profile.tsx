import React, { useEffect, useState } from 'react';
import { Button } from './ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.tsx';
import { Badge } from './ui/badge.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.tsx';
import { 
  MapPin, 
  Users, 
  Play, 
  Settings, 
  Star,
  Music,
  Calendar,
  Award,
  Headphones,
  Video,
  MessageCircle,
  UserPlus
} from 'lucide-react';
import { createConversation } from '../utils/supabase.ts';
import { toast } from 'react-hot-toast';

