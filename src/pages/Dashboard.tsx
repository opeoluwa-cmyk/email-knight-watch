
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
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

const emailChartData = [
  { name: "Jan", total: 1023, phishing: 5 },
  { name: "Feb", total: 1242, phishing: 8 },
  { name: "Mar", total: 1321, phishing: 12 },
  { name: "Apr", total: 1428, phishing: 6 },
  { name: "May", total: 1553, phishing: 8 },
  { name: "Jun", total: 1632, phishing: 15 },
];

const threatTypeData = [
  { name: "Phishing", value: 42 },
  { name: "Malware", value: 18 },
  { name: "Spam", value: 65 },
  { name: "Spoofing", value: 27 },
];

const COLORS = ["#FF5733", "#33C3F0", "#8E9196", "#1A1F2C"];

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
            <CardTitle>Email Traffic Overview</CardTitle>
            <CardDescription>Last 6 months of email activity</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                total: { label: "Total Emails" },
                phishing: { label: "Phishing Detected" },
              }}
            >
              <LineChart data={emailChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Total
                              </span>
                              <span className="font-bold text-[0.80rem]">
                                {payload[0].value}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Phishing
                              </span>
                              <span className="font-bold text-[0.80rem]">
                                {payload[1].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#33C3F0"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="phishing"
                  stroke="#FF5733"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Threat Distribution</CardTitle>
            <CardDescription>Breakdown by threat types</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {threatTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].name}
                            </span>
                            <span className="font-bold text-[0.80rem]">
                              {payload[0].value} detected
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ paddingLeft: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

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
