import { useEffect, useState } from "react";
import { Story } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  useEffect(() => {
    if (story.audio_file) {
      getAudioDuration(story.audio_file).then(setAudioDuration).catch(console.error);
    }
  }, [story.audio_file]);

  const getAudioDuration = async (audioUrl: string): Promise<number> => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    return Math.ceil(audioBuffer.duration / 60); // Convert seconds to minutes
  };

  return (
    <Card className="storybook-card group relative h-full transition-all duration-300 hover:rotate-[2deg] hover:translate-x-[2px] hover:translate-y-[3px]">

      <Link
        to={`/story/${story.id}`}
        state={{ story }} // ✅ Pass the state separately
        className="block h-full"
      >
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={story.cover_image}
            alt={story.title}
            className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className="absolute top-2 right-2 bg-white text-gray-800 font-bold flex items-center gap-1 px-2 py-1 shadow-md">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            {189} {/* Change this to dynamic rating if needed */}
          </Badge>
        </div>

        <CardContent className="p-4 flex-grow">
          <h3 className="text-xl font-bold line-clamp-2 font-heading">{story.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">By {"LLF"}</p>

          <div className="flex justify-between gap-2 mt-3">
            <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Age: {"8-12"}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock size={16} />
              <span className="text-sm">{audioDuration !== null ? `${audioDuration} mins` : "Loading..."}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-4 flex flex-col gap-2 items-start border-t border-border/50 mt-2 pt-3">

          <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg py-2">
            Start Reading!
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
