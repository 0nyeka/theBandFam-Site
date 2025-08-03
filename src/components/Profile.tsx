import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
import { createConversation } from '../utils/supabase';
import { toast } from 'react-hot-toast';

