
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SecurityStatusSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Status</CardTitle>
        <CardDescription>Your current security performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Phishing Protection</div>
              <div className="text-sm text-muted-foreground">98%</div>
            </div>
            <Progress value={98} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Malware Detection</div>
              <div className="text-sm text-muted-foreground">85%</div>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Account Security</div>
              <div className="text-sm text-muted-foreground">92%</div>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityStatusSection;
