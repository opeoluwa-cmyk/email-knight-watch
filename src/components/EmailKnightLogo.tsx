
import React from "react";
import { Shield, Mail } from "lucide-react";

interface EmailKnightLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const EmailKnightLogo = ({ size = "md", showText = false }: EmailKnightLogoProps) => {
  const sizes = {
    sm: { logo: "h-10 w-10", text: "text-xl", icon: 16 },
    md: { logo: "h-16 w-16", text: "text-2xl", icon: 24 },
    lg: { logo: "h-24 w-24", text: "text-5xl", icon: 36 }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Reduced gradient effect with a subtle shadow instead of a blur */}
        <div className="absolute -inset-1 bg-gradient-to-r from-knight-blue/50 to-knight-navy/50 rounded-full opacity-50"></div>
        <div className={`relative flex items-center justify-center ${sizes[size].logo} rounded-full bg-gradient-to-b from-knight-navy to-knight-blue shadow-md`}>
          {/* Using Shield and Mail icons to represent knight protection and email */}
          <div className="absolute">
            <Shield size={sizes[size].icon} className="text-white" />
          </div>
          <div className="absolute translate-y-[2px]">
            <Mail size={sizes[size].icon * 0.6} className="text-white" />
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="mt-3 text-center">
          <h2 className="font-bold text-xl text-knight-navy">Email Knight</h2>
          <p className="text-sm text-muted-foreground">Phishing Detection</p>
        </div>
      )}
    </div>
  );
};

export default EmailKnightLogo;
