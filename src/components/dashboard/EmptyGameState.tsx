
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";

export function EmptyGameState() {
  return (
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
  );
}
