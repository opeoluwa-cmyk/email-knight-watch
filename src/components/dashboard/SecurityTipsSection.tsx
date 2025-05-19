
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Check } from "lucide-react";

const SecurityTipsSection = () => {
  return (
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
  );
};

export default SecurityTipsSection;
