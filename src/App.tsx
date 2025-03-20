import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "@/components/Navigation";
import { Provider } from 'react-redux';
import Login from "@/pages/Login";
import StoryLibrary from "@/pages/StoryLibrary";
import StoryReader from "@/pages/StoryReader";
import AdminDashboard from "@/pages/AdminDashboard";
import StoryEditor from "@/pages/StoryEditor";
import NotFound from "@/pages/NotFound";
import StoryCreate from "./pages/StoryCreate";
import { store } from "./redux/store";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { AppDispatch } from "./redux/store";
import { checkAuthStatus } from "./redux/authSlice";

const queryClient = new QueryClient();

// AuthCheck component to verify authentication on app load
const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return <>{children}</>;
};

// Layout component that conditionally renders Navigation
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <Navigation />}
      <main className={`flex-1 ${isLoginPage ? "w-full" : ""}`}>
        {children}
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthCheck>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<StoryLibrary />} />
                <Route path="/library" element={<StoryLibrary />} />
                <Route path="/story/:id" element={<StoryReader />} />

                {/* Public Route (with redirect if logged in) */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute restricted={true}>
                      <Login />
                    </PublicRoute>
                  }
                />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/story/new"
                  element={
                    <ProtectedRoute>
                      <StoryCreate />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/story/:id"
                  element={
                    <ProtectedRoute>
                      <StoryEditor />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AuthCheck>
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;