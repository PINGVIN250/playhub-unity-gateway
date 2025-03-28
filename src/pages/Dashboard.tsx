
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGames } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  const { getUserGames, isLoading } = useGames();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const userGames = getUserGames();

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle 
            title={`Welcome, ${user?.username}`}
            description="Manage your games and account settings"
          >
            <Link to="/upload">
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add New Game</span>
              </Button>
            </Link>
          </PageTitle>
          
          <DashboardTabs
            userGames={userGames}
            isLoading={isLoading}
            user={user}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
