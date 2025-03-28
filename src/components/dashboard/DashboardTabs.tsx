
import { useState } from "react";
import { Game } from "@/types";
import { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamesTab } from "./GamesTab";
import { AnalyticsPanel } from "./AnalyticsPanel";
import { ProfileSettings } from "./ProfileSettings";

interface DashboardTabsProps {
  userGames: Game[];
  isLoading: boolean;
  user: User | null;
  defaultTab?: string;
}

export function DashboardTabs({ 
  userGames, 
  isLoading, 
  user,
  defaultTab = "my-games" 
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 max-w-md">
        <TabsTrigger value="my-games">My Games</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="my-games" className="space-y-6">
        <GamesTab userGames={userGames} isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-6">
        <AnalyticsPanel />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-6">
        <ProfileSettings user={user} />
      </TabsContent>
    </Tabs>
  );
}
