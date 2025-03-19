import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash,
  Plus,
  ChevronUp,
  ChevronDown,
  Loader2
} from "lucide-react";
import { Story } from "@/types";
import { fetchStories } from "@/redux/storiesSlice";

export default function AdminDashboard() {
  const { stories, loading } = useSelector((state: RootState) => state.storiesSlice);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [selectedStories, setSelectedStories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [sortColumn, setSortColumn] = useState<string>("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch stories on component mount
  useEffect(() => {
    if (stories.length === 0) {

      dispatch(fetchStories());
    }
  }, [dispatch]);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let filtered = [...stories];

    // // Filter by category
    // if (categoryFilter !== "all") {
    //   filtered = filtered.filter(story => story.category === categoryFilter);
    // }

    // // Filter by search term
    // if (searchTerm) {
    //   const searchLower = searchTerm.toLowerCase();
    //   filtered = filtered.filter(story =>
    //     story.title.toLowerCase().includes(searchLower) ||
    //     story.code.toLowerCase().includes(searchLower)
    //   );
    // }

    // // Sort
    // filtered.sort((a, b) => {
    //   let aValue: any = a[sortColumn as keyof Story];
    //   let bValue: any = b[sortColumn as keyof Story];

    //   if (aValue === bValue) return 0;

    //   const result = aValue > bValue ? 1 : -1;
    //   return sortDirection === "asc" ? result : -result;
    // });

    setFilteredStories(filtered);
  }, [stories, searchTerm, categoryFilter, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStories(filteredStories.map(story => story.id));
    } else {
      setSelectedStories([]);
    }
  };

  const handleSelectStory = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStories(prev => [...prev, id]);
    } else {
      setSelectedStories(prev => prev.filter(storyId => storyId !== id));
    }
  };

  const handleBulkDelete = () => {
    // In a real app, this would call an API
    const remainingStories = stories.filter(story => !selectedStories.includes(story.id));

    // Update Redux store or state
    toast({
      title: "Stories Deleted",
      description: `${selectedStories.length} stories have been deleted.`
    });
    setSelectedStories([]);
  };

  const handleDeleteStory = (id: string) => {
    // In a real app, this would call an API
    const remainingStories = stories.filter(story => story.id !== id);

    // Update Redux store or state
    toast({
      title: "Story Deleted",
      description: "The story has been deleted."
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="page-container pb-16 animate-entrance">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Story Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage your stories
          </p>
        </div>
        <Button asChild className="storybook-button bg-primary hover:bg-primary/90">
          <Link to="/admin/story/new">
            <Plus size={16} className="mr-2" /> Create New Story
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search by title or code..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} /> Category: {categoryFilter === "all" ? "All" : categoryFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategoryFilter("all")}>All Categories</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Adventure")}>Adventure</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Fantasy")}>Fantasy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Science")}>Science</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("History")}>History</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Nature")}>Nature</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Friendship")}>Friendship</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Family")}>Family</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Animals")}>Animals</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {selectedStories.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <span className="text-sm font-medium">{selectedStories.length} stories selected</span>
            <div className="ml-auto flex gap-2">
              <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                <Trash size={14} className="mr-1" /> Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Stories Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={selectedStories.length === filteredStories.length && filteredStories.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all stories"
                  />
                </TableHead>
                <TableHead className="w-1/3 cursor-pointer" onClick={() => handleSort("title")}>
                  <div className="flex items-center">
                    Title
                    {sortColumn === "title" && (
                      sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("code")}>
                  <div className="flex items-center">
                    Code
                    {sortColumn === "code" && (
                      sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Language</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No stories found</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchTerm("");
                          setCategoryFilter("all");
                        }}
                      >
                        Clear all filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredStories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedStories.includes(story.id)}
                        onCheckedChange={(checked) => handleSelectStory(story.id, !!checked)}
                        aria-label={`Select ${story.title}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link to={`/admin/story/${story.id}`} className="hover:underline">
                        {story.title}
                      </Link>
                    </TableCell>
                    <TableCell>{story.code}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{story.category}</Badge>
                    </TableCell>
                    <TableCell>{story.language}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/story/${story.id}`}>
                              <Edit size={14} className="mr-2" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteStory(story.id)}
                            className="text-destructive"
                          >
                            <Trash size={14} className="mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}