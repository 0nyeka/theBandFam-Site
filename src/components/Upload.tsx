import { useState, useRef } from 'react';
import { ArrowLeft, Upload as UploadIcon, Camera, Play, X, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { Button } from './ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { Badge } from './ui/badge.tsx';
import { Progress } from './ui/progress.tsx';
import { toast } from 'sonner';
import { HaloMascot } from './HaloMascot.tsx';
import { ImageWithFallback } from './figma/ImageWithFallback.tsx';
import { DetailedScan } from './DetailedScan.tsx';

interface UploadProps {
  onBack: () => void;
  username: string;
  onAddDetection: (detection: any) => void;
}

type ScanType = 'quick' | 'detailed';

export function Upload({ onBack, username, onAddDetection }: UploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanType, setScanType] = useState<ScanType>('quick');
  const [showDetailedScan, setShowDetailedScan] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast.error('File too large', {
          description: 'Please select a file smaller than 100MB',
        });
        return;
      }

      setSelectedFile(file);
      
      // Create preview for video/image
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (!selectedFile) return;

    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);

    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Generate mock result
          const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
          const isAI = confidence > 80;
          
          const result = {
            confidence,
            isAI,
            filename: selectedFile.name,
            analysisTime: '2.3 seconds',
            details: isAI ? [
              'Facial inconsistencies detected',
              'Temporal artifacts found',
              'Audio-visual mismatch'
            ] : [
              'No manipulation detected',
              'Consistent facial features',
              'Natural video patterns'
            ]
          };
          
          setScanResult(result);
          
          // Add to detections if AI detected
          if (isAI) {
            const detection = {
              id: Date.now().toString(),
              app: 'Manual Upload',
              appIcon: 'M',
              gradient: 'from-blue-500 to-purple-600',
              confidence,
              timestamp: 'Just now',
              description: 'AI-generated content detected in uploaded file',
              status: 'ai-detected' as const
            };
            
            onAddDetection(detection);
          }
          
          return 100;
        }
        return prev + 2;
      });
    }, scanType === 'quick' ? 40 : 80);
  };

  const handleDetailedScan = () => {
    if (!selectedFile || !filePreview) return;
    setShowDetailedScan(true);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setScanResult(null);
    setScanProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (showDetailedScan && selectedFile && filePreview) {
    return (
      <DetailedScan
        onBack={() => setShowDetailedScan(false)}
        filename={selectedFile.name}
        fileUrl={filePreview}
        username={username}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Upload & Scan</h1>
          <div className="w-9" />
        </div>

        <div className="p-4 space-y-6">
          {/* Scan Type Selection */}
          <Card className="p-4">
            <h2 className="font-semibold mb-3">Scan Type</h2>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={scanType === 'quick' ? 'default' : 'outline'}
                onClick={() => setScanType('quick')}
                className="flex flex-col items-center p-4 h-auto"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <Search className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Quick Scan</span>
                <span className="text-xs text-gray-500 mt-1">~2 seconds</span>
              </Button>
              <Button
                variant={scanType === 'detailed' ? 'default' : 'outline'}
                onClick={() => setScanType('detailed')}
                className="flex flex-col items-center p-4 h-auto"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <AlertTriangle className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Detailed Scan</span>
                <span className="text-xs text-gray-500 mt-1">~30 seconds</span>
              </Button>
            </div>
          </Card>

          {/* File Upload Area */}
          <Card className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                <HaloMascot mood="happy" size="sm" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Upload Content</h2>
              <p className="text-sm text-gray-600 mb-4">
                Select a video or image to analyze for AI manipulation
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="space-y-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                  disabled={isScanning}
                >
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isScanning}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          </Card>

          {/* File Preview */}
          {selectedFile && filePreview && (
            <Card className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  {selectedFile.type.startsWith('video/') ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <ImageWithFallback
                      src={filePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm">{selectedFile.name}</h3>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFile}
                      className="p-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Scan Controls */}
          {selectedFile && !scanResult && (
            <Card className="p-4">
              <div className="space-y-3">
                {scanType === 'quick' ? (
                  <Button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="w-full"
                  >
                    {isScanning ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Quick Scan
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleDetailedScan}
                    disabled={isScanning}
                    className="w-full"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Detailed Analysis
                  </Button>
                )}
                
                {isScanning && (
                  <div className="space-y-2">
                    <Progress value={scanProgress} className="h-2" />
                    <p className="text-sm text-center text-gray-600">
                      Analyzing content... {scanProgress}%
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Quick Scan Results */}
          {scanResult && scanType === 'quick' && (
            <Card className="p-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full">
                  <HaloMascot mood={scanResult.isAI ? "alert" : "happy"} size="sm" />
                </div>
                
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {scanResult.isAI ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <span className={`font-semibold ${scanResult.isAI ? 'text-red-700' : 'text-green-700'}`}>
                    {scanResult.isAI ? 'AI Content Detected' : 'No AI Detected'}
                  </span>
                </div>
                
                <Badge 
                  variant={scanResult.isAI ? "destructive" : "default"}
                  className="mb-4"
                >
                  {scanResult.confidence}% Confidence
                </Badge>
                
                <div className="space-y-2 mb-4">
                  {scanResult.details.map((detail: string, index: number) => (
                    <div key={index} className="flex items-start text-sm">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={handleDetailedScan}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Detailed Analysis
                  </Button>
                  <Button
                    onClick={clearFile}
                    size="sm"
                    className="flex-1"
                  >
                    Scan Another
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Tips */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="font-semibold mb-2">💡 Scanning Tips</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Higher quality files provide better detection accuracy</li>
              <li>• Detailed scans offer comprehensive frame-by-frame analysis</li>
              <li>• Both video and image files are supported</li>
              <li>• Results are processed locally for privacy</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}