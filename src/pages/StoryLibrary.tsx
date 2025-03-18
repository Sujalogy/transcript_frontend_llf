
import { useState, useEffect } from "react";
import { mockStories, filterStories } from "@/lib/data";
import { Story, AgeGroup, Category, StoryFilters } from "@/types";
import StoryCard from "@/components/StoryCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, X } from "lucide-react";

export default function StoryLibrary() {
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [filters, setFilters] = useState<StoryFilters>({
    sortBy: "popularity",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const ageGroups: AgeGroup[] = ["3-5", "6-8", "9-12", "13+"];
  const categories: Category[] = [
    "Adventure",
    "Fantasy",
    "Science",
    "History",
    "Nature",
    "Friendship",
    "Family",
    "Animals",
  ];

  useEffect(() => {
    // In a real app, this would fetch from an API
    const publishedStories = mockStories.filter(
      (story) => story.status === "published"
    );
    setStories(publishedStories);
    setFilteredStories(publishedStories);
  }, []);

  useEffect(() => {
    // Apply filters whenever they change
    const filtered = filterStories(stories, {
      ...filters,
      searchTerm,
      status: "published",
    });
    setFilteredStories(filtered);
  }, [filters, searchTerm, stories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect above
  };

  const handleAgeGroupFilter = (ageGroup: AgeGroup | undefined) => {
    setFilters((prev) => ({ ...prev, ageGroup }));
  };

  const handleCategoryFilter = (category: Category | undefined) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleSortChange = (sortBy: "popularity" | "date" | "title") => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const resetFilters = () => {
    setFilters({ sortBy: "popularity" });
    setSearchTerm("");
  };

  return (
    <div className="page-container pb-16 animate-entrance">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Story Library</h1>
        <p className="text-muted-foreground">
          Discover and explore our collection of magical stories
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar for desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-md p-5 sticky top-20">
            <div className="mb-5">
              <h3 className="font-medium mb-3">Age Group</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={!filters.ageGroup ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleAgeGroupFilter(undefined)}
                >
                  All Ages
                </Badge>
                {ageGroups.map((age) => (
                  <Badge
                    key={age}
                    variant={filters.ageGroup === age ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleAgeGroupFilter(age)}
                  >
                    {age}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h3 className="font-medium mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={!filters.category ? "secondary" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleCategoryFilter(undefined)}
                >
                  All Categories
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={
                      filters.category === category ? "secondary" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={resetFilters}
              disabled={!filters.ageGroup && !filters.category && !searchTerm}
            >
              <X size={16} className="mr-2" /> Reset Filters
            </Button>
          </div>
        </div>

        <div className="flex-1">
          {/* Search and Mobile Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search stories by title, author, or tags..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              >
                <Filter size={16} className="mr-2" /> Filters
              </Button>
            </div>
          </div>

          {/* Mobile Filter Menu */}
          {isFilterMenuOpen && (
            <div className="lg:hidden bg-white rounded-xl shadow-md p-5 mb-6 animate-fade-in">
              <div className="mb-5">
                <h3 className="font-medium mb-3">Age Group</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!filters.ageGroup ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleAgeGroupFilter(undefined)}
                  >
                    All Ages
                  </Badge>
                  {ageGroups.map((age) => (
                    <Badge
                      key={age}
                      variant={filters.ageGroup === age ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleAgeGroupFilter(age)}
                    >
                      {age}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <h3 className="font-medium mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={!filters.category ? "secondary" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCategoryFilter(undefined)}
                  >
                    All Categories
                  </Badge>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={
                        filters.category === category ? "secondary" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={resetFilters}
              >
                <X size={16} className="mr-2" /> Reset Filters
              </Button>
            </div>
          )}

          {/* Sorting Tabs */}
          <div className="mb-6">
            <Tabs
              defaultValue="popularity"
              value={filters.sortBy}
              onValueChange={(value) =>
                handleSortChange(value as "popularity" | "date" | "title")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="popularity">Most Popular</TabsTrigger>
                <TabsTrigger value="date">Newest</TabsTrigger>
                <TabsTrigger value="title">A-Z</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Active Filters */}
          {(filters.ageGroup || filters.category || searchTerm) && (
            <div className="flex flex-wrap gap-2 mb-4">
              <Label className="my-auto text-sm">Active Filters:</Label>
              {filters.ageGroup && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Age: {filters.ageGroup}
                  <button
                    onClick={() => handleAgeGroupFilter(undefined)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {filters.category}
                  <button
                    onClick={() => handleCategoryFilter(undefined)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 hover:text-destructive"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={resetFilters}
              >
                Clear All
              </Button>
            </div>
          )}

          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-xl">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted mb-4">
                <Search size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No stories found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search criteria
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
