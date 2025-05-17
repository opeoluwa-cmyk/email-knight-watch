
import React, { useState } from "react";
import { 
  AlertTriangle, 
  Check, 
  Mail, 
  Search, 
  Shield,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock email data
const mockEmails = [
  {
    id: "e1",
    sender: "paypal-service@secure-paypal.com",
    subject: "Your PayPal account has been limited",
    receivedAt: "2023-05-16T14:22:00",
    status: "phishing",
    score: 98,
    content: "Dear valued customer, We've noticed some unusual activity in your PayPal account. Your account access has been limited. Please verify your information immediately by clicking the link below to avoid permanent suspension.",
    indicators: ["Suspicious sender domain", "Urgent action requested", "Link mismatch"]
  },
  {
    id: "e2",
    sender: "noreply@amazon.com",
    subject: "Your Amazon order #12345 has shipped",
    receivedAt: "2023-05-15T09:15:00",
    status: "safe",
    score: 2,
    content: "Hello, Your recent Amazon order #12345 has shipped and is on its way. You can track your package using the tracking number provided in your account. Thank you for shopping with Amazon!",
    indicators: []
  },
  {
    id: "e3",
    sender: "microsoft365-noreply@microsoft.com",
    subject: "Action required: Update your Microsoft password",
    receivedAt: "2023-05-14T16:30:00",
    status: "suspicious",
    score: 65,
    content: "Your Microsoft 365 password will expire in 2 days. To ensure uninterrupted access to your account, please update your password now. Click here to update your password securely.",
    indicators: ["Password urgency", "External link"]
  },
  {
    id: "e4",
    sender: "security@facebook-mail.com",
    subject: "Security alert: New login to your account",
    receivedAt: "2023-05-14T11:45:00",
    status: "phishing",
    score: 95,
    content: "We detected a login to your Facebook account from a new device in Russia. If this wasn't you, your account may be compromised. Click here to secure your account immediately.",
    indicators: ["Suspicious sender domain", "Unusual location claim", "Urgency tactics"]
  },
  {
    id: "e5",
    sender: "newsletter@nytimes.com",
    subject: "Breaking News: Latest Updates for May 14",
    receivedAt: "2023-05-14T08:10:00",
    status: "safe",
    score: 3,
    content: "Breaking News from The New York Times: Latest Updates for May 14. Read our top stories covering global events, politics, business, technology and more.",
    indicators: []
  }
];

const statusColors = {
  safe: "text-green-700 bg-green-50 border-green-100",
  suspicious: "text-amber-700 bg-amber-50 border-amber-100",
  phishing: "text-red-700 bg-red-50 border-red-100",
};

const statusIcons = {
  safe: <Check className="h-4 w-4" />,
  suspicious: <AlertTriangle className="h-4 w-4" />,
  phishing: <X className="h-4 w-4" />,
};

const Emails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  const handleCloseDialog = () => {
    setSelectedEmail(null);
  };

  const filteredEmails = mockEmails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-knight-navy">Email Analysis</h1>
        <p className="text-gray-500">Monitor and analyze your emails for security threats</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-white border-0 shadow-sm focus-visible:ring-1 focus-visible:ring-knight-blue"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Refresh
          </Button>
          <Button size="sm">Scan New Emails</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Sender</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="w-[120px]">Received</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[80px]">Risk Score</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmails.map((email) => (
                <TableRow 
                  key={email.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleEmailSelect(email)}
                >
                  <TableCell className="font-medium truncate max-w-[180px]">
                    {email.sender}
                  </TableCell>
                  <TableCell className="truncate max-w-[300px]">{email.subject}</TableCell>
                  <TableCell>{formatDate(email.receivedAt)}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[email.status]}`}>
                      {statusIcons[email.status]}
                      <span className="ml-1 capitalize">{email.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-sm font-medium ${
                      email.score > 70 ? "text-red-600" : 
                      email.score > 30 ? "text-amber-600" : "text-green-600"
                    }`}>
                      {email.score}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          ...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleEmailSelect(email);
                        }}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Mark as Safe
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Block Sender
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!selectedEmail} onOpenChange={handleCloseDialog}>
        {selectedEmail && (
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedEmail.subject}</DialogTitle>
              <DialogDescription className="text-sm">
                From: {selectedEmail.sender}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-2">
              <div className="flex justify-between items-center">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedEmail.status]}`}>
                  {statusIcons[selectedEmail.status]}
                  <span className="ml-1 capitalize">{selectedEmail.status}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(selectedEmail.receivedAt)}
                </div>
              </div>
              
              <div className="rounded-md bg-gray-50 p-4 text-sm">
                {selectedEmail.content}
              </div>
              
              {selectedEmail.indicators.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Risk Indicators:</h4>
                  <ul className="space-y-1">
                    {selectedEmail.indicators.map((indicator, index) => (
                      <li key={index} className="flex text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedEmail.status === 'safe' && (
                <div className="flex items-center text-green-600 text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  This email has been analyzed and appears to be safe.
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Emails;
