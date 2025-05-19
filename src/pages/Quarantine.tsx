
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Mail, Shield, Trash, Eye, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock quarantined email data
const mockEmails = [
  {
    id: "q1",
    sender: "suspicious@phishing-attempt.com",
    subject: "Urgent: Your Account Has Been Compromised",
    date: "2025-05-19T10:30:00",
    riskScore: 92,
    riskLevel: "High",
    reason: "Suspicious sender, phishing keywords, unusual links"
  },
  {
    id: "q2",
    sender: "security-alert@bank-verification.net",
    subject: "Verify Your Banking Details Immediately",
    date: "2025-05-18T14:45:00",
    riskScore: 87,
    riskLevel: "High",
    reason: "Domain spoofing, urgent action request, credential harvesting attempt"
  },
  {
    id: "q3",
    sender: "support@amozon-delivery.com",
    subject: "Package Delivery Failed: Action Required",
    date: "2025-05-17T08:15:00",
    riskScore: 85,
    riskLevel: "High", 
    reason: "Typosquatting domain, attachment with suspicious file extension"
  },
  {
    id: "q4",
    sender: "hr-department@company-review.org",
    subject: "Employee Survey: Bonus Structure Review",
    date: "2025-05-16T16:20:00",
    riskScore: 79,
    riskLevel: "High",
    reason: "Unknown sender, requests confidential information"
  },
  {
    id: "q5",
    sender: "irs-tax-refund@tax-service.info",
    subject: "Tax Refund Available: Confirm Your Details",
    date: "2025-05-15T11:10:00",
    riskScore: 95,
    riskLevel: "High",
    reason: "Government impersonation, suspicious link destination"
  }
];

const Quarantine = () => {
  const [quarantinedEmails, setQuarantinedEmails] = useState(mockEmails);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleRestore = (id: string) => {
    setQuarantinedEmails(quarantinedEmails.filter(email => email.id !== id));
    toast({
      title: "Email restored",
      description: "The email has been moved to your inbox"
    });
  };

  const handleDelete = (id: string) => {
    setQuarantinedEmails(quarantinedEmails.filter(email => email.id !== id));
    toast({
      title: "Email deleted",
      description: "The email has been permanently deleted"
    });
  };

  const handleView = (id: string) => {
    toast({
      title: "Viewing in safe mode",
      description: "Opening email with active content disabled",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-knight-navy tracking-tight">Quarantine</h1>
          <p className="text-muted-foreground">High risk emails isolated for your safety</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-200">
          <Shield size={20} className="text-amber-600" />
          <span className="text-sm font-medium text-amber-800">
            {quarantinedEmails.length} emails quarantined
          </span>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-knight-navy text-white rounded-t-lg">
          <CardTitle>Quarantined Emails</CardTitle>
          <CardDescription className="text-knight-lightblue">
            These emails were flagged as potentially dangerous and automatically quarantined
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {quarantinedEmails.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quarantinedEmails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
                        <span className="font-medium">{email.riskScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{email.sender}</TableCell>
                    <TableCell>{email.subject}</TableCell>
                    <TableCell>{formatDate(email.date)}</TableCell>
                    <TableCell className="max-w-xs truncate">{email.reason}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(email.id)}>
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleRestore(email.id)}>
                          <Check size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(email.id)}>
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Mail size={48} className="text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No quarantined emails</h3>
              <p className="text-muted-foreground">All clear! No suspicious emails have been detected</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quarantine;
