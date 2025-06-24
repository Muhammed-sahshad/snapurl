import { Header } from "../home/components/header";
import { ShortenUrlForm } from "./components/shorten-url-form";
import { UrlList } from "./components/url-list";

export const UrlsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-1">
      <Header />
      <ShortenUrlForm />
      <UrlList />
    </div>
  );
};
