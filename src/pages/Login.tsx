
import React from "react";
import { Button } from "@/components/ui/button";
import { Google } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  
  const handleGoogleLogin = () => {
    // This is a mock function - would be replaced with actual Google auth
    toast({
      title: "Authentication coming soon",
      description: "Google authentication will be implemented with Supabase integration",
    });
    
    // For demo purposes, simulate login and redirect to dashboard
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-knight-lightblue px-4">
      <div className="w-full max-w-md text-center flex flex-col items-center animate-fade-in">
        <div className="mb-8 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-knight-blue to-knight-navy rounded-full blur-md"></div>
            <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-knight-navy via-knight-navy to-knight-blue shadow-lg">
              <span className="font-extrabold text-5xl text-white">EK</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-knight-navy">Email Knight</h1>
        <p className="text-lg mb-8 text-muted-foreground">Your shield against phishing attacks</p>
        
        <div className="w-full space-y-4 bg-white p-8 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-6">Sign in to continue</h2>
          
          <Button 
            className="w-full py-6 flex items-center justify-center gap-3 bg-white border hover:bg-gray-50 text-gray-800"
            onClick={handleGoogleLogin}
          >
            <Google size={20} />
            <span>Continue with Google</span>
          </Button>
          
          <div className="pt-4 text-sm text-center text-muted-foreground">
            By continuing, you agree to Email Knight's Terms of Service and Privacy Policy.
          </div>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Email Knight. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
