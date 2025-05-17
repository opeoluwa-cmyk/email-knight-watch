
import React from "react";
import { 
  AlertTriangle, 
  Shield, 
  Check, 
  Mail, 
  Info 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const statCards = [
  {
    title: "Scanned Emails",
    value: "14,523",
    description: "Total emails scanned",
    icon: <Mail className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-500",
  },
  {
    title: "Threats Detected",
    value: "27",
    description: "Phishing attempts blocked",
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "bg-red-100 text-red-500",
  },
  {
    title: "Protection Score",
    value: "92%",
    description: "Your security rating",
    icon: <Shield className="h-5 w-5" />,
    color: "bg-green-100 text-green-500",
  },
];

const recentAlerts = [
  {
    id: 1,
    title: "Phishing Attempt Blocked",
    source: "paypal-security@mail.net",
    time: "2 hours ago",
    severity: "high",
  },
  {
    id: 2,
    title: "Suspicious Link Detected",
    source: "amazon-orders@tracking.co",
    time: "Yesterday",
    severity: "medium",
  },
  {
    id: 3,
    title: "Unusual Sender Pattern",
    source: "support@microsoft-help.com",
    time: "2 days ago",
    severity: "medium",
  },
];

const severityColors = {
  high: "text-red-500 bg-red-50 border-red-200",
  medium: "text-amber-500 bg-amber-50 border-amber-200",
  low: "text-green-500 bg-green-50 border-green-200",
};

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-knight-navy">Welcome Back</h1>
        <p className="text-gray-500">Here's what's happening with your email security</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
                <div className={`p-2 rounded-full ${card.color}`}>
                  {card.icon}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest security notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Tips</CardTitle>
          <CardDescription>Best practices to stay protected</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <p className="text-sm">Enable Two-Factor Authentication for additional account security.</p>
            </li>
            <li className="flex">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <p className="text-sm">Regularly update your email passwords and never reuse them across services.</p>
            </li>
            <li className="flex">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <p className="text-sm">Be cautious of unexpected attachments, even from known senders.</p>
            </li>
            <li className="flex">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <p className="text-sm">Hover over links to verify their destination before clicking.</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
