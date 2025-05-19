
import { Mail, AlertTriangle, Shield } from "lucide-react";

export const statCards = [
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

export const recentAlerts = [
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

export const emailChartData = [
  { name: "Jan", total: 1023, phishing: 5 },
  { name: "Feb", total: 1242, phishing: 8 },
  { name: "Mar", total: 1321, phishing: 12 },
  { name: "Apr", total: 1428, phishing: 6 },
  { name: "May", total: 1553, phishing: 8 },
  { name: "Jun", total: 1632, phishing: 15 },
];

export const phishingDistributionData = [
  { name: "Legitimate", value: 3842, color: "#33C3F0" },
  { name: "Phishing", value: 54, color: "#FF5733" }
];
