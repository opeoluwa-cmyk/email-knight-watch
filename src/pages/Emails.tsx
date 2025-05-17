
import React, { useState } from "react";
import { 
  AlertTriangle, 
  Check, 
  Mail, 
  Search, 
  Shield,
  X,
  ChevronLeft,
  ChevronRight
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Generate more mock email data
const generateMockEmails = (count) => {
  const domains = [
    "paypal-security.com", 
    "amazon.com", 
    "microsoft365-noreply.microsoft.com", 
    "facebook-mail.com", 
    "nytimes.com", 
    "netflix-billing.com", 
    "bank-of-america.co", 
    "apple-support.org", 
    "google-security.com", 
    "dropbox-share.net"
  ];
  
  const subjects = [
    "Your account has been limited",
    "Order confirmation",
    "Security alert",
    "Password reset required",
    "Breaking News",
    "Your subscription is expiring",
    "Suspicious activity detected",
    "Payment processed successfully",
    "Document shared with you",
    "Invitation to collaborate"
  ];
  
  const statusTypes = ["safe", "suspicious", "phishing"];
  
  return Array.from({ length: count }).map((_, index) => {
    const id = `e${index + 1}`;
    const domainIndex = Math.floor(Math.random() * domains.length);
    const subjectIndex = Math.floor(Math.random() * subjects.length);
    const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];
    const score = status === "safe" ? Math.floor(Math.random() * 20) : 
                 status === "suspicious" ? Math.floor(Math.random() * 35) + 30 : 
                 Math.floor(Math.random() * 30) + 70;
    
    // Generate a random date within the last month
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id,
      sender: `noreply@${domains[domainIndex]}`,
      subject: subjects[subjectIndex],
      receivedAt: date.toISOString(),
      status,
      score,
      content: `This is a sample email content for ${subjects[subjectIndex]}. It contains information that may or may not be legitimate.`,
      indicators: status !== "safe" ? [
        "Suspicious sender domain",
        "Unusual request format",
        "Link mismatch"
      ].slice(0, Math.floor(Math.random() * 3) + 1) : []
    };
  });
};

const mockEmails = generateMockEmails(52); // Generate 52 mock emails for pagination

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

const ITEMS_PER_PAGE = 10;

const Emails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(filteredEmails.length / ITEMS_PER_PAGE);
  const paginatedEmails = filteredEmails.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);
    
    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

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
              {paginatedEmails.length > 0 ? (
                paginatedEmails.map((email) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No emails found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {getPageNumbers().map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage + 2 < totalPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <div className="text-xs text-center text-muted-foreground mt-2">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredEmails.length)} of {filteredEmails.length} emails
          </div>
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
