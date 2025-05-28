
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import EmailKnightLogo from "@/components/EmailKnightLogo";

const Login = () => {
  const navigate = useNavigate();
  const { googleLogin, isLoading } = useAuth();
  
  const handleGoogleLogin = async () => {
    try {
      // This would be replaced with actual Google OAuth token
      const mockGoogleToken = "mock-google-token";
      await googleLogin(mockGoogleToken);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Google authentication failed. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-knight-lightblue px-4">
      <div className="w-full max-w-md text-center flex flex-col items-center animate-fade-in">
        <div className="mb-8">
          <EmailKnightLogo size="lg" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-knight-navy">Email Knight</h1>
        <p className="text-lg mb-8 text-muted-foreground">Your shield against phishing attacks</p>
        
        <div className="w-full space-y-4 bg-white p-8 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-6">Sign in to continue</h2>
          
          <Button 
            className="w-full py-6 flex items-center justify-center gap-3 bg-white border hover:bg-gray-50 text-gray-800"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
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
