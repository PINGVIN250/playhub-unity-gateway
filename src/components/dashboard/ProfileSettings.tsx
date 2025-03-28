
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Settings, AlertCircle } from "lucide-react";

interface ProfileSettingsProps {
  user: User | null;
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  return (
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
  );
}
