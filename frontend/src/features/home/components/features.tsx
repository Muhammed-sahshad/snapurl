import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Shield, Zap } from "lucide-react";

export const Features = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-20">
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
            <Link2 className="h-6 w-6 text-black" />
          </div>
          <CardTitle className="text-white">Smart Shortening</CardTitle>
          <CardDescription className="text-gray-400">
            Create memorable short links with custom aliases and advanced options.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-black" />
          </div>
          <CardTitle className="text-white">Secure & Private</CardTitle>
          <CardDescription className="text-gray-400">
            JWT authentication and encrypted storage keep your links safe and private.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-black" />
          </div>
          <CardTitle className="text-white">Lightning Fast</CardTitle>
          <CardDescription className="text-gray-400">
            Instant URL shortening with global CDN for maximum performance.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
