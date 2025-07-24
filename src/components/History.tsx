import { useState } from 'react';
import { ArrowLeft, Eye, MoreVertical, Clock, AlertTriangle, CheckCircle, FileText, Search } from 'lucide-react';
import { Button } from './ui/button.tsx';
import { Card } from './ui/card.tsx';
import { Badge } from './ui/badge.tsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.tsx';
import { HaloMascot } from './HaloMascot.tsx';
import { DetailedScan } from './DetailedScan.tsx';

interface Detection {
  id: string;
  app: string;
  appIcon: string;
  gradient: string;
  confidence: number;
  timestamp: string;
  description: string;
  status: 'ai-detected' | 'human-verified';
  scanType?: 'quick' | 'detailed';
  filename?: string;
}

interface HistoryProps {
  onBack: () => void;
  detections: Detection[];
  onUpdateDetection: (id: string, updates: Partial<Detection>) => void;
  username: string;
}

export function History({ onBack, detections, onUpdateDetection, username }: HistoryProps) {
  const [selectedDetection, setSelectedDetection] = useState<Detection | null>(null);
  const [showDetailedReport, setShowDetailedReport] = useState(false);

  const handleViewDetailed = (detection: Detection) => {
    setSelectedDetection(detection);
    setShowDetailedReport(true);
  };

  const handleMarkAsVerified = (id: string) => {
    onUpdateDetection(id, { status: 'human-verified' });
  };

  const filterDetections = (type: string) => {
    switch (type) {
      case 'ai':
        return detections.filter(d => d.status === 'ai-detected');
      case 'verified':
        return detections.filter(d => d.status === 'human-verified');
      case 'detailed':
        return detections.filter(d => d.scanType === 'detailed');
      default:
        return detections;
    }
  };

  if (showDetailedReport && selectedDetection) {
    // Create mock file URL for detailed scan
    const mockFileUrl = selectedDetection.filename 
      ? `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop`
      : '';
    
    return (
      <DetailedScan
        onBack={() => setShowDetailedReport(false)}
        filename={selectedDetection.filename || `${selectedDetection.app}_content.mp4`}
        fileUrl={mockFileUrl}
        username={username}
      />
    );
  }

  const aiDetections = filterDetections('ai');
  const verifiedDetections = filterDetections('verified');
  const detailedScans = filterDetections('detailed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Detection History</h1>
          <div className="w-9" />
        </div>

        <div className="p-4">
          {/* Stats Card */}
          <Card className="p-6 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{detections.length}</div>
                <div className="text-sm opacity-90">Total Scans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{aiDetections.length}</div>
                <div className="text-sm opacity-90">AI Detected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{detailedScans.length}</div>
                <div className="text-sm opacity-90">Detailed</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <HaloMascot mood="happy" size="sm" />
              <span className="text-sm">Great job staying protected, {username}!</span>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="ai">AI Found</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {detections.length === 0 ? (
                <Card className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-2">No Detections Yet</h3>
                  <p className="text-sm text-gray-600">
                    Your scan history will appear here once you start using the app
                  </p>
                </Card>
              ) : (
                detections.map((detection) => (
                  <Card key={detection.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${detection.gradient} flex items-center justify-center text-white font-semibold`}>
                        {detection.appIcon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-semibold text-sm">{detection.app}</h3>
                            <p className="text-xs text-gray-500">{detection.timestamp}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={detection.status === 'ai-detected' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {detection.confidence}%
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="p-1">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {detection.scanType === 'detailed' && (
                                  <DropdownMenuItem onClick={() => handleViewDetailed(detection)}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Detailed Report
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => handleMarkAsVerified(detection.id)}>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Verified
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{detection.description}</p>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            {detection.status === 'ai-detected' ? (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            <span className="text-xs text-gray-500">
                              {detection.status === 'ai-detected' ? 'AI Detected' : 'Verified Safe'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {detection.scanType === 'detailed' ? (
                              <FileText className="w-4 h-4 text-blue-500" />
                            ) : (
                              <Search className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="text-xs text-gray-500">
                              {detection.scanType === 'detailed' ? 'Detailed' : 'Quick'} Scan
                            </span>
                          </div>
                          {detection.filename && (
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4 text-purple-500" />
                              <span className="text-xs text-gray-500">Upload</span>
                            </div>
                          )}
                        </div>
                        {detection.scanType === 'detailed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-full"
                            onClick={() => handleViewDetailed(detection)}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Detailed Report
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="ai" className="space-y-3">
              {aiDetections.map((detection) => (
                <Card key={detection.id} className="p-4 border-red-200">
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${detection.gradient} flex items-center justify-center text-white font-semibold`}>
                      {detection.appIcon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-semibold text-sm">{detection.app}</h3>
                          <p className="text-xs text-gray-500">{detection.timestamp}</p>
                        </div>
                        <Badge variant="destructive" className="text-xs">
                          {detection.confidence}%
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{detection.description}</p>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-xs text-red-600">High Risk Content</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="detailed" className="space-y-3">
              {detailedScans.map((detection) => (
                <Card key={detection.id} className="p-4 border-purple-200">
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${detection.gradient} flex items-center justify-center text-white font-semibold`}>
                      {detection.appIcon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-semibold text-sm">{detection.filename || detection.app}</h3>
                          <p className="text-xs text-gray-500">{detection.timestamp}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Detailed
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{detection.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleViewDetailed(detection)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Full Report
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="verified" className="space-y-3">
              {verifiedDetections.map((detection) => (
                <Card key={detection.id} className="p-4 border-green-200">
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${detection.gradient} flex items-center justify-center text-white font-semibold`}>
                      {detection.appIcon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-semibold text-sm">{detection.app}</h3>
                          <p className="text-xs text-gray-500">{detection.timestamp}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{detection.description}</p>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600">Human Verified</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}