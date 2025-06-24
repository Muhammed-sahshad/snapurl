import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link2 } from "lucide-react";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Link2 className="h-8 w-8 text-amber-400" />
                <span className="text-2xl font-bold text-white">SnapUrl</span>
              </div>
              <CardTitle className="text-2xl text-white">{isLogin ? "Welcome back" : "Create account"}</CardTitle>
              <CardDescription className="text-gray-400">
                {isLogin ? "Sign in to your account to continue" : "Sign up to start shortening URLs"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLogin ? <LoginForm onSuccess={handleSuccess} /> : <SignupForm onSuccess={handleSuccess} />}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-gray-400">Or</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
};
