import { useAppSelector } from "@/app/hooks";
import { UrlsPage } from "@/features/url/urls-page";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UrlShortenPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (user) return <UrlsPage />;
};
