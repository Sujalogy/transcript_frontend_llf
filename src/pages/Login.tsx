import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "https://aa67-2401-4900-8811-2b29-e84f-9537-10e-e2dc.ngrok-free.app/auth/google/";
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="w-full max-w-md animate-entrance">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
            <Book className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold storybook-heading">Welcome to StoryWeaver</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your magical reading journey</p>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
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
