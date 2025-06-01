
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { GameProvider } from "@/contexts/GameContext";
import { CommentProvider } from "@/contexts/CommentContext";
import { RatingProvider } from "@/contexts/RatingContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Pages
import Index from "./pages/Index";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import Play from "./pages/Play";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import CommunityRules from "./pages/CommunityRules";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import Favorites from "./pages/Favorites";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <GameProvider>
            <CommentProvider>
              <RatingProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/games/:gameId" element={<GameDetails />} />
                    <Route path="/play/:gameId" element={<Play />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user/:userId" element={<PublicProfile />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/community-rules" element={<CommunityRules />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </RatingProvider>
            </CommentProvider>
          </GameProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
