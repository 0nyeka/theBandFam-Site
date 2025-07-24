import { useState } from 'react';
import { Card, CardContent } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Shield, Star, Sparkles, CheckCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: (username: string) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [username, setUsername] = useState('');

  const steps = [
    {
      title: "Welcome to HaloScan! 🛡️",
      subtitle: "Your Super Shield Against Fake Videos",
      content: (
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <p className="text-lg text-muted-foreground">
            Hi there! HaloScan helps keep you safe by finding videos that aren't real.
          </p>
        </div>
      )
    },
    {
      title: "What Does HaloScan Do? 🤖",
      subtitle: "We Find Fake Videos So You Don't Have To!",
      content: (
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Watches Your Videos</h4>
              <p className="text-sm text-muted-foreground">
                We check TikTok, YouTube, and Instagram for fake videos
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Tells You What's Real</h4>
              <p className="text-sm text-muted-foreground">
                We let you know if a video was made by a computer
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Keeps You Safe</h4>
              <p className="text-sm text-muted-foreground">
                We help you spot fake videos before you share them
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "What Should We Call You? 👋",
      subtitle: "Pick a Fun Username!",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Choose a username so we can personalize your experience!
            </p>
            <Input
              placeholder="Enter your username (like SuperDetective123)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-center text-lg h-12"
            />
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Privacy Note:</strong> We only use your username to make the app more fun. We never share your information with anyone!
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(username || 'SuperUser');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardContent className="p-8">
            {/* Progress dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-blue-500'
                      : index < currentStep
                      ? 'bg-blue-300'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-2xl font-bold text-foreground">
                {steps[currentStep].title}
              </h1>
              <p className="text-blue-600 font-medium">
                {steps[currentStep].subtitle}
              </p>
              <div className="pt-4">
                {steps[currentStep].content}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-6"
              >
                Back
              </Button>
              
              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1 && !username.trim()}
                className="px-6 bg-blue-500 hover:bg-blue-600"
              >
                {currentStep === steps.length - 1 ? "Let's Go!" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}