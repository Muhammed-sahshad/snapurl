import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="border-b border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Link2 className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold text-white">SnapUrl</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:text-amber-400">
                Sign In
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
