
import React from "react";

interface EmailKnightLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const EmailKnightLogo = ({ size = "md", showText = false }: EmailKnightLogoProps) => {
  const sizes = {
    sm: { logo: "h-10 w-10", text: "text-xl" },
    md: { logo: "h-16 w-16", text: "text-2xl" },
    lg: { logo: "h-24 w-24", text: "text-5xl" }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-knight-blue to-knight-navy rounded-full blur-md"></div>
        <div className={`relative flex items-center justify-center ${sizes[size].logo} rounded-full bg-gradient-to-br from-knight-navy via-knight-navy to-knight-blue shadow-lg`}>
          <span className={`font-extrabold ${sizes[size].text} text-white`}>EK</span>
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
