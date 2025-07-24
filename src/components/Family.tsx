import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Badge } from './ui/badge.tsx';
import { Switch } from './ui/switch.tsx';
import { 
  Users, 
  Plus, 
  Shield, 
  Smartphone, 
  Laptop, 
  Tablet,
  QrCode,
  AlertTriangle,
  Check,
  Settings as SettingsIcon
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'phone' | 'tablet' | 'laptop';
  owner: string;
  status: 'active' | 'inactive';
  riskyVideos: number;
  lastSeen: string;
  avatar: string;
  permissions: {
    monitoring: boolean;
    scanning: boolean;
    alerts: boolean;
  };
}

interface FamilyProps {
  username: string;
}

export function Family({ username }: FamilyProps) {
  const [viewMode, setViewMode] = useState<'personal' | 'family'>('personal');
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'iPhone 14',
      type: 'phone',
      owner: username,
      status: 'active',
      riskyVideos: 3,
      lastSeen: 'Now',
      avatar: '👤',
      permissions: {
        monitoring: true,
        scanning: true,
        alerts: true
      }
    },
    {
      id: '2',
      name: 'Emma\'s iPad',
      type: 'tablet',
      owner: 'Emma',
      status: 'active',
      riskyVideos: 1,
      lastSeen: '5 min ago',
      avatar: '👧',
      permissions: {
        monitoring: true,
        scanning: false,
        alerts: true
      }
    },
    {
      id: '3',
      name: 'MacBook Pro',
      type: 'laptop',
      owner: 'Alex',
      status: 'inactive',
      riskyVideos: 0,
      lastSeen: '2 hours ago',
      avatar: '👦',
      permissions: {
        monitoring: false,
        scanning: true,
        alerts: false
      }
    }
  ]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'phone': return Smartphone;
      case 'tablet': return Tablet;
      case 'laptop': return Laptop;
      default: return Smartphone;
    }
  };

  const togglePermission = (deviceId: string, permission: keyof Device['permissions']) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? {
            ...device,
            permissions: {
              ...device.permissions,
              [permission]: !device.permissions[permission]
            }
          }
        : device
    ));
  };

  const personalStats = {
    videosChecked: 127,
    fakeVideos: 8,
    appsMonitored: 3
  };

  const familyStats = {
    totalDevices: devices.length,
    activeDevices: devices.filter(d => d.status === 'active').length,
    totalRiskyVideos: devices.reduce((sum, d) => sum + d.riskyVideos, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-20">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="px-6 pt-12 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-blue-800">Family Protection</h1>
              <p className="text-blue-600 font-medium">Keep everyone safe together</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setViewMode('personal')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                viewMode === 'personal'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Just Me
            </button>
            <button
              onClick={() => setViewMode('family')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                viewMode === 'family'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All Devices
            </button>
          </div>
        </div>

        <div className="px-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            {viewMode === 'personal' ? (
              <>
                <Card className="border-2 border-blue-200 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {personalStats.videosChecked}
                    </div>
                    <p className="text-xs text-blue-800 font-medium">Videos Checked</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-red-200 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-red-600 mb-1">
                      {personalStats.fakeVideos}
                    </div>
                    <p className="text-xs text-red-800 font-medium">Fake Videos</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-green-200 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      {personalStats.appsMonitored}
                    </div>
                    <p className="text-xs text-green-800 font-medium">Apps Monitored</p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card className="border-2 border-blue-200 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {familyStats.totalDevices}
                    </div>
                    <p className="text-xs text-blue-800 font-medium">Total Devices</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-green-200 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-green-600 mb-1">
                      {familyStats.activeDevices}
                    </div>
                    <p className="text-xs text-green-800 font-medium">Active Now</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-orange-200 shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-orange-600 mb-1">
                      {familyStats.totalRiskyVideos}
                    </div>
                    <p className="text-xs text-orange-800 font-medium">Risky Videos</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Add Device Card */}
          {viewMode === 'family' && (
            <Card className="border-2 border-purple-200 shadow-sm bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-purple-800">Add New Device</p>
                      <p className="text-sm text-purple-600">Invite family member</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                    <QrCode className="h-4 w-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Device List */}
          <div className="space-y-4">
            {viewMode === 'personal' ? (
              // Personal View - Show only current user's device
              <Card className="border-2 border-blue-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">This Device</p>
                        <p className="text-sm text-gray-600">iPhone 14 • Active</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Protected
                          </Badge>
                          <span className="text-xs text-gray-500">3 risky videos today</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <SettingsIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Family View - Show all devices
              devices.map((device) => {
                const DeviceIcon = getDeviceIcon(device.type);
                return (
                  <Card key={device.id} className="border-2 border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                            <DeviceIcon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{device.name}</p>
                            <p className="text-sm text-gray-600">{device.owner}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${
                                  device.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {device.status === 'active' ? (
                                  <Check className="h-3 w-3 mr-1" />
                                ) : (
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                )}
                                {device.status}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {device.riskyVideos} risky videos • {device.lastSeen}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl">{device.avatar}</div>
                      </div>

                      {/* Device Permissions */}
                      <div className="space-y-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Monitoring</span>
                          <Switch
                            checked={device.permissions.monitoring}
                            onCheckedChange={() => togglePermission(device.id, 'monitoring')}
                            className="data-[state=checked]:bg-blue-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Scan Access</span>
                          <Switch
                            checked={device.permissions.scanning}
                            onCheckedChange={() => togglePermission(device.id, 'scanning')}
                            className="data-[state=checked]:bg-blue-500"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Alerts</span>
                          <Switch
                            checked={device.permissions.alerts}
                            onCheckedChange={() => togglePermission(device.id, 'alerts')}
                            className="data-[state=checked]:bg-blue-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Family Safety Tips */}
          <Card className="border-2 border-green-200 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-green-800">Family Safety Tips</span>
              </div>
              
              <div className="space-y-2 text-sm text-green-700">
                <p>• Talk openly about what you find online</p>
                <p>• Set up regular check-ins with family members</p>
                <p>• Encourage reporting suspicious content</p>
                <p>• Review privacy settings together</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}