
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { mockStories } from "@/lib/data";
import { Story } from "@/types";
import { 
  Heart, 
  BookmarkPlus, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  ArrowLeft,
  XCircle,
  Type,
  Volume2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StoryReader() {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fake page content (in a real app, the story would be split into pages)
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      // In a real app, fetch from API
      const storyData = mockStories.find(s => s.id === id);
      if (storyData) {
        setStory(storyData);
        
        // Simulate splitting content into pages (in a real app, this would be handled better)
        const content = storyData.content;
        const paragraphs = content.split('</p>');
        const pagesArray: string[] = [];
        
        // Group paragraphs into pages (3 paragraphs per page)
        for (let i = 0; i < paragraphs.length; i += 3) {
          const pageContent = paragraphs.slice(i, i + 3).join('</p>') + (i + 3 < paragraphs.length ? '</p>' : '');
          pagesArray.push(pageContent);
        }
        
        setPages(pagesArray);
      }
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    // Auto-hide controls after 3 seconds of inactivity
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
      controlsTimeout.current = setTimeout(() => {
        if (isFullscreen) {
          setShowControls(false);
        }
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, [isFullscreen]);

  // Toggle fullscreen reading mode
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const toggleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked ? "Story removed from your favorites" : "Story added to your favorites"
    });
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark removed" : "Bookmarked",
      description: bookmarked ? "Reading progress will no longer be saved" : "Your reading progress will be saved"
    });
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share this story",
      description: "Sharing functionality would be implemented here"
    });
  };

  const togglePlayback = () => {
    // In a real app, this would control audio playback
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Paused" : "Playing",
      description: isPlaying ? "Audio narration paused" : "Audio narration started"
    });
  };

  const exitReader = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
        <p className="text-muted-foreground mb-8">The story you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/library')}>Return to Library</Button>
      </div>
    );
  }

  const currentIllustration = story.illustrations.find(
    (ill) => ill.position === currentPage + 1
  );

  const progressPercentage = ((currentPage + 1) / pages.length) * 100;

  return (
    <div 
      className={`min-h-screen flex flex-col ${
        isFullscreen ? 'bg-white px-0' : 'bg-muted/20 px-4 py-6'
      } transition-all duration-300`}
    >
      {/* Top Controls - only shown when not in fullscreen or when controls are visible */}
      {(!isFullscreen || showControls) && (
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between border-b animate-fade-in">
          <Button variant="ghost" size="icon" onClick={exitReader} className="w-9 h-9">
            <ArrowLeft size={20} />
          </Button>
          
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-4">
              Page {currentPage + 1} of {pages.length}
            </span>
            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={toggleFullscreen}>
              {isFullscreen ? <XCircle size={20} /> : <Type size={20} />}
            </Button>
          </div>
        </div>
      )}

      <div className={`flex flex-col grow ${isFullscreen ? 'max-w-4xl mx-auto w-full' : 'container'}`}>
        {/* Story Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-6 mt-4">
          {/* Story Illustration - Only show on larger screens or first page */}
          {currentIllustration && (
            <div className={`md:w-1/3 ${currentPage === 0 || !isFullscreen ? 'block' : 'hidden md:block'}`}>
              <div className="sticky top-24">
                <img
                  src={currentIllustration.imageUrl}
                  alt={currentIllustration.caption || story.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                {currentIllustration.caption && (
                  <p className="mt-2 text-sm text-center text-muted-foreground italic">
                    {currentIllustration.caption}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Story Text */}
          <div 
            ref={contentRef}
            className={`flex-1 bg-white rounded-lg shadow-md p-6 md:p-8 ${
              isFullscreen ? 'max-h-[calc(100vh-12rem)]' : 'max-h-[calc(100vh-18rem)]'
            } overflow-y-auto`}
            style={{ fontSize: `${fontSize}px` }}
          >
            <h1 className="font-heading text-3xl font-bold mb-4 text-center md:text-left">{story.title}</h1>
            <p className="text-muted-foreground mb-6 text-center md:text-left">By {story.author}</p>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: pages[currentPage] }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      {(!isFullscreen || showControls) && (
        <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md border-t p-4 animate-fade-in">
          <div className="container flex flex-col gap-4">
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Page Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="h-9 w-9 rounded-full"
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextPage}
                  disabled={currentPage === pages.length - 1}
                  className="h-9 w-9 rounded-full"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlayback}
                  className="h-9 w-9 rounded-full"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </Button>
                <Volume2 size={18} className="text-muted-foreground ml-2" />
                <div className="w-24">
                  <Slider defaultValue={[70]} max={100} step={10} />
                </div>
              </div>

              {/* Font Size Control */}
              <div className="flex items-center gap-2">
                <Type size={14} className="text-muted-foreground" />
                <div className="w-24">
                  <Slider 
                    value={[fontSize]} 
                    min={14} 
                    max={28} 
                    step={2} 
                    onValueChange={handleFontSizeChange} 
                  />
                </div>
                <Type size={20} className="text-muted-foreground" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="icon"
                  onClick={toggleLike}
                  className={`h-9 w-9 rounded-full ${liked ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
                >
                  <Heart size={18} className={liked ? 'fill-current' : ''} />
                </Button>
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="icon"
                  onClick={toggleBookmark}
                  className={`h-9 w-9 rounded-full ${bookmarked ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                >
                  <BookmarkPlus size={18} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                  className="h-9 w-9 rounded-full"
                >
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
