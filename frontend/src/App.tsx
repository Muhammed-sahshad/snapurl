import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { LoginPage } from "./pages/login-page"
import { Toaster } from "sonner"
import { LandingPage } from "./pages/landing-page"

export const App = () => {
  return (
   <Router>
     <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}