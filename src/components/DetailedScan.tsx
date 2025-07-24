import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, AlertTriangle, CheckCircle, Info, Download, Share2, Eye, Volume2, Layers, Zap } from 'lucide-react';
import { Button } from './ui/button.tsx';
import { Card } from './ui/card.tsx';
import { Progress } from './ui/progress.tsx';
import { Badge } from './ui/badge.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.tsx';
import { HaloMascot } from './HaloMascot';
import { ImageWithFallback } from './figma/ImageWithFallback.tsx';

interface DetailedScanProps {
  onBack: () => void;
  filename: string;
  fileUrl: string;
  username: string;
}

interface AnalysisMetric {
  category: string;
  score: number;
  status: 'safe' | 'warning' | 'danger';
  details: string[];
  icon: React.ReactNode;
}

interface FrameAnalysis {
  timestamp: string;
  confidence: number;
  issues: string[];
  thumbnail: string;
}

export function DetailedScan({ onBack, filename, fileUrl, username }: DetailedScanProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing analysis...');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(0);

  // Simulate detailed analysis process
  useEffect(() => {
    const steps = [
      { step: 'Initializing analysis...', duration: 800 },
      { step: 'Extracting video frames...', duration: 1200 },
      { step: 'Analyzing facial features...', duration: 1500 },
      { step: 'Processing audio patterns...', duration: 1000 },
      { step: 'Detecting inconsistencies...', duration: 1300 },
      { step: 'Cross-referencing databases...', duration: 900 },
      { step: 'Generating detailed report...', duration: 700 },
      { step: 'Finalizing analysis...', duration: 600 }
    ];

    let currentStepIndex = 0;
    let currentProgress = 0;

    const runAnalysis = () => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setCurrentStep(step.step);
        
        const stepProgress = (currentStepIndex + 1) / steps.length * 100;
        const progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(Math.min(currentProgress, stepProgress));
          
          if (currentProgress >= stepProgress) {
            clearInterval(progressInterval);
            currentStepIndex++;
            setTimeout(runAnalysis, 100);
          }
        }, step.duration / 50);
      } else {
        setIsAnalyzing(false);
        setProgress(100);
        setCurrentStep('Analysis complete!');
      }
    };

    runAnalysis();
  }, []);

  // Mock detailed analysis results
  const overallConfidence = 87;
  const analysisMetrics: AnalysisMetric[] = [
    {
      category: 'Facial Analysis',
      score: 92,
      status: 'danger',
      details: [
        'Inconsistent lighting on face edges',
        'Temporal flickering detected',
        'Mouth movements don\'t match audio',
        'Eye blink patterns are unnatural'
      ],
      icon: <Eye className="w-4 h-4" />
    },
    {
      category: 'Audio Analysis',
      score: 78,
      status: 'warning',
      details: [
        'Voice pitch inconsistencies',
        'Background noise artifacts',
        'Possible voice cloning markers',
        'Audio quality degradation'
      ],
      icon: <Volume2 className="w-4 h-4" />
    },
    {
      category: 'Technical Metadata',
      score: 65,
      status: 'warning',
      details: [
        'Multiple encoding passes detected',
        'Timestamp inconsistencies',
        'Missing camera metadata',
        'Unusual compression artifacts'
      ],
      icon: <Layers className="w-4 h-4" />
    },
    {
      category: 'Content Analysis',
      score: 45,
      status: 'safe',
      details: [
        'Scene context appears normal',
        'No duplicate background elements',
        'Consistent lighting environment',
        'Natural object interactions'
      ],
      icon: <Zap className="w-4 h-4" />
    }
  ];

  const frameAnalysis: FrameAnalysis[] = [
    {
      timestamp: '0:02',
      confidence: 95,
      issues: ['Face boundary inconsistency', 'Lighting mismatch'],
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=60&fit=crop'
    },
    {
      timestamp: '0:08',
      confidence: 88,
      issues: ['Mouth movement sync issues'],
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=60&fit=crop'
    },
    {
      timestamp: '0:15',
      confidence: 92,
      issues: ['Eye blink pattern unnatural', 'Temporal flickering'],
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=60&fit=crop'
    },
    {
      timestamp: '0:23',
      confidence: 79,
      issues: ['Audio-visual desync'],
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=60&fit=crop'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'danger': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'danger': return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Detailed Analysis</h1>
            <div className="w-9" />
          </div>

          <Card className="p-6 mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                <HaloMascot mood="scanning" size="sm" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Analyzing Video</h2>
              <p className="text-sm text-gray-600 mb-4">
                Running comprehensive AI detection analysis
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-semibold">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-gray-600">{currentStep}</p>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{filename}</h3>
                <p className="text-sm text-gray-600">Uploaded by {username}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md mx-auto pb-4">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Detailed Report</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          {/* Overall Result */}
          <Card className="p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full">
                <HaloMascot mood="alert" size="sm" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-red-700">AI-Generated Content Detected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Confidence Level:</span>
                  <Badge variant="destructive">{overallConfidence}%</Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Multiple AI manipulation indicators detected. This video shows signs of facial deepfake technology and audio synthesis.
            </p>
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Content
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Learn More
              </Button>
            </div>
          </Card>

          {/* Video Preview */}
          <Card className="p-4 mb-6">
            <div className="aspect-video bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop"
                alt="Video preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{filename}</span>
              <span className="text-xs text-gray-500">2:34 duration</span>
            </div>
          </Card>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="metrics" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metrics">Analysis</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-4">
              {analysisMetrics.map((metric, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(metric.status)}`}>
                      {metric.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{metric.category}</h3>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(metric.status)}
                          <span className="text-sm font-medium">{metric.score}%</span>
                        </div>
                      </div>
                      <Progress value={metric.score} className="h-2 mb-3" />
                      <ul className="space-y-1">
                        {metric.details.map((detail, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="space-y-3">
                {frameAnalysis.map((frame, index) => (
                  <Card 
                    key={index} 
                    className={`p-3 cursor-pointer transition-all ${selectedFrame === index ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedFrame(index)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden">
                        <ImageWithFallback
                          src={frame.thumbnail}
                          alt={`Frame at ${frame.timestamp}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{frame.timestamp}</span>
                          <Badge variant={frame.confidence > 85 ? "destructive" : "secondary"}>
                            {frame.confidence}%
                          </Badge>
                        </div>
                        <ul className="space-y-1">
                          {frame.issues.map((issue, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-start">
                              <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">File Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span>MP4 (H.264)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resolution:</span>
                    <span>1920x1080</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>2:34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frame Rate:</span>
                    <span>30 fps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">File Size:</span>
                    <span>45.2 MB</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">Detection Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Facial landmark analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Temporal consistency check</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Audio-visual synchronization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Compression artifact analysis</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">Recommendations</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>Do not share this content as authentic</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>Report to platform moderators</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>Verify source and context before believing</span>
                  </li>
                </ul>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}