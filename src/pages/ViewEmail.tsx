
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  AlertTriangle, 
  ArrowLeft, 
  Check, 
  Flag, 
  Shield, 
  Trash, 
  Mail,
  Archive,
  Download,
  Printer,
  Reply,
  Forward,
  MessageCircleX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

// Generate a more detailed mock email for demonstration
const generateDetailedEmail = (id) => {
  // Create a base email similar to the other mock data
  const baseEmails = {
    "e12": {
      id: "e12",
      sender: "security-noreply@paypal-verification.com",
      subject: "Important: Your Account Security Needs Attention",
      receivedAt: new Date(new Date().getTime() - 8 * 60 * 60 * 1000).toISOString(),
      status: "phishing",
      score: 89,
      content: `
        <p>Dear Valued Customer,</p>
        <p>We've detected unusual activity on your PayPal account. To ensure your account is not compromised, please verify your information immediately by clicking the link below:</p>
        <p><a href="https://malicious-paypal-site.com/verify">https://www.paypal.com/verify-account</a></p>
        <p>Failure to verify within 24 hours will result in your account being temporarily suspended.</p>
        <p>Thank you for your prompt attention to this matter.</p>
        <p>PayPal Security Team</p>
      `,
      indicators: [
        "Suspicious sender domain",
        "Urgency tactics",
        "Link URL mismatch",
        "Request for personal information"
      ],
      headers: {
        "From": "PayPal Security <security-noreply@paypal-verification.com>",
        "To": "user@example.com",
        "Date": new Date(new Date().getTime() - 8 * 60 * 60 * 1000).toLocaleString(),
        "Subject": "Important: Your Account Security Needs Attention",
        "Reply-To": "support@paypal-verification.com",
        "DKIM": "FAIL",
        "SPF": "FAIL",
        "DMARC": "FAIL"
      },
      attachments: []
    },
    "e25": {
      id: "e25",
      sender: "newsletter@nytimes.com",
      subject: "Breaking News: Weekly Digest",
      receivedAt: new Date(new Date().getTime() - 26 * 60 * 60 * 1000).toISOString(),
      status: "safe",
      score: 5,
      content: `
        <p>Good morning,</p>
        <p>Here are this week's top stories from The New York Times:</p>
        <ul>
          <li>Global Climate Summit Sets New Emission Targets</li>
          <li>Tech Companies Announce Joint AI Ethics Board</li>
          <li>New Study Reveals Benefits of Mediterranean Diet</li>
          <li>Film Festival Announces Award Winners</li>
        </ul>
        <p>Read more on <a href="https://www.nytimes.com">our website</a>.</p>
        <p>The New York Times</p>
        <p><small>To unsubscribe from these emails, <a href="#">click here</a></small></p>
      `,
      indicators: [],
      headers: {
        "From": "The New York Times <newsletter@nytimes.com>",
        "To": "user@example.com",
        "Date": new Date(new Date().getTime() - 26 * 60 * 60 * 1000).toLocaleString(),
        "Subject": "Breaking News: Weekly Digest",
        "List-Unsubscribe": "<mailto:unsubscribe@nytimes.com>",
        "DKIM": "PASS",
        "SPF": "PASS",
        "DMARC": "PASS"
      },
      attachments: []
    },
    "e34": {
      id: "e34",
      sender: "notification@amazondelivery-tracking.net",
      subject: "Your Amazon Package Delivery Issue: Action Required",
      receivedAt: new Date(new Date().getTime() - 36 * 60 * 60 * 1000).toISOString(),
      status: "suspicious",
      score: 67,
      content: `
        <p>Hello Amazon Customer,</p>
        <p>We could not deliver your package due to an address issue. Please review and update your address within 24 hours.</p>
        <p>Click here to confirm your delivery information: <a href="https://tracking-amazon-delivery.net/confirm">Update Delivery Address</a></p>
        <p>Order ID: #AMZ-45729856</p>
        <p>Thank you,<br>Amazon Delivery Support</p>
      `,
      indicators: [
        "Suspicious sender domain",
        "Link URL mismatch",
        "Unusual request format"
      ],
      headers: {
        "From": "Amazon Delivery <notification@amazondelivery-tracking.net>",
        "To": "user@example.com",
        "Date": new Date(new Date().getTime() - 36 * 60 * 60 * 1000).toLocaleString(),
        "Subject": "Your Amazon Package Delivery Issue: Action Required",
        "Reply-To": "support@amazondelivery-tracking.net",
        "DKIM": "FAIL",
        "SPF": "NEUTRAL",
        "DMARC": "FAIL"
      },
      attachments: ["delivery_document.pdf"]
    }
  };
  
  // Return the requested email or a default one
  return baseEmails[id] || baseEmails.e12;
};

const statusColors = {
  safe: "bg-green-100 border-green-200 text-green-700",
  suspicious: "bg-amber-100 border-amber-200 text-amber-700",
  phishing: "bg-red-100 border-red-200 text-red-700",
};

const statusIcons = {
  safe: <Check className="h-4 w-4" />,
  suspicious: <AlertTriangle className="h-4 w-4" />,
  phishing: <MessageCircleX className="h-4 w-4" />,
};

const ViewEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [showHeaders, setShowHeaders] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchedEmail = generateDetailedEmail(id);
    setEmail(fetchedEmail);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    toast({
      title: "Email deleted",
      description: "The email has been permanently deleted"
    });
    navigate('/emails');
  };

  const handleMoveToQuarantine = () => {
    toast({
      title: "Email quarantined",
      description: "The email has been moved to quarantine"
    });
    navigate('/emails');
  };

  const handleMarkAsSafe = () => {
    toast({
      title: "Email marked as safe",
      description: "The email has been marked as legitimate"
    });
    navigate('/emails');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  if (!email) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <Mail className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">Loading email...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" onClick={handleBack} className="mr-4" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to emails
          </Button>
          <h1 className="text-xl font-bold text-knight-navy">{email.subject}</h1>
        </div>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[email.status]}`}>
          {statusIcons[email.status]}
          <span className="ml-1.5 capitalize">{email.status}</span>
          <span className="ml-1.5 font-bold">{email.score}%</span>
        </div>
      </div>

      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="bg-knight-navy/5 border-b">
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-lg">{email.sender}</p>
                <p className="text-sm text-muted-foreground">{formatDate(email.receivedAt)}</p>
              </div>
              
              <TooltipProvider>
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setShowHeaders(!showHeaders)}>
                        <Flag className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View email headers</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download email</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Print email</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        
        {showHeaders && (
          <div className="bg-gray-50 p-4 border-b text-xs font-mono overflow-x-auto">
            {Object.entries(email.headers).map(([key, value]) => (
              <div key={key} className="mb-1">
                <span className="font-semibold">{key}: </span>
                <span className={
                  (key === "DKIM" || key === "SPF" || key === "DMARC") 
                    ? (value === "PASS" ? "text-green-600" : "text-red-600") 
                    : ""
                }>
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        )}
        
        <CardContent className="p-6">
          <div 
            className="prose prose-sm max-w-none" 
            dangerouslySetInnerHTML={{ __html: email.content }} 
          />
          
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h4 className="font-medium mb-2">Attachments:</h4>
              <div className="flex flex-wrap gap-2">
                {email.attachments.map((attachment, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center gap-1 py-1 px-3"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {attachment}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {email.indicators.length > 0 && (
            <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-4">
              <h4 className="text-red-800 font-medium mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Risk Indicators
              </h4>
              <ul className="space-y-1 pl-6 list-disc text-red-700">
                {email.indicators.map((indicator, index) => (
                  <li key={index}>{indicator}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t bg-gray-50 flex justify-between">
          <div className="flex gap-2">
            <TooltipProvider>
              {email.status !== "safe" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleMarkAsSafe}>
                      <Shield className="h-4 w-4 mr-2" />
                      Mark as Safe
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mark this email as legitimate</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {email.status !== "phishing" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleMoveToQuarantine}>
                      <Archive className="h-4 w-4 mr-2" />
                      Quarantine
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Move to quarantine</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleDelete}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Permanently delete this email</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex gap-2">
            <Button variant="default" size="sm">
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </Button>
            <Button variant="outline" size="sm">
              <Forward className="h-4 w-4 mr-2" />
              Forward
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewEmail;
