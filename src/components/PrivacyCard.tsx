import { Card, CardContent } from './ui/card.tsx';
import { Shield, Lock, Eye, Heart } from 'lucide-react';

export function PrivacyCard() {
  return (
    <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-green-800">Your Privacy is Safe! 🛡️</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Lock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-700">
              <strong>We don't store your videos.</strong> Scans happen privately and disappear after.
            </p>
          </div>
          
          <div className="flex items-start space-x-2">
            <Eye className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-700">
              <strong>We don't track you.</strong> No ads. Just safety.
            </p>
          </div>
          
          <div className="flex items-start space-x-2">
            <Heart className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-700">
              <strong>Made for kids.</strong> Simple, safe, and fun to use.
            </p>
          </div>
        </div>
        
        <div className="mt-3 p-2 bg-green-100 rounded-lg">
          <p className="text-xs text-green-800 text-center">
            ✨ Parents: Your child's safety and privacy are our top priority ✨
          </p>
        </div>
      </CardContent>
    </Card>
  );
}