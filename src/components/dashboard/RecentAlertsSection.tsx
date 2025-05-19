
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { AlertTriangle, Info } from "lucide-react";

interface Alert {
  id: number;
  title: string;
  source: string;
  time: string;
  severity: "high" | "medium" | "low";
}

interface RecentAlertsSectionProps {
  alerts: Alert[];
}

const RecentAlertsSection = ({ alerts }: RecentAlertsSectionProps) => {
  const severityColors = {
    high: "text-red-500 bg-red-50 border-red-200",
    medium: "text-amber-500 bg-amber-50 border-amber-200",
    low: "text-green-500 bg-green-50 border-green-200",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Latest security notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center p-3 rounded-lg border ${
                severityColors[alert.severity]
              }`}
            >
              {alert.severity === "high" ? (
                <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
              ) : (
                <Info className="h-5 w-5 mr-3 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {alert.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {alert.source}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {alert.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlertsSection;
