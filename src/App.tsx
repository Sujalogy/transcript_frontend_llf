
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import StoryLibrary from "@/pages/StoryLibrary";
import StoryReader from "@/pages/StoryReader";
import AdminDashboard from "@/pages/AdminDashboard";
import StoryEditor from "@/pages/StoryEditor";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/library" element={<StoryLibrary />} />
              <Route path="/story/:id" element={<StoryReader />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/story/new" element={<StoryEditor />} />
              <Route path="/admin/story/:id" element={<StoryEditor />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
