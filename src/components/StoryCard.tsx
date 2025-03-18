
import { Story } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Card className="storybook-card group relative h-full transition-all duration-300 hover:translate-y-[-5px]">
      <Link to={`/story/${story.id}`} className="block h-full">
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={story.coverImage}
            alt={story.title}
            className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground font-bold">
            {story.ageGroup}
          </Badge>
        </div>

        <CardContent className="p-4 flex-grow">
          <h3 className="text-xl font-bold line-clamp-2 font-heading">{story.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">By {story.author}</p>
          
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border border-secondary/20">
              {story.category}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between border-t border-border/50 mt-2 pt-3">
          <div className="flex items-center gap-1">
            <HeartIcon size={16} className="text-destructive" />
            <span className="text-sm font-medium">{story.likes}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Eye size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{story.views}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{story.readingTimeMinutes} min</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
