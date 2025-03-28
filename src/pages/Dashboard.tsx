
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGames } from "@/contexts/GameContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { GameGrid } from "@/components/GameGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Upload, Settings, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const { getUserGames, isLoading } = useGames();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my-games");

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
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="my-games">My Games</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-games" className="space-y-6">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="glass-card animate-pulse">
                      <div className="aspect-video bg-muted/50 rounded-t-md"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-muted/50 rounded w-3/4"></div>
                        <div className="h-4 bg-muted/50 rounded w-full"></div>
                        <div className="h-4 bg-muted/50 rounded w-5/6"></div>
                        <div className="pt-2 flex justify-between gap-2">
                          <div className="h-9 bg-muted/50 rounded w-full"></div>
                          <div className="h-9 bg-muted/50 rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {userGames.length === 0 ? (
                    <div className="glass-card p-8 text-center">
                      <Upload className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">No Games Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't uploaded any games yet. Start showcasing your Unity creations!
                      </p>
                      <Link to="/upload">
                        <Button className="gap-2">
                          <PlusCircle className="h-4 w-4" />
                          <span>Add Your First Game</span>
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <GameGrid 
                      games={userGames} 
                      columns={3}
                      emptyMessage="You haven't uploaded any games yet."
                    />
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <div className="glass-card p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="54" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="12" 
                      strokeDasharray="339.3" 
                      strokeDashoffset="135.7" 
                      className="text-primary" 
                    />
                  </svg>
                  <div className="absolute">
                    <p className="text-3xl font-bold">60%</p>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  User engagement and game play statistics will be available soon.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <div className="glass-card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{user?.username}</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Profile Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Update your profile information
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Account Security</h4>
                      <p className="text-sm text-muted-foreground">
                        Change password and security settings
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings className="h-4 w-4" />
                      <span>Manage</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notification Preferences</h4>
                      <p className="text-sm text-muted-foreground">
                        Control how we contact you
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Settings className="h-4 w-4" />
                      <span>Configure</span>
                    </Button>
                  </div>
                </div>
                
                <div className="border-t mt-6 pt-6">
                  <div className="flex items-start gap-2 p-4 rounded-md bg-muted/50">
                    <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Developer Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        This is a demo application. In a real application, these settings would be fully functional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
