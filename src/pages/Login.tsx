import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, LogIn } from "lucide-react";
import logo from '../../public/logo (2).png';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google/`;
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="w-full max-w-md animate-entrance">
        <div className="text-center mb-8">


          <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
            <Book className="h-12 w-12 text-primary" />
          </div>
          <div className="flex items-center justify-center">

            <h1 className="text-3xl font-bold storybook-heading">Welcome to </h1>
            <img
              src={logo}
              alt="Sutra Pathan Logo"
              className="h-7 w-auto ml-2 mb-1"
            />
          </div>

          <p className="text-muted-foreground mt-2">Sign in to access your magical reading journey</p>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader className="text-center">
            {/* Parent Company Logo - Above Card */}

            <CardTitle>Sign In</CardTitle>
            <CardDescription>Use your Google account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGoogleLogin} className="w-full storybook-button">
              <LogIn className="mr-2 h-4 w-4" /> Sign in with Google
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
