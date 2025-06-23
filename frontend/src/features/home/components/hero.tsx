import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
        Shorten URLs with{" "}
        <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">SnapUrl</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Transform your long URLs into elegant, trackable short links. Experience premium URL shortening with advanced
        analytics and secure authentication.
      </p>
      <Link to="/login">
        <Button
          size="lg"
          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-semibold text-lg px-8 py-4"
        >
          Start Shortening
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};
