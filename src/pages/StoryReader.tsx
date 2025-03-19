
// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { mockStories } from "@/lib/data";
// import { Story } from "@/types";
// import {
//   Heart,
//   BookmarkPlus,
//   Share2,
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   Pause,
//   ArrowLeft,
//   XCircle,
//   Type,
//   Volume2
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// export default function StoryReader() {
//   const { id } = useParams<{ id: string }>();
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [fontSize, setFontSize] = useState(18);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [bookmarked, setBookmarked] = useState(false);
//   const location = useLocation();
//   const story = location.state?.story; // ✅ Get the passed story data

//   if (!story) {
//     return <p>Story not found!</p>;
//   }

//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const contentRef = useRef<HTMLDivElement>(null);
//   const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

//   // Fake page content (in a real app, the story would be split into pages)
//   const [pages, setPages] = useState<string[]>([]);



//   useEffect(() => {
//     // Auto-hide controls after 3 seconds of inactivity
//     const handleMouseMove = () => {
//       setShowControls(true);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//       controlsTimeout.current = setTimeout(() => {
//         if (isFullscreen) {
//           setShowControls(false);
//         }
//       }, 3000);
//     };

//     document.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//     };
//   }, [isFullscreen]);

//   // Toggle fullscreen reading mode
//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       document.documentElement.requestFullscreen().then(() => {
//         setIsFullscreen(true);
//       }).catch(err => {
//         console.error('Error attempting to enable fullscreen:', err);
//       });
//     } else {
//       document.exitFullscreen().then(() => {
//         setIsFullscreen(false);
//       }).catch(err => {
//         console.error('Error attempting to exit fullscreen:', err);
//       });
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);

//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   const nextPage = () => {
//     if (currentPage < pages.length - 1) {
//       setCurrentPage(currentPage + 1);
//       if (contentRef.current) {
//         contentRef.current.scrollTop = 0;
//       }
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//       if (contentRef.current) {
//         contentRef.current.scrollTop = 0;
//       }
//     }
//   };

//   const handleFontSizeChange = (value: number[]) => {
//     setFontSize(value[0]);
//   };

//   const toggleLike = () => {
//     setLiked(!liked);
//     toast({
//       title: liked ? "Removed from favorites" : "Added to favorites",
//       description: liked ? "Story removed from your favorites" : "Story added to your favorites"
//     });
//   };

//   const toggleBookmark = () => {
//     setBookmarked(!bookmarked);
//     toast({
//       title: bookmarked ? "Bookmark removed" : "Bookmarked",
//       description: bookmarked ? "Reading progress will no longer be saved" : "Your reading progress will be saved"
//     });
//   };

//   const handleShare = () => {
//     // In a real app, this would open a share dialog
//     toast({
//       title: "Share this story",
//       description: "Sharing functionality would be implemented here"
//     });
//   };

//   const togglePlayback = () => {
//     // In a real app, this would control audio playback
//     setIsPlaying(!isPlaying);
//     toast({
//       title: isPlaying ? "Paused" : "Playing",
//       description: isPlaying ? "Audio narration paused" : "Audio narration started"
//     });
//   };

//   const exitReader = () => {
//     navigate(-1);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   if (!story) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4">
//         <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
//         <p className="text-muted-foreground mb-8">The story you're looking for doesn't exist or has been removed.</p>
//         <Button onClick={() => navigate('/library')}>Return to Library</Button>
//       </div>
//     );
//   }

//   const currentIllustration = story.illustrations.find(
//     (ill) => ill.position === currentPage + 1
//   );

//   const progressPercentage = ((currentPage + 1) / pages.length) * 100;

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${isFullscreen ? 'bg-white px-0' : 'bg-muted/20 px-4 py-6'
//         } transition-all duration-300`}
//     >
//       {/* Top Controls - only shown when not in fullscreen or when controls are visible */}
//       {(!isFullscreen || showControls) && (
//         <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between border-b animate-fade-in">
//           <Button variant="ghost" size="icon" onClick={exitReader} className="w-9 h-9">
//             <ArrowLeft size={20} />
//           </Button>

//           <div className="flex items-center">
//             <span className="text-sm text-muted-foreground mr-4">
//               Page {currentPage + 1} of {pages.length}
//             </span>
//             <Button variant="ghost" size="icon" className="w-9 h-9" onClick={toggleFullscreen}>
//               {isFullscreen ? <XCircle size={20} /> : <Type size={20} />}
//             </Button>
//           </div>
//         </div>
//       )}

//       <div className={`flex flex-col grow ${isFullscreen ? 'max-w-4xl mx-auto w-full' : 'container'}`}>
//         {/* Story Content */}
//         <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-6 mt-4">
//           {/* Story Illustration - Only show on larger screens or first page */}
//           {currentIllustration && (
//             <div className={`md:w-1/3 ${currentPage === 0 || !isFullscreen ? 'block' : 'hidden md:block'}`}>
//               <div className="sticky top-24">
//                 <img
//                   src={currentIllustration.imageUrl}
//                   alt={currentIllustration.caption || story.title}
//                   className="w-full h-auto rounded-lg shadow-md"
//                 />
//                 {currentIllustration.caption && (
//                   <p className="mt-2 text-sm text-center text-muted-foreground italic">
//                     {currentIllustration.caption}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Story Text */}
//           <div
//             ref={contentRef}
//             className={`flex-1 bg-white rounded-lg shadow-md p-6 md:p-8 ${isFullscreen ? 'max-h-[calc(100vh-12rem)]' : 'max-h-[calc(100vh-18rem)]'
//               } overflow-y-auto`}
//             style={{ fontSize: `${fontSize}px` }}
//           >
//             <h1 className="font-heading text-3xl font-bold mb-4 text-center md:text-left">{story.title}</h1>
//             <p className="text-muted-foreground mb-6 text-center md:text-left">By {story.author}</p>

//             <div
//               className="prose max-w-none"
//               dangerouslySetInnerHTML={{ __html: pages[currentPage] }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Controls */}
//       {(!isFullscreen || showControls) && (
//         <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md border-t p-4 animate-fade-in">
//           <div className="container flex flex-col gap-4">
//             {/* Progress Bar */}
//             <div className="w-full bg-muted rounded-full h-2">
//               <div
//                 className="bg-primary h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${progressPercentage}%` }}
//               ></div>
//             </div>

//             <div className="flex flex-wrap items-center justify-between gap-4">
//               {/* Page Navigation */}
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={prevPage}
//                   disabled={currentPage === 0}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <ChevronLeft size={18} />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={nextPage}
//                   disabled={currentPage === pages.length - 1}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <ChevronRight size={18} />
//                 </Button>
//               </div>

//               {/* Audio Controls */}
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={togglePlayback}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//                 </Button>
//                 <Volume2 size={18} className="text-muted-foreground ml-2" />
//                 <div className="w-24">
//                   <Slider defaultValue={[70]} max={100} step={10} />
//                 </div>
//               </div>

//               {/* Font Size Control */}
//               <div className="flex items-center gap-2">
//                 <Type size={14} className="text-muted-foreground" />
//                 <div className="w-24">
//                   <Slider
//                     value={[fontSize]}
//                     min={14}
//                     max={28}
//                     step={2}
//                     onValueChange={handleFontSizeChange}
//                   />
//                 </div>
//                 <Type size={20} className="text-muted-foreground" />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant={liked ? "default" : "outline"}
//                   size="icon"
//                   onClick={toggleLike}
//                   className={`h-9 w-9 rounded-full ${liked ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
//                 >
//                   <Heart size={18} className={liked ? 'fill-current' : ''} />
//                 </Button>
//                 <Button
//                   variant={bookmarked ? "default" : "outline"}
//                   size="icon"
//                   onClick={toggleBookmark}
//                   className={`h-9 w-9 rounded-full ${bookmarked ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
//                 >
//                   <BookmarkPlus size={18} />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={handleShare}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <Share2 size={18} />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Story } from "@/types";
// import {
//   Heart,
//   BookmarkPlus,
//   Share2,
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   Pause,
//   ArrowLeft,
//   XCircle,
//   Type,
//   Volume2,
//   RotateCcw
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// export default function StoryReader() {
//   const { id } = useParams<{ id: string }>();
//   const [loading, setLoading] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [bookmarked, setBookmarked] = useState(false);
//   const [fontSize, setFontSize] = useState(18);
//   const [playbackRate, setPlaybackRate] = useState(1.0);
//   const [progress, setProgress] = useState(0);
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const [contentLoaded, setContentLoaded] = useState(false);

//   const location = useLocation();
//   const story = location.state?.story as Story; // Get the passed story data

//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const contentRef = useRef<HTMLDivElement>(null);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
//   const wordsRef = useRef<HTMLSpanElement[]>([]);

//   useEffect(() => {
//     if (story) {
//       setLoading(false);
//       // Parse and insert the display_html content
//       if (contentRef.current) {
//         contentRef.current.innerHTML = story.display_html;

//         // After content is loaded, collect all word spans
//         const wordElements = contentRef.current.querySelectorAll('.word');
//         wordsRef.current = Array.from(wordElements) as HTMLSpanElement[];
//         setContentLoaded(true);
//       }
//     }
//   }, [story]);

//   useEffect(() => {
//     // Auto-hide controls after 3 seconds of inactivity
//     const handleMouseMove = () => {
//       setShowControls(true);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//       controlsTimeout.current = setTimeout(() => {
//         if (isFullscreen) {
//           setShowControls(false);
//         }
//       }, 3000);
//     };

//     document.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//     };
//   }, [isFullscreen]);

//   // Add audio time update event listener
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio || !contentLoaded) return;

//     const handleTimeUpdate = () => {
//       // Update progress
//       const currentProgress = (audio.currentTime / audio.duration) * 100;
//       setProgress(currentProgress);

//       // Highlight words based on current time
//       const currentTime = audio.currentTime * 1000; // Convert to milliseconds
//       highlightCurrentWord(currentTime);
//     };

//     const handleEnded = () => {
//       setIsPlaying(false);
//       // Remove highlight from last word
//       if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
//         wordsRef.current[currentWordIndex].classList.remove("highlight");
//       }
//       setCurrentWordIndex(-1);
//     };

//     audio.addEventListener('timeupdate', handleTimeUpdate);
//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('timeupdate', handleTimeUpdate);
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, [contentLoaded, currentWordIndex]);

//   // Function to highlight current word based on audio time
//   const highlightCurrentWord = (currentTime: number) => {
//     const words = wordsRef.current;
//     if (!words || words.length === 0) return;

//     for (let i = 0; i < words.length; i++) {
//       const word = words[i];
//       const wordStart = parseInt(word.id);
//       const nextWordStart = i < words.length - 1 ? parseInt(words[i + 1].id) : Infinity;

//       if (currentTime >= wordStart && currentTime < nextWordStart) {
//         if (currentWordIndex !== i) {
//           // Remove highlight from previous word
//           if (currentWordIndex >= 0 && words[currentWordIndex]) {
//             words[currentWordIndex].classList.remove("highlight");
//           }

//           // Highlight current word
//           word.classList.add("highlight");
//           setCurrentWordIndex(i);

//           // Scroll to make the highlighted word visible
//           word.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//         break;
//       }
//     }
//   };

//   // Toggle fullscreen reading mode
//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       document.documentElement.requestFullscreen().then(() => {
//         setIsFullscreen(true);
//       }).catch(err => {
//         console.error('Error attempting to enable fullscreen:', err);
//       });
//     } else {
//       document.exitFullscreen().then(() => {
//         setIsFullscreen(false);
//       }).catch(err => {
//         console.error('Error attempting to exit fullscreen:', err);
//       });
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);

//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   const handleFontSizeChange = (value: number[]) => {
//     setFontSize(value[0]);
//   };

//   const handlePlaybackRateChange = (value: number[]) => {
//     const rate = value[0];
//     setPlaybackRate(rate);
//     if (audioRef.current) {
//       audioRef.current.playbackRate = rate;
//     }
//   };

//   const toggleLike = () => {
//     setLiked(!liked);
//     toast({
//       title: liked ? "Removed from favorites" : "Added to favorites",
//       description: liked ? "Story removed from your favorites" : "Story added to your favorites"
//     });
//   };

//   const toggleBookmark = () => {
//     setBookmarked(!bookmarked);
//     toast({
//       title: bookmarked ? "Bookmark removed" : "Bookmarked",
//       description: bookmarked ? "Reading progress will no longer be saved" : "Your reading progress will be saved"
//     });
//   };

//   const handleShare = () => {
//     toast({
//       title: "Share this story",
//       description: "Sharing functionality would be implemented here"
//     });
//   };

//   const togglePlayback = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//     } else {
//       audio.play().then(() => {
//         setIsPlaying(true);
//       }).catch(e => {
//         console.error('Error playing audio:', e);
//         toast({
//           title: "Playback Error",
//           description: "There was an error playing the audio",
//           variant: "destructive"
//         });
//       });
//     }
//   };

//   const resetAudio = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.pause();
//     audio.currentTime = 0;
//     setIsPlaying(false);

//     // Remove highlight from current word
//     if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
//       wordsRef.current[currentWordIndex].classList.remove("highlight");
//     }
//     setCurrentWordIndex(-1);
//     setProgress(0);
//   };

//   const handleWordClick = (word: HTMLSpanElement) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     // Get the timestamp from the word's id
//     const timestamp = parseInt(word.id) / 1000;

//     // Set audio time to this position
//     audio.currentTime = timestamp;

//     // Remove highlight from all words
//     wordsRef.current.forEach(w => w.classList.remove("highlight"));

//     // Highlight clicked word
//     word.classList.add("highlight");
//     setCurrentWordIndex(wordsRef.current.indexOf(word));

//     // Play the audio from this position
//     audio.play().then(() => {
//       setIsPlaying(true);
//     }).catch(e => {
//       console.error('Error playing audio:', e);
//     });
//   };

//   // Add click event listeners to all words after content is rendered
//   useEffect(() => {
//     if (!contentLoaded) return;

//     const words = wordsRef.current;
//     words.forEach(word => {
//       word.addEventListener('click', () => handleWordClick(word));
//     });

//     return () => {
//       words.forEach(word => {
//         word.removeEventListener('click', () => handleWordClick(word));
//       });
//     };
//   }, [contentLoaded]);

//   const exitReader = () => {
//     navigate(-1);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   if (!story) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4">
//         <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
//         <p className="text-muted-foreground mb-8">The story you're looking for doesn't exist or has been removed.</p>
//         <Button onClick={() => navigate('/library')}>Return to Library</Button>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${isFullscreen ? 'bg-white px-0' : 'bg-muted/20 px-4 py-6'} transition-all duration-300`}
//     >
//       {/* Hidden audio player */}
//       <audio ref={audioRef} style={{ display: 'none' }}>
//         <source src={story.audio_file} type="audio/mp3" />
//         Your browser does not support the audio element.
//       </audio>

//       {/* Top Controls */}
//       {(!isFullscreen || showControls) && (
//         <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between border-b animate-fade-in">
//           <Button variant="ghost" size="icon" onClick={exitReader} className="w-9 h-9">
//             <ArrowLeft size={20} />
//           </Button>

//           <div className="flex items-center gap-2">
//             <span className="text-sm text-muted-foreground">
//               {story.title} - {story.language}
//             </span>
//             <Button variant="ghost" size="icon" className="w-9 h-9" onClick={toggleFullscreen}>
//               {isFullscreen ? <XCircle size={20} /> : <Type size={20} />}
//             </Button>
//           </div>
//         </div>
//       )}

//       <div className={`flex flex-col grow ${isFullscreen ? 'max-w-4xl mx-auto w-full' : 'container'}`}>
//         {/* Cover Image - Show only when not in read-along mode */}
//         {!isPlaying && (
//           <div className="mt-6 mb-8 text-center">
//             <img
//               src={story.cover_image}
//               alt={story.title}
//               className="mx-auto h-48 object-cover rounded-lg shadow-md"
//             />
//           </div>
//         )}

//         {/* Story Content */}
//         <div className="flex-1 bg-white rounded-lg shadow-md p-6 md:p-8 overflow-y-auto mb-20">
//           <h1 className="font-heading text-3xl font-bold mb-4 text-center">{story.title}</h1>

//           <div
//             ref={contentRef}
//             className="text-container"
//             style={{ fontSize: `${fontSize}px` }}
//           />
//         </div>
//       </div>

//       {/* Bottom Controls */}
//       {(!isFullscreen || showControls) && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md border-t p-4 animate-fade-in">
//           <div className="container flex flex-col gap-4">
//             {/* Progress Bar */}
//             <div className="w-full bg-muted rounded-full h-2">
//               <div
//                 className="bg-primary h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${progress}%` }}
//               ></div>
//             </div>

//             <div className="flex flex-wrap items-center justify-between gap-4">
//               {/* Audio Playback Controls */}
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={togglePlayback}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={resetAudio}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <RotateCcw size={18} />
//                 </Button>
//               </div>

//               {/* Speed Control */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-muted-foreground">Speed:</span>
//                 <div className="w-24">
//                   <Slider
//                     value={[playbackRate]}
//                     min={0.7}
//                     max={1.0}
//                     step={0.1}
//                     onValueChange={handlePlaybackRateChange}
//                   />
//                 </div>
//                 <span className="text-sm">{playbackRate.toFixed(1)}×</span>
//               </div>

//               {/* Volume Control */}
//               <div className="flex items-center gap-2">
//                 <Volume2 size={18} className="text-muted-foreground" />
//                 <div className="w-24">
//                   <Slider defaultValue={[70]} max={100} step={10} />
//                 </div>
//               </div>

//               {/* Font Size Control */}
//               <div className="flex items-center gap-2">
//                 <Type size={14} className="text-muted-foreground" />
//                 <div className="w-24">
//                   <Slider
//                     value={[fontSize]}
//                     min={14}
//                     max={28}
//                     step={2}
//                     onValueChange={handleFontSizeChange}
//                   />
//                 </div>
//                 <Type size={20} className="text-muted-foreground" />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant={liked ? "default" : "outline"}
//                   size="icon"
//                   onClick={toggleLike}
//                   className={`h-9 w-9 rounded-full ${liked ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
//                 >
//                   <Heart size={18} className={liked ? 'fill-current' : ''} />
//                 </Button>
//                 <Button
//                   variant={bookmarked ? "default" : "outline"}
//                   size="icon"
//                   onClick={toggleBookmark}
//                   className={`h-9 w-9 rounded-full ${bookmarked ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
//                 >
//                   <BookmarkPlus size={18} />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={handleShare}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <Share2 size={18} />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Story } from "@/types";
// import {
//   Heart,
//   BookmarkPlus,
//   Share2,
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   Pause,
//   ArrowLeft,
//   XCircle,
//   Type,
//   Volume2,
//   RotateCcw
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// export default function StoryReader() {
//   const { id } = useParams<{ id: string }>();
//   const [loading, setLoading] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [bookmarked, setBookmarked] = useState(false);
//   const [fontSize, setFontSize] = useState(18);
//   const [playbackRate, setPlaybackRate] = useState(1.0);
//   const [progress, setProgress] = useState(0);
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const [contentLoaded, setContentLoaded] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(70);

//   const location = useLocation();
//   const story = location.state?.story as Story; // Get the passed story data

//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const contentRef = useRef<HTMLDivElement>(null);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
//   const wordsRef = useRef<HTMLSpanElement[]>([]);
//   const animationRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (story) {
//       setLoading(false);
//     }
//   }, [story]);

//   // Setup the content after the component mounts
//   useEffect(() => {
//     if (!loading && contentRef.current && story) {
//       // Set the HTML content
//       contentRef.current.innerHTML = story.display_html;

//       // After content is loaded, collect all word spans
//       const wordElements = contentRef.current.querySelectorAll('.word');
//       wordsRef.current = Array.from(wordElements) as HTMLSpanElement[];

//       // Add click event listeners to all words
//       wordsRef.current.forEach(word => {
//         word.addEventListener('click', () => handleWordClick(word));
//       });

//       setContentLoaded(true);
//     }
//   }, [loading, story]);

//   // Add cleanup for event listeners
//   useEffect(() => {
//     return () => {
//       if (wordsRef.current.length > 0) {
//         wordsRef.current.forEach(word => {
//           word.removeEventListener('click', () => { });
//         });
//       }

//       // Cancel any ongoing animation frame
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     // Auto-hide controls after 3 seconds of inactivity
//     const handleMouseMove = () => {
//       setShowControls(true);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//       controlsTimeout.current = setTimeout(() => {
//         if (isFullscreen) {
//           setShowControls(false);
//         }
//       }, 3000);
//     };

//     document.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//     };
//   }, [isFullscreen]);

//   // Setup audio event listeners
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const handleLoadedMetadata = () => {
//       setDuration(audio.duration);
//     };

//     const handleEnded = () => {
//       setIsPlaying(false);
//       // Remove highlight from last word
//       if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
//         wordsRef.current[currentWordIndex].classList.remove("highlight");
//       }
//       setCurrentWordIndex(-1);
//       setProgress(0);

//       // Cancel any ongoing animation
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };

//     audio.addEventListener('loadedmetadata', handleLoadedMetadata);
//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, [currentWordIndex]);

//   // Function to update highlights and progress in animation frame
//   const updateHighlightsAndProgress = () => {
//     const audio = audioRef.current;
//     if (!audio || audio.paused) return;

//     // Update current time and progress
//     setCurrentTime(audio.currentTime);
//     const currentProgress = (audio.currentTime / audio.duration) * 100;
//     setProgress(currentProgress);

//     // Highlight words based on current time
//     const currentTimeMs = audio.currentTime * 1000; // Convert to milliseconds
//     highlightCurrentWord(currentTimeMs);

//     // Request next animation frame if audio is playing
//     if (!audio.paused) {
//       animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//     }
//   };

//   // Effect to start/stop the animation frame loop
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//     } else if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isPlaying]);

//   // Function to highlight current word based on audio time
//   const highlightCurrentWord = (currentTimeMs: number) => {
//     const words = wordsRef.current;
//     if (!words || words.length === 0) return;

//     let newIndex = -1; // Initialize with -1 in case no word matches

//     for (let i = 0; i < words.length; i++) {
//       const word = words[i];
//       const wordStart = parseInt(word.id);
//       const nextWordStart = i < words.length - 1 ? parseInt(words[i + 1].id) : Infinity;

//       if (currentTimeMs >= wordStart && currentTimeMs < nextWordStart) {
//         newIndex = i;
//         break;
//       }
//     }

//     if (newIndex !== currentWordIndex) {
//       // Remove highlight from all words
//       words.forEach(word => word.classList.remove("highlight"));

//       // Highlight the new current word
//       if (newIndex >= 0 && words[newIndex]) {
//         words[newIndex].classList.add("highlight");
//         words[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }

//       setCurrentWordIndex(newIndex);
//     }
//   };


//   // Toggle fullscreen reading mode
//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       document.documentElement.requestFullscreen().then(() => {
//         setIsFullscreen(true);
//       }).catch(err => {
//         console.error('Error attempting to enable fullscreen:', err);
//       });
//     } else {
//       document.exitFullscreen().then(() => {
//         setIsFullscreen(false);
//       }).catch(err => {
//         console.error('Error attempting to exit fullscreen:', err);
//       });
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);

//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   // Format time for display (mm:ss)
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const handleFontSizeChange = (value: number[]) => {
//     setFontSize(value[0]);
//   };

//   const handlePlaybackRateChange = (value: number[]) => {
//     const rate = value[0];
//     setPlaybackRate(rate);
//     if (audioRef.current) {
//       audioRef.current.playbackRate = rate;
//     }
//   };

//   const handleVolumeChange = (value: number[]) => {
//     const vol = value[0];
//     setVolume(vol);
//     if (audioRef.current) {
//       audioRef.current.volume = vol / 100;
//     }
//   };

//   const toggleLike = () => {
//     setLiked(!liked);
//     toast({
//       title: liked ? "Removed from favorites" : "Added to favorites",
//       description: liked ? "Story removed from your favorites" : "Story added to your favorites"
//     });
//   };

//   const toggleBookmark = () => {
//     setBookmarked(!bookmarked);
//     toast({
//       title: bookmarked ? "Bookmark removed" : "Bookmarked",
//       description: bookmarked ? "Reading progress will no longer be saved" : "Your reading progress will be saved"
//     });
//   };

//   const handleShare = () => {
//     toast({
//       title: "Share this story",
//       description: "Sharing functionality would be implemented here"
//     });
//   };

//   const togglePlayback = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     } else {
//       audio.play().then(() => {
//         setIsPlaying(true);
//         animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//       }).catch(e => {
//         console.error('Error playing audio:', e);
//         toast({
//           title: "Playback Error",
//           description: "There was an error playing the audio",
//           variant: "destructive"
//         });
//       });
//     }
//   };

//   const resetAudio = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.pause();
//     audio.currentTime = 0;
//     setIsPlaying(false);
//     setCurrentTime(0);

//     // Remove highlight from current word
//     if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
//       wordsRef.current[currentWordIndex].classList.remove("highlight");
//     }
//     setCurrentWordIndex(-1);
//     setProgress(0);

//     // Cancel any ongoing animation
//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }
//   };

//   const handleWordClick = (word: HTMLSpanElement) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     // Get the timestamp from the word's id
//     const timestamp = parseInt(word.id) / 1000;

//     // Set audio time to this position
//     audio.currentTime = timestamp;
//     setCurrentTime(timestamp);

//     // Remove highlight from all words
//     wordsRef.current.forEach(w => w.classList.remove("highlight"));

//     // Highlight clicked word
//     word.classList.add("highlight");
//     setCurrentWordIndex(wordsRef.current.indexOf(word));

//     // Play the audio from this position
//     audio.play().then(() => {
//       setIsPlaying(true);
//       animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//     }).catch(e => {
//       console.error('Error playing audio:', e);
//     });
//   };

//   const exitReader = () => {
//     navigate(-1);
//   };

//   // Add progress bar click functionality
//   const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const progressBar = e.currentTarget;
//     const rect = progressBar.getBoundingClientRect();
//     const clickPosition = (e.clientX - rect.left) / rect.width;
//     const newTime = audio.duration * clickPosition;

//     audio.currentTime = newTime;
//     setCurrentTime(newTime);

//     // If we're not already playing, start playback
//     if (!isPlaying) {
//       togglePlayback();
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   if (!story) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4">
//         <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
//         <p className="text-muted-foreground mb-8">The story you're looking for doesn't exist or has been removed.</p>
//         <Button onClick={() => navigate('/library')}>Return to Library</Button>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${isFullscreen ? 'bg-white px-0' : 'bg-muted/20 px-4 py-2'} transition-all duration-300 rounded-sm`}
//     >
//       {/* Hidden audio player */}
//       <audio ref={audioRef} style={{ display: 'none' }}>
//         <source src={story.audio_file} type="audio/mp3" />
//         Your browser does not support the audio element.
//       </audio>

//       {/* Top Controls */}
//       {(!isFullscreen || showControls) && (
//         <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between border-b animate-fade-in rounded-sm">
//           <Button variant="ghost" size="icon" onClick={exitReader} className="w-9 h-9">
//             <ArrowLeft size={20} />
//           </Button>

//           <div className="flex items-center gap-2">
//             <span className="text-sm text-muted-foreground">
//               {story.title} - {story.language}
//             </span>
//             <Button variant="ghost" size="icon" className="w-9 h-9" onClick={toggleFullscreen}>
//               {isFullscreen ? <XCircle size={20} /> : <Type size={20} />}
//             </Button>
//           </div>
//         </div>
//       )}

//       <div className={`flex flex-col grow ${isFullscreen ? 'max-w-4xl mx-auto w-full' : 'container'}`}>
//         {/* Cover Image - Show only when not in read-along mode */}
//         {!isPlaying && (
//           <div className="mt-6 mb-8 text-center">
//             <img
//               src={story.cover_image}
//               alt={story.title}
//               className="mx-auto h-48 object-cover rounded-lg shadow-md"
//             />
//           </div>
//         )}

//         {/* Story Content */}
//         <div className="flex-1 bg-white rounded-lg shadow-md p-6 md:p-8 overflow-y-auto mb-20">
//           <h1 className="font-heading text-3xl font-bold mb-4 text-center">{story.title}</h1>

//           {/* Text container with styling similar to the HTML example */}
//           <div
//             className="text-container bg-gray-100 p-6 rounded-lg my-6 text-left"
//             style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
//           >
//             {/* This div will contain the rendered HTML content */}
//             <div ref={contentRef} />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Controls */}
//       {(!isFullscreen || showControls) && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md border-t p-4 animate-fade-in">
//           <div className="container flex flex-col gap-4">
//             {/* Progress Bar */}
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
//               <div
//                 className="flex-1 bg-muted rounded-full h-2 cursor-pointer"
//                 onClick={handleProgressBarClick}
//               >
//                 <div
//                   className="bg-primary h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//               <span className="text-sm text-muted-foreground">{formatTime(duration)}</span>
//             </div>

//             <div className="flex flex-wrap items-center justify-between gap-4">
//               {/* Audio Playback Controls */}
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={togglePlayback}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={resetAudio}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <RotateCcw size={18} />
//                 </Button>
//               </div>

//               {/* Speed Control */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-muted-foreground">Speed:</span>
//                 <div className="w-24">
//                   <Slider
//                     value={[playbackRate]}
//                     min={0.7}
//                     max={1.0}
//                     step={0.1}
//                     onValueChange={handlePlaybackRateChange}
//                   />
//                 </div>
//                 <span className="text-sm">{playbackRate.toFixed(1)}×</span>
//               </div>

//               {/* Volume Control */}
//               <div className="flex items-center gap-2">
//                 <Volume2 size={18} className="text-muted-foreground" />
//                 <div className="w-24">
//                   <Slider
//                     value={[volume]}
//                     max={100}
//                     step={10}
//                     onValueChange={handleVolumeChange}
//                   />
//                 </div>
//               </div>

//               {/* Font Size Control */}
//               <div className="flex items-center gap-2">
//                 <Type size={14} className="text-muted-foreground" />
//                 <div className="w-24">
//                   <Slider
//                     value={[fontSize]}
//                     min={14}
//                     max={28}
//                     step={2}
//                     onValueChange={handleFontSizeChange}
//                   />
//                 </div>
//                 <Type size={20} className="text-muted-foreground" />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant={liked ? "default" : "outline"}
//                   size="icon"
//                   onClick={toggleLike}
//                   className={`h-9 w-9 rounded-full ${liked ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
//                 >
//                   <Heart size={18} className={liked ? 'fill-current' : ''} />
//                 </Button>
//                 <Button
//                   variant={bookmarked ? "default" : "outline"}
//                   size="icon"
//                   onClick={toggleBookmark}
//                   className={`h-9 w-9 rounded-full ${bookmarked ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
//                 >
//                   <BookmarkPlus size={18} />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={handleShare}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <Share2 size={18} />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add CSS for highlighting */}
//       <style>
//         {`
//     .highlight {
//       background-color: #FFEB3B;
//       border-radius: 3px;
//     }

//     .word {
//       display: inline-block;
//       margin: 0 1px;
//       cursor: pointer;
//       padding: 2px 3px;
//       border-radius: 3px;
//       transition: background-color 0.2s;
//     }


//   `}
//       </style>

//     </div>
//   );
// }


// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Story } from "@/types";
// import {
//   Heart,
//   BookmarkPlus,
//   Share2,
//   Play,
//   Pause,
//   RotateCcw,
//   Volume2,
//   Type,
//   ArrowLeft,
//   XCircle,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// export default function StoryReader() {
//   const { id } = useParams<{ id: string }>();
//   const [loading, setLoading] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [bookmarked, setBookmarked] = useState(false);
//   const [fontSize, setFontSize] = useState(18);
//   const [playbackRate, setPlaybackRate] = useState(1.0);
//   const [progress, setProgress] = useState(0);
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(70);

//   const location = useLocation();
//   const story = location.state?.story as Story;

//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const contentRef = useRef<HTMLDivElement>(null);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
//   const wordsRef = useRef<HTMLSpanElement[]>([]);
//   const animationRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (story) {
//       setLoading(false);
//     }
//   }, [story]);

//   useEffect(() => {
//     if (!loading && contentRef.current && story) {
//       contentRef.current.innerHTML = story.display_html;
//       const wordElements = contentRef.current.querySelectorAll('.word');
//       wordsRef.current = Array.from(wordElements) as HTMLSpanElement[];

//       wordsRef.current.forEach(word => {
//         word.addEventListener('click', () => handleWordClick(word));
//       });

//       // setContentLoaded(true);
//     }
//   }, [loading, story]);

//   useEffect(() => {
//     return () => {
//       wordsRef.current.forEach(word => {
//         word.removeEventListener('click', () => { });
//       });
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = () => {
//       setShowControls(true);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//       controlsTimeout.current = setTimeout(() => {
//         if (isFullscreen) {
//           setShowControls(false);
//         }
//       }, 3000);
//     };

//     document.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//     };
//   }, [isFullscreen]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const handleLoadedMetadata = () => {
//       setDuration(audio.duration);
//     };

//     const handleEnded = () => {
//       setIsPlaying(false);
//       if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
//         wordsRef.current[currentWordIndex].classList.remove("highlight");
//       }
//       setCurrentWordIndex(-1);
//       setProgress(0);

//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };

//     audio.addEventListener('loadedmetadata', handleLoadedMetadata);
//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, [currentWordIndex]);

//   const updateHighlightsAndProgress = () => {
//     const audio = audioRef.current;
//     if (!audio || audio.paused) return;

//     setCurrentTime(audio.currentTime);
//     const currentProgress = (audio.currentTime / audio.duration) * 100;
//     setProgress(currentProgress);

//     const currentTimeMs = audio.currentTime * 1000;
//     highlightCurrentWord(currentTimeMs);

//     if (!audio.paused) {
//       animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//     }
//   };

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//     } else if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isPlaying]);

//   const highlightCurrentWord = (currentTimeMs: number) => {
//     const words = wordsRef.current;
//     if (!words || words.length === 0) return;

//     let newIndex = -1;

//     for (let i = 0; i < words.length; i++) {
//       const word = words[i];
//       const wordStart = parseInt(word.id);
//       const nextWordStart = i < words.length - 1 ? parseInt(words[i + 1].id) : Infinity;

//       if (currentTimeMs >= wordStart && currentTimeMs < nextWordStart) {
//         newIndex = i;
//         break;
//       }
//     }

//     if (newIndex !== currentWordIndex) {
//       words.forEach(word => word.classList.remove("highlight"));
//       if (newIndex >= 0 && words[newIndex]) {
//         words[newIndex].classList.add("highlight");
//         words[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       setCurrentWordIndex(newIndex);
//     }
//   };

//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       document.documentElement.requestFullscreen().then(() => {
//         setIsFullscreen(true);
//       }).catch(err => {
//         console.error('Error attempting to enable fullscreen:', err);
//       });
//     } else {
//       document.exitFullscreen().then(() => {
//         setIsFullscreen(false);
//       }).catch(err => {
//         console.error('Error attempting to exit fullscreen:', err);
//       });
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);

//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const handleFontSizeChange = (value: number[]) => {
//     setFontSize(value[0]);
//   };

//   const handlePlaybackRateChange = (value: number[]) => {
//     const rate = value[0];
//     setPlaybackRate(rate);
//     if (audioRef.current) {
//       audioRef.current.playbackRate = rate;
//     }
//   };

//   const handleVolumeChange = (value: number[]) => {
//     const vol = value[0];
//     setVolume(vol);
//     if (audioRef.current) {
//       audioRef.current.volume = vol / 100;
//     }
//   };

//   const toggleLike = () => {
//     setLiked(!liked);
//     toast({
//       title: liked ? "Removed from favorites" : "Added to favorites",
//       description: liked ? "Story removed from your favorites" : "Story added to your favorites"
//     });
//   };

//   const toggleBookmark = () => {
//     setBookmarked(!bookmarked);
//     toast({
//       title: bookmarked ? "Bookmark removed" : "Bookmarked",
//       description: bookmarked ? "Reading progress will no longer be saved" : "Your reading progress will be saved"
//     });
//   };

//   const handleShare = () => {
//     toast({
//       title: "Share this story",
//       description: "Sharing functionality would be implemented here"
//     });
//   };

//   const togglePlayback = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     } else {
//       audio.play().then(() => {
//         setIsPlaying(true);
//         animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//       }).catch(e => {
//         console.error('Error playing audio:', e);
//         toast({
//           title: "Playback Error",
//           description: "There was an error playing the audio",
//           variant: "destructive"
//         });
//       });
//     }
//   };

//   const resetAudio = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.pause();
//     audio.currentTime = 0;
//     setIsPlaying(false);
//     setCurrentTime(0);

//     if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
//       wordsRef.current[currentWordIndex].classList.remove("highlight");
//     }
//     setCurrentWordIndex(-1);
//     setProgress(0);

//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }
//   };

//   const handleWordClick = (word: HTMLSpanElement) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const timestamp = parseInt(word.id) / 1000;
//     audio.currentTime = timestamp;
//     setCurrentTime(timestamp);

//     wordsRef.current.forEach(w => w.classList.remove("highlight"));
//     word.classList.add("highlight");
//     setCurrentWordIndex(wordsRef.current.indexOf(word));

//     audio.play().then(() => {
//       setIsPlaying(true);
//       animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//     }).catch(e => {
//       console.error('Error playing audio:', e);
//     });
//   };

//   const exitReader = () => {
//     navigate(-1);
//   };

//   const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const progressBar = e.currentTarget;
//     const rect = progressBar.getBoundingClientRect();
//     const clickPosition = (e.clientX - rect.left) / rect.width;
//     const newTime = audio.duration * clickPosition;

//     audio.currentTime = newTime;
//     setCurrentTime(newTime);

//     if (!isPlaying) {
//       togglePlayback();
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   if (!story) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4">
//         <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
//         <p className="text-muted-foreground mb-8">The story you're looking for doesn't exist or has been removed.</p>
//         <Button onClick={() => navigate('/library')}>Return to Library</Button>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${isFullscreen ? 'bg-white px-0' : 'bg-muted/20 px-4 py-2'} transition-all duration-300 rounded-sm`}
//     >
//       <audio ref={audioRef} style={{ display: 'none' }}>
//         <source src={story.audio_file} type="audio/mp3" />
//         Your browser does not support the audio element.
//       </audio>

//       {(!isFullscreen || showControls) && (
//         <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between border-b animate-fade-in rounded-sm">
//           <Button variant="ghost" size="icon" onClick={exitReader} className="w-9 h-9">
//             <ArrowLeft size={20} />
//           </Button>

//           <div className="flex items-center gap-2">
//             <span className="text-sm text-muted-foreground">
//               {story.title} - {story.language}
//             </span>
//             <Button variant="ghost" size="icon" className="w-9 h-9" onClick={toggleFullscreen}>
//               {isFullscreen ? <XCircle size={20} /> : <Type size={20} />}
//             </Button>
//           </div>
//         </div>
//       )}

//       <div className={`flex flex-col grow ${isFullscreen ? 'max-w-4xl mx-auto w-full' : 'container'}`}>
//         <div className="flex flex-row gap-8 mt-6">
//           {/* Cover Image on the Left */}
//           <div className="w-1/3">
//             <img
//               src={story.cover_image}
//               alt={story.title}
//               className="w-full h-auto object-cover rounded-lg shadow-md"
//             />
//           </div>

//           {/* Story Content on the Right */}
//           <div className="w-2/3 bg-white rounded-lg shadow-md p-6 md:p-8 overflow-y-auto">
//             <h1 className="font-heading text-3xl font-bold mb-4 text-center">{story.title}</h1>
//             <div
//               className="text-container bg-gray-100 p-6 rounded-lg my-6 text-left"
//               style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
//             >
//               <div ref={contentRef} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {(!isFullscreen || showControls) && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md border-t p-4 animate-fade-in">
//           <div className="container flex flex-col gap-4">
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
//               <div
//                 className="flex-1 bg-muted rounded-full h-2 cursor-pointer"
//                 onClick={handleProgressBarClick}
//               >
//                 <div
//                   className="bg-primary h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//               <span className="text-sm text-muted-foreground">{formatTime(duration)}</span>
//             </div>

//             <div className="flex flex-wrap items-center justify-between gap-4">
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={togglePlayback}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={resetAudio}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <RotateCcw size={18} />
//                 </Button>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-muted-foreground">Speed:</span>
//                 <div className="w-24">
//                   <Slider
//                     value={[playbackRate]}
//                     min={0.7}
//                     max={1.0}
//                     step={0.1}
//                     onValueChange={handlePlaybackRateChange}
//                   />
//                 </div>
//                 <span className="text-sm">{playbackRate.toFixed(1)}×</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Volume2 size={18} className="text-muted-foreground" />
//                 <div className="w-24">
//                   <Slider
//                     value={[volume]}
//                     max={100}
//                     step={10}
//                     onValueChange={handleVolumeChange}
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Type size={14} className="text-muted-foreground" />
//                 <div className="w-24">
//                   <Slider
//                     value={[fontSize]}
//                     min={14}
//                     max={28}
//                     step={2}
//                     onValueChange={handleFontSizeChange}
//                   />
//                 </div>
//                 <Type size={20} className="text-muted-foreground" />
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   variant={liked ? "default" : "outline"}
//                   size="icon"
//                   onClick={toggleLike}
//                   className={`h-9 w-9 rounded-full ${liked ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
//                 >
//                   <Heart size={18} className={liked ? 'fill-current' : ''} />
//                 </Button>
//                 <Button
//                   variant={bookmarked ? "default" : "outline"}
//                   size="icon"
//                   onClick={toggleBookmark}
//                   className={`h-9 w-9 rounded-full ${bookmarked ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
//                 >
//                   <BookmarkPlus size={18} />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={handleShare}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <Share2 size={18} />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           .highlight {
//             background-color: #FFEB3B;
//             border-radius: 3px;
//           }

//           .word {
//             display: inline-block;
//             margin: 0 1px;
//             cursor: pointer;
//             padding: 2px 3px;
//             border-radius: 3px;
//             transition: background-color 0.2s;
//           }
//         `}
//       </style>
//     </div>
//   );
// }


// import { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Story } from "@/types";
// import {
//   Heart,
//   BookmarkPlus,
//   Share2,
//   Play,
//   Pause,
//   RotateCcw,
//   Volume2,
//   Type,
//   ArrowLeft,
//   XCircle,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// export default function StoryReader() {
//   const { id } = useParams<{ id: string }>();
//   const [loading, setLoading] = useState(true);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [bookmarked, setBookmarked] = useState(false);
//   const [fontSize, setFontSize] = useState(18);
//   const [playbackRate, setPlaybackRate] = useState(1.0);
//   const [progress, setProgress] = useState(0);
//   const [currentWordIndex, setCurrentWordIndex] = useState(-1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(70);

//   const location = useLocation();
//   const story = location.state?.story as Story;

//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const contentRef = useRef<HTMLDivElement>(null);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
//   const wordsRef = useRef<HTMLSpanElement[]>([]);
//   const animationRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (story) {
//       setLoading(false);
//     }
//   }, [story]);

//   useEffect(() => {
//     if (!loading && contentRef.current && story) {
//       contentRef.current.innerHTML = story.display_html;
//       const wordElements = contentRef.current.querySelectorAll('.word');
//       wordsRef.current = Array.from(wordElements) as HTMLSpanElement[];

//       wordsRef.current.forEach(word => {
//         word.addEventListener('click', () => handleWordClick(word));
//       });

//       // setContentLoaded(true);
//     }
//   }, [loading, story]);

//   useEffect(() => {
//     return () => {
//       wordsRef.current.forEach(word => {
//         word.removeEventListener('click', () => { });
//       });
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = () => {
//       setShowControls(true);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//       controlsTimeout.current = setTimeout(() => {
//         if (isFullscreen) {
//           setShowControls(false);
//         }
//       }, 3000);
//     };

//     document.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       if (controlsTimeout.current) {
//         clearTimeout(controlsTimeout.current);
//       }
//     };
//   }, [isFullscreen]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const handleLoadedMetadata = () => {
//       setDuration(audio.duration);
//     };

//     const handleEnded = () => {
//       setIsPlaying(false);
//       if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
//         wordsRef.current[currentWordIndex].classList.remove("highlight");
//       }
//       setCurrentWordIndex(-1);
//       setProgress(0);

//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };

//     audio.addEventListener('loadedmetadata', handleLoadedMetadata);
//     audio.addEventListener('ended', handleEnded);

//     return () => {
//       audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//       audio.removeEventListener('ended', handleEnded);
//     };
//   }, [currentWordIndex]);

//   const updateHighlightsAndProgress = () => {
//     const audio = audioRef.current;
//     if (!audio || audio.paused) return;

//     setCurrentTime(audio.currentTime);
//     const currentProgress = (audio.currentTime / audio.duration) * 100;
//     setProgress(currentProgress);

//     const currentTimeMs = audio.currentTime * 1000;
//     highlightCurrentWord(currentTimeMs);

//     if (!audio.paused) {
//       animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//     }
//   };

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//     } else if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isPlaying]);

//   const highlightCurrentWord = (currentTimeMs: number) => {
//     const words = wordsRef.current;
//     if (!words || words.length === 0) return;

//     let newIndex = -1;

//     for (let i = 0; i < words.length; i++) {
//       const word = words[i];
//       const wordStart = parseInt(word.id);
//       const nextWordStart = i < words.length - 1 ? parseInt(words[i + 1].id) : Infinity;

//       if (currentTimeMs >= wordStart && currentTimeMs < nextWordStart) {
//         newIndex = i;
//         break;
//       }
//     }

//     if (newIndex !== currentWordIndex) {
//       words.forEach(word => word.classList.remove("highlight"));
//       if (newIndex >= 0 && words[newIndex]) {
//         words[newIndex].classList.add("highlight");
//         words[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       setCurrentWordIndex(newIndex);
//     }
//   };

//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       document.documentElement.requestFullscreen().then(() => {
//         setIsFullscreen(true);
//       }).catch(err => {
//         console.error('Error attempting to enable fullscreen:', err);
//       });
//     } else {
//       document.exitFullscreen().then(() => {
//         setIsFullscreen(false);
//       }).catch(err => {
//         console.error('Error attempting to exit fullscreen:', err);
//       });
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);

//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const handleFontSizeChange = (value: number[]) => {
//     setFontSize(value[0]);
//   };

//   const handlePlaybackRateChange = (value: number[]) => {
//     const rate = value[0];
//     setPlaybackRate(rate);
//     if (audioRef.current) {
//       audioRef.current.playbackRate = rate;
//     }
//   };

//   const handleVolumeChange = (value: number[]) => {
//     const vol = value[0];
//     setVolume(vol);
//     if (audioRef.current) {
//       audioRef.current.volume = vol / 100;
//     }
//   };

//   const toggleLike = () => {
//     setLiked(!liked);
//     toast({
//       title: liked ? "Removed from favorites" : "Added to favorites",
//       description: liked ? "Story removed from your favorites" : "Story added to your favorites"
//     });
//   };

//   const toggleBookmark = () => {
//     setBookmarked(!bookmarked);
//     toast({
//       title: bookmarked ? "Bookmark removed" : "Bookmarked",
//       description: bookmarked ? "Reading progress will no longer be saved" : "Your reading progress will be saved"
//     });
//   };

//   const handleShare = () => {
//     toast({
//       title: "Share this story",
//       description: "Sharing functionality would be implemented here"
//     });
//   };

//   const togglePlayback = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     } else {
//       audio.play().then(() => {
//         setIsPlaying(true);
//         animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//       }).catch(e => {
//         console.error('Error playing audio:', e);
//         toast({
//           title: "Playback Error",
//           description: "There was an error playing the audio",
//           variant: "destructive"
//         });
//       });
//     }
//   };

//   const resetAudio = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.pause();
//     audio.currentTime = 0;
//     setIsPlaying(false);
//     setCurrentTime(0);

//     if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
//       wordsRef.current[currentWordIndex].classList.remove("highlight");
//     }
//     setCurrentWordIndex(-1);
//     setProgress(0);

//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }
//   };

//   const handleWordClick = (word: HTMLSpanElement) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const timestamp = parseInt(word.id) / 1000;
//     audio.currentTime = timestamp;
//     setCurrentTime(timestamp);

//     wordsRef.current.forEach(w => w.classList.remove("highlight"));
//     word.classList.add("highlight");
//     setCurrentWordIndex(wordsRef.current.indexOf(word));

//     audio.play().then(() => {
//       setIsPlaying(true);
//       animationRef.current = requestAnimationFrame(updateHighlightsAndProgress);
//     }).catch(e => {
//       console.error('Error playing audio:', e);
//     });
//   };

//   const exitReader = () => {
//     navigate(-1);
//   };

//   const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const progressBar = e.currentTarget;
//     const rect = progressBar.getBoundingClientRect();
//     const clickPosition = (e.clientX - rect.left) / rect.width;
//     const newTime = audio.duration * clickPosition;

//     audio.currentTime = newTime;
//     setCurrentTime(newTime);

//     if (!isPlaying) {
//       togglePlayback();
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   if (!story) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4">
//         <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
//         <p className="text-muted-foreground mb-8">The story you're looking for doesn't exist or has been removed.</p>
//         <Button onClick={() => navigate('/library')}>Return to Library</Button>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${isFullscreen ? 'bg-white px-0' : 'bg-muted/20 px-4 py-2'} transition-all duration-300 rounded-sm`}
//     >
//       <audio ref={audioRef} style={{ display: 'none' }}>
//         <source src={story.audio_file} type="audio/mp3" />
//         Your browser does not support the audio element.
//       </audio>

//       {(!isFullscreen || showControls) && (
//         <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between border-b animate-fade-in rounded-sm">
//           <Button variant="ghost" size="icon" onClick={exitReader} className="w-9 h-9">
//             <ArrowLeft size={20} />
//           </Button>

//           <div className="flex items-center gap-2">
//             <span className="text-sm text-muted-foreground">
//               {story.title} - {story.language}
//             </span>
//             <Button variant="ghost" size="icon" className="w-9 h-9" onClick={toggleFullscreen}>
//               {isFullscreen ? <XCircle size={20} /> : <Type size={20} />}
//             </Button>
//           </div>
//         </div>
//       )}

//       <div className={`flex flex-col grow ${isFullscreen ? 'max-w-4xl mx-auto w-full' : 'container'}`}>
//         <div className="flex flex-row gap-8 mt-6">
//           {/* Cover Image on the Left */}
//           <div className="w-1/3">
//             <img
//               src={story.cover_image}
//               alt={story.title}
//               className="w-full h-auto object-cover rounded-lg shadow-md"
//             />
//           </div>

//           {/* Story Content on the Right */}
//           <div className="w-2/3 bg-white rounded-lg shadow-md p-6 md:p-8 overflow-y-auto">
//             <h1 className="font-heading text-3xl font-bold mb-4 text-center">{story.title}</h1>
//             <div
//               className="text-container bg-gray-100 p-6 rounded-lg my-6 text-left"
//               style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
//             >
//               <div ref={contentRef} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {(!isFullscreen || showControls) && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md border-t p-4 animate-fade-in">
//           <div className="container flex flex-col gap-4">
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-muted-foreground">{formatTime(currentTime)}</span>
//               <div
//                 className="flex-1 bg-muted rounded-full h-2 cursor-pointer"
//                 onClick={handleProgressBarClick}
//               >
//                 <div
//                   className="bg-primary h-2 rounded-full transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//               <span className="text-sm text-muted-foreground">{formatTime(duration)}</span>
//             </div>

//             <div className="flex items-center justify-center gap-4">
//               {/* Play/Pause Button in Center */}


//               {/* Compact Controls */}
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant={liked ? "default" : "outline"}
//                     size="icon"
//                     onClick={toggleLike}
//                     className={`h-9 w-9 rounded-full ${liked ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}`}
//                   >
//                     <Heart size={18} className={liked ? 'fill-current' : ''} />
//                   </Button>
//                   <Button
//                     variant={bookmarked ? "default" : "outline"}
//                     size="icon"
//                     onClick={toggleBookmark}
//                     className={`h-9 w-9 rounded-full ${bookmarked ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
//                   >
//                     <BookmarkPlus size={18} />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={handleShare}
//                     className="h-9 w-9 rounded-full"
//                   >
//                     <Share2 size={18} />
//                   </Button>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={resetAudio}
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <RotateCcw size={18} />
//                 </Button>
//                 <div className="w-20">
//                   <Slider
//                     value={[playbackRate]}
//                     min={0.7}
//                     max={1.0}
//                     step={0.1}
//                     onValueChange={handlePlaybackRateChange}
//                   />
//                 </div>
//                 <span className="text-sm">{playbackRate.toFixed(1)}×</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Volume2 size={18} className="text-muted-foreground" />
//                 <div className="w-20">
//                   <Slider
//                     value={[volume]}
//                     max={100}
//                     step={10}
//                     onValueChange={handleVolumeChange}
//                   />
//                 </div>
//               </div>



//               <div className="flex items-center gap-2">
//                 <Type size={14} className="text-muted-foreground" />
//                 <div className="w-20">
//                   <Slider
//                     value={[fontSize]}
//                     min={14}
//                     max={28}
//                     step={2}
//                     onValueChange={handleFontSizeChange}
//                   />
//                 </div>
//               </div>



//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={togglePlayback}
//                 className="h-12 w-12 rounded-full"
//               >
//                 {isPlaying ? <Pause size={24} /> : <Play size={24} />}
//               </Button>

//             </div>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           .highlight {
//             background-color: #FFEB3B;
//             border-radius: 3px;
//           }

//                     .word {
//             display: inline-block;
//             margin: 0 1px;
//             cursor: pointer;
//             padding: 2px 3px;
//             border-radius: 3px;
//             transition: background-color 0.2s;
//           }
//         `}
//       </style>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Story } from "@/types";
import {
  Heart,
  BookmarkPlus,
  Share2,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Type,
  ArrowLeft,
  XCircle,
  Maximize2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchStories } from "@/redux/storiesSlice";

export default function StoryReader() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [progress, setProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const dispatch = useDispatch<AppDispatch>();

  // const location = useLocation();
  const story = useSelector((state: RootState) => state.storiesSlice.stories).find(story => story.id === id);

  const navigate = useNavigate();
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (story) {
      setLoading(false);
    } else {
      dispatch(fetchStories());
    }
  }, [story]);

  useEffect(() => {
    if (!loading && contentRef.current && story) {
      contentRef.current.innerHTML = story.display_html;
      const wordElements = contentRef.current.querySelectorAll('.word');
      wordsRef.current = Array.from(wordElements) as HTMLSpanElement[];

      wordsRef.current.forEach(word => {
        word.addEventListener('click', () => handleWordClick(word));
      });
    }
  }, [loading, story]);

  useEffect(() => {
    return () => {
      wordsRef.current.forEach(word => {
        word.removeEventListener('click', () => { });
      });
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
        wordsRef.current[currentWordIndex].classList.remove("highlight");
      }
      setCurrentWordIndex(-1);
      setProgress(0);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentWordIndex]);

  const updateHighlights = () => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;

    const currentTimeMs = audio.currentTime * 1000;
    highlightCurrentWord(currentTimeMs);

    if (!audio.paused) {
      animationRef.current = requestAnimationFrame(updateHighlights);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateHighlights);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const highlightCurrentWord = (currentTimeMs: number) => {
    const words = wordsRef.current;
    if (!words || words.length === 0) return;

    let newIndex = -1;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordStart = parseInt(word.id);
      const nextWordStart = i < words.length - 1 ? parseInt(words[i + 1].id) : Infinity;

      if (currentTimeMs >= wordStart && currentTimeMs < nextWordStart) {
        newIndex = i;
        break;
      }
    }

    if (newIndex !== currentWordIndex) {
      words.forEach(word => word.classList.remove("highlight"));
      if (newIndex >= 0 && words[newIndex]) {
        words[newIndex].classList.add("highlight");
        words[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setCurrentWordIndex(newIndex);
    }
  };

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const handlePlaybackRateChange = (value: number[]) => {
    const rate = value[0];
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const vol = value[0];
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol / 100;
    }
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
    toast({
      title: "Share this story",
      description: "Sharing functionality would be implemented here"
    });
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        animationRef.current = requestAnimationFrame(updateHighlights);
      }).catch(e => {
        console.error('Error playing audio:', e);
        toast({
          title: "Playback Error",
          description: "There was an error playing the audio",
          variant: "destructive"
        });
      });
    }
  };

  const resetAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);

    if (currentWordIndex >= 0 && wordsRef.current[currentWordIndex]) {
      wordsRef.current[currentWordIndex].classList.remove("highlight");
    }
    setCurrentWordIndex(-1);
    setProgress(0);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleWordClick = (word: HTMLSpanElement) => {
    const audio = audioRef.current;
    if (!audio) return;

    const timestamp = parseInt(word.id) / 1000;
    audio.currentTime = timestamp;
    setCurrentTime(timestamp);

    wordsRef.current.forEach(w => w.classList.remove("highlight"));
    word.classList.add("highlight");
    setCurrentWordIndex(wordsRef.current.indexOf(word));

    audio.play().then(() => {
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(updateHighlights);
    }).catch(e => {
      console.error('Error playing audio:', e);
    });
  };

  const exitReader = () => {
    navigate(-1);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = audio.duration * clickPosition;

    audio.currentTime = newTime;
    setCurrentTime(newTime);

    if (!isPlaying) {
      togglePlayback();
    }
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

  return (
    <div
      className={`min-h-screen flex flex-col ${isFullscreen ? 'bg-white px-0' : 'bg-muted/20 px-4 py-2'} transition-all duration-300 rounded-sm`}
    >
      <audio ref={audioRef} style={{ display: 'none' }}>
        <source src={story.audio_file} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {(!isFullscreen || showControls) && (
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between border-b animate-fade-in rounded-sm">
          <Button variant="ghost" size="icon" onClick={exitReader} className="w-9 h-9">
            <ArrowLeft size={20} />
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {story.title} - {story.language}
            </span>
            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={toggleFullscreen}>
              {isFullscreen ? <XCircle size={20} /> : <Maximize2 size={20} />}
            </Button>
          </div>
        </div>
      )}

      <div className={`flex flex-col grow ${isFullscreen ? 'max-w-4xl mx-auto w-full' : 'container'} pb-[200px] md:pb-[160px]`}>
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {/* Cover Image - Full width on mobile, 1/3 width on desktop */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="md:sticky md:top-24">
              <img
                src={story.cover_image}
                alt={story.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Story Content - Full width on mobile, 2/3 width on desktop */}
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8">
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-center">{story.title}</h1>
            <div
              className="text-container bg-gray-100 p-4 md:p-6 rounded-lg my-4 md:my-6 text-left overflow-y-auto"
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
            >
              <div ref={contentRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Update the bottom controls for better mobile layout */}
      {(!isFullscreen || showControls) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md border-t p-2 md:p-4 animate-fade-in">
          <div className="container flex flex-col gap-2">
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-muted-foreground">{formatTime(currentTime)}</span>
              <div
                className="flex-1 bg-muted rounded-full h-2 cursor-pointer"
                onClick={handleProgressBarClick}
              >
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">{formatTime(duration)}</span>
            </div>

            {/* Mobile-optimized controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:flex items-center justify-between gap-2 md:gap-4">
              {/* Play controls */}


              {/* Speed and volume controls */}
              <div className="flex items-center gap-1 md:gap-2">
                <span className="text-xs md:text-sm whitespace-nowrap">Speed:</span>
                <div className="w-16 md:w-24">
                  <Slider
                    value={[playbackRate]}
                    min={0.7}
                    max={1.0}
                    step={0.1}
                    onValueChange={handlePlaybackRateChange}
                  />
                </div>
                <span className="text-xs md:text-sm">{playbackRate.toFixed(1)}×</span>
              </div>

              {/* Volume and font size */}
              <div className="flex items-center gap-1 md:gap-2">
                <Volume2 size={16} className="text-muted-foreground" />
                <div className="w-16 md:w-24">
                  <Slider
                    value={[volume]}
                    max={100}
                    step={10}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-start col-span-2 md:col-span-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetAudio}
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full mr-2"
                >
                  <RotateCcw size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlayback}
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
              </div>
              {/* Action buttons */}
              <div className="flex items-center gap-1 md:gap-2 justify-end">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="icon"
                  onClick={toggleLike}
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full"
                >
                  <Heart size={16} className={liked ? 'fill-current' : ''} />
                </Button>
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="icon"
                  onClick={toggleBookmark}
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full"
                >
                  <BookmarkPlus size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {(!isFullscreen || showControls) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md border-t p-2 md:p-4 animate-fade-in">
          <div className="container flex flex-col gap-2">
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-muted-foreground">{formatTime(currentTime)}</span>
              <div
                className="flex-1 bg-muted rounded-full h-2 cursor-pointer"
                onClick={handleProgressBarClick}
              >
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">{formatTime(duration)}</span>
            </div>

            {/* Mobile-optimized controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:flex items-center justify-between gap-2 md:gap-4">
              {/* Speed and volume controls */}
              <div className="flex items-center gap-1 md:gap-2">
                <span className="text-xs md:text-sm whitespace-nowrap">Speed:</span>
                <div className="w-16 md:w-24">
                  <Slider
                    value={[playbackRate]}
                    min={0.7}
                    max={1.0}
                    step={0.1}
                    onValueChange={handlePlaybackRateChange}
                  />
                </div>
                <span className="text-xs md:text-sm">{playbackRate.toFixed(1)}×</span>
              </div>

              {/* Volume control */}
              <div className="flex items-center gap-1 md:gap-2">
                <Volume2 size={16} className="text-muted-foreground" />
                <div className="w-16 md:w-24">
                  <Slider
                    value={[volume]}
                    max={100}
                    step={10}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>


              {/* Play controls */}
              <div className="flex items-center justify-center col-span-2 md:col-span-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetAudio}
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full mr-2"
                >
                  <RotateCcw size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={togglePlayback}
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
              </div>

              {/* Text size control */}
              <div className="flex items-center gap-1 md:gap-2">
                <Type size={16} className="text-muted-foreground" />
                <div className="w-16 md:w-24">
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


              {/* Action buttons */}
              <div className="flex items-center gap-1 md:gap-2 justify-end">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="icon"
                  onClick={toggleLike}
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full"
                >
                  <Heart size={16} className={liked ? 'fill-current' : ''} />
                </Button>
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="icon"
                  onClick={toggleBookmark}
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full"
                >
                  <BookmarkPlus size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .highlight {
            background-color: #FFEB3B;
            border-radius: 3px;
          }

          .word {
            display: inline-block;
            margin: 0 1px;
            cursor: pointer;
            padding: 2px 3px;
            border-radius: 3px;
            transition: background-color 0.2s;
          }
        `}
      </style>
    </div>
  );
}