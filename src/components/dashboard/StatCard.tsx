
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, description, icon, color }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className={`p-2 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
