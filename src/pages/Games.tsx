
import { useState } from "react";
import { useGames } from "@/contexts/GameContext";
import { GameGrid } from "@/components/GameGrid";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTitle } from "@/components/PageTitle";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";

const Games = () => {
  const { games, isLoading } = useGames();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from games
  const allTags = Array.from(
    new Set(games.flatMap(game => game.tags || []))
  ).sort();

  // Filter games based on search query and selected tags
  const filteredGames = games.filter(game => {
    const matchesSearch = searchQuery
      ? game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesTags = selectedTags.length
      ? selectedTags.every(tag => game.tags?.includes(tag))
      : true;

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <PageTitle
            title="Browse Games"
            description="Discover and play amazing Unity WebGL games from our community"
          />
          
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Search games..."
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {(searchQuery || selectedTags.length > 0) && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Found {filteredGames.length} {filteredGames.length === 1 ? "game" : "games"}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-sm"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
            <GameGrid 
              games={filteredGames} 
              columns={3}
              emptyMessage="No games found. Try adjusting your filters."
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Games;
