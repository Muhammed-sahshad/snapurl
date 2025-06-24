import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { useAppDispatch } from "./app/hooks";
import { refreshToken } from "./features/auth/authThunk";
import { LandingPage } from "./pages/landing-page";
import { LoginPage } from "./pages/login-page";
import { UrlShortenPage } from "./pages/url-shorten-page";
import { Link2, Loader2 } from "lucide-react";

export const App = () => {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("loggedIn")) {
        await dispatch(refreshToken());
      }
      setRefreshing(false);
    };
    checkAuth();
  }, [dispatch]);

  if (refreshing)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
          <div className="flex items-center gap-2 text-white font-semibold text-xl">
            <Link2 className="text-amber-400 h-6 w-6" />
            SnapUrl
          </div>
          <p className="text-sm text-gray-300">Loading...</p>
        </div>
      </div>
    );

  return (
    <Router>
      <Toaster richColors position="top-right" closeButton={true} duration={1500} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/urls" element={<UrlShortenPage />} />
      </Routes>
    </Router>
  );
};
