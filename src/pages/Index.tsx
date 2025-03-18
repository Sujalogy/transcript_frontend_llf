
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StoryCard from "@/components/StoryCard";
import { mockStories, filterStories } from "@/lib/data";
import { Book, Star, BookOpen, Clock } from "lucide-react";

export default function Index() {
  const [featuredStories, setFeaturedStories] = useState(mockStories.slice(0, 3));

  useEffect(() => {
    // Get published stories sorted by popularity
    const published = filterStories(mockStories, { status: "published", sortBy: "popularity" });
    setFeaturedStories(published.slice(0, 3));
  }, []);

  return (
    <div className="animate-entrance">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-secondary/10 py-20">
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-6">
              Unleash Imagination
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 storybook-heading">
              Discover Magical Stories for Young Minds
            </h1>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl">
              StoryWeaver brings enchanting tales to life with beautiful illustrations and interactive read-along narration. Spark imagination and nurture a love for reading!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="storybook-button bg-primary hover:bg-primary/90" asChild>
                <Link to="/library">
                  <BookOpen className="mr-2 h-5 w-5" /> Explore Stories
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="storybook-button" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Kids Love StoryWeaver</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed with children in mind, our platform makes reading fun and interactive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                  <Book className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Interactive Stories</h3>
                <p className="text-center text-muted-foreground">
                  Engaging tales with beautiful illustrations that bring the stories to life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl">
              <CardContent className="pt-6">
                <div className="rounded-full bg-secondary/10 w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                  <Star className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Read-Along Audio</h3>
                <p className="text-center text-muted-foreground">
                  Professional narration helps improve reading skills and pronunciation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl">
              <CardContent className="pt-6">
                <div className="rounded-full bg-accent/10 w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                  <Clock className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Track Progress</h3>
                <p className="text-center text-muted-foreground">
                  Save your place and track reading achievements across stories.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Stories</h2>
            <Button variant="ghost" className="text-primary font-medium" asChild>
              <Link to="/library">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Reading?</h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join StoryWeaver today and discover a world of magical stories that educate and entertain.
          </p>
          <Button size="lg" variant="secondary" className="storybook-button bg-white text-primary hover:bg-white/90" asChild>
            <Link to="/library">Start Exploring</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
