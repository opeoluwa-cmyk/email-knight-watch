
import React from "react";
import { 
  Laptop, 
  Mail, 
  Shield, 
  User, 
  Trash2, 
  Lock, 
  FileText, 
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-knight-navy">Settings</h1>
        <p className="text-gray-500">Manage your email protection and application preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <div className="sticky top-0 z-10 bg-knight-gray pb-2">
          <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:w-fit">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="protection">Protection</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Email Knight looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 justify-start">
                    <Laptop className="mr-2 h-4 w-4" />
                    System Default
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="density">Interface Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="animations" defaultChecked />
                <Label htmlFor="animations">Enable animations</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phishing Protection</CardTitle>
              <CardDescription>Configure how phishing emails are detected and handled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Advanced Scanning</Label>
                  <p className="text-sm text-muted-foreground">Use AI to detect sophisticated phishing attempts</p>
                </div>
                <Switch id="advanced-scanning" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Link Protection</Label>
                  <p className="text-sm text-muted-foreground">Scan all links in emails for malicious content</p>
                </div>
                <Switch id="link-protection" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Attachment Scanning</Label>
                  <p className="text-sm text-muted-foreground">Scan attachments for malware and phishing</p>
                </div>
                <Switch id="attachment-scanning" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>When phishing is detected</Label>
                <RadioGroup defaultValue="alert">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alert" id="alert" />
                    <Label htmlFor="alert">Alert me but deliver the email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quarantine" id="quarantine" />
                    <Label htmlFor="quarantine">Move to quarantine folder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delete" id="delete" />
                    <Label htmlFor="delete">Delete the email automatically</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Services</CardTitle>
              <CardDescription>Manage your connected email services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="font-medium">john.doe@gmail.com</p>
                      <p className="text-xs text-muted-foreground">Gmail</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="font-medium">john.doe@outlook.com</p>
                      <p className="text-xs text-muted-foreground">Outlook</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </div>
              </div>
              
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Connect New Email
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and data settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Usage Statistics</Label>
                  <p className="text-sm text-muted-foreground">
                    Share anonymous usage data to help improve the service
                  </p>
                </div>
                <Switch id="usage-stats" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Content Analysis</Label>
                  <p className="text-sm text-muted-foreground">
                    Analyze email content to improve phishing detection
                  </p>
                </div>
                <Switch id="content-analysis" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Third-Party Integrations</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow integrations with third-party security services
                  </p>
                </div>
                <Switch id="third-party" />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Data Retention</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Email analysis data will be automatically deleted after this period
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export My Data
                </Button>
                <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete All Data
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scan-frequency">Scan Frequency</Label>
                <Select defaultValue="realtime">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sensitivity">Detection Sensitivity</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (may include false positives)</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="low">Low (fewer false positives)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep security definitions up to date automatically
                  </p>
                </div>
                <Switch id="auto-updates" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Advanced Heuristics</Label>
                  <p className="text-sm text-muted-foreground">
                    Use advanced pattern recognition to detect new threats
                  </p>
                </div>
                <Switch id="heuristics" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" value="••••••••••••••••••••••" readOnly />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for integrating with other security tools
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Logs
                </Button>
                <Button variant="outline" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                  <Shield className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
