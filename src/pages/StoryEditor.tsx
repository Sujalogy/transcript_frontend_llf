
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
// import { mockStories, getCurrentUser } from "@/lib/data";
// import { Story, AgeGroup, Category, StoryExample } from "@/types";
// import {
//   Save,
//   Eye,
//   Upload,
//   Plus,
//   X,
//   Trash,
//   Image,
//   Headphones,
//   Tag,
//   ArrowLeft,
//   FileCheck,
//   Loader2
// } from "lucide-react";

// export default function StoryEditor() {
//   const { id } = useParams<{ id: string }>();
//   const isEditing = id !== "new";
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const emptyStory: StoryExample = {
//     id: "",
//     title: "",
//     author: "",
//     coverImage: "/placeholder.svg",
//     content: "",
//     illustrations: [],
//     ageGroup: "6-8",
//     category: "Fantasy",
//     tags: [],
//     status: "draft",
//     readingTimeMinutes: 5,
//     likes: 0,
//     views: 0
//   };

//   const [story, setStory] = useState<StoryExample>(emptyStory);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isPreviewing, setIsPreviewing] = useState(false);
//   const [isPublished, setIsPublished] = useState(false);
//   const [currentTag, setCurrentTag] = useState("");

//   useEffect(() => {
//     const checkUser = async () => {
//       const user = await getCurrentUser();

//       if (!user || user.role !== "admin") {
//         toast({
//           title: "Access Denied",
//           description: "You must be an administrator to access this page.",
//           variant: "destructive"
//         });
//         navigate("/login");
//         return;
//       }

//       if (isEditing) {
//         // Get story data
//         const storyData = mockStories.find(s => s.id === id);
//         if (storyData) {
//           setStory(storyData);
//           setIsPublished(storyData.status === "published");
//         } else {
//           toast({
//             title: "Story Not Found",
//             description: "The story you're trying to edit could not be found.",
//             variant: "destructive"
//           });
//           navigate("/admin");
//           return;
//         }
//       }

//       setIsLoading(false);
//     };

//     checkUser();
//   }, [id, isEditing, navigate, toast]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setStory(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (name: string, value: string) => {
//     setStory(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePublishedChange = (checked: boolean) => {
//     setIsPublished(checked);
//   };

//   const handleAddTag = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (currentTag.trim() && !story.tags.includes(currentTag.trim().toLowerCase())) {
//       setStory(prev => ({
//         ...prev,
//         tags: [...prev.tags, currentTag.trim().toLowerCase()]
//       }));
//       setCurrentTag("");
//     }
//   };

//   const handleRemoveTag = (tagToRemove: string) => {
//     setStory(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   const handleAddIllustration = () => {
//     const newIllustration = {
//       id: `temp-${Date.now()}`,
//       imageUrl: "/placeholder.svg",
//       position: story.illustrations.length + 1
//     };

//     setStory(prev => ({
//       ...prev,
//       illustrations: [...prev.illustrations, newIllustration]
//     }));
//   };

//   const handleRemoveIllustration = (id: string) => {
//     setStory(prev => ({
//       ...prev,
//       illustrations: prev.illustrations.filter(ill => ill.id !== id)
//     }));
//   };

//   const handleIllustrationChange = (id: string, field: string, value: string | number) => {
//     setStory(prev => ({
//       ...prev,
//       illustrations: prev.illustrations.map(ill =>
//         ill.id === id ? { ...ill, [field]: value } : ill
//       )
//     }));
//   };

//   const handleSave = async (publish: boolean = false) => {
//     setIsSaving(true);

//     try {
//       // Validate form
//       if (!story.title.trim()) {
//         toast({
//           title: "Error",
//           description: "Please enter a story title",
//           variant: "destructive"
//         });
//         setIsSaving(false);
//         return;
//       }

//       if (!story.author.trim()) {
//         toast({
//           title: "Error",
//           description: "Please enter an author name",
//           variant: "destructive"
//         });
//         setIsSaving(false);
//         return;
//       }

//       if (!story.content.trim()) {
//         toast({
//           title: "Error",
//           description: "Please enter story content",
//           variant: "destructive"
//         });
//         setIsSaving(false);
//         return;
//       }

//       // In a real app, this would call an API
//       // For now, we just simulate a network delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Update status if publishing
//       const finalStory = {
//         ...story,
//         status: publish || isPublished ? "published" : "draft",
//         publishedDate: publish || isPublished ? new Date().toISOString() : story.publishedDate
//       };

//       if (!isEditing) {
//         finalStory.id = `temp-${Date.now()}`;
//       }

//       toast({
//         title: "Success",
//         description: `Story ${isEditing ? "updated" : "created"} successfully${publish ? " and published" : ""}.`
//       });

//       // In a real app, the router would navigate back after a successful API call
//       navigate("/admin");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to save the story. Please try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handlePreview = () => {
//     // In a real app, this would save the draft and redirect to a preview page
//     // For this demo, we'll just show a toast
//     setIsPreviewing(true);

//     setTimeout(() => {
//       setIsPreviewing(false);
//       toast({
//         title: "Preview Mode",
//         description: "This would open a preview of your story in a new tab."
//       });
//     }, 1000);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="page-container pb-16 animate-entrance">
//       <div className="flex items-center mb-8 gap-4">
//         <Button variant="outline" size="icon" onClick={() => navigate("/admin")} className="shrink-0">
//           <ArrowLeft size={18} />
//         </Button>
//         <div>
//           <h1 className="text-3xl font-bold">{isEditing ? "Edit Story" : "Create New Story"}</h1>
//           <p className="text-muted-foreground">
//             {isEditing ? "Make changes to your story" : "Create a new story for your readers"}
//           </p>
//         </div>
//       </div>

//       {/* Story Editor Form */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Main Content (2 columns) */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* Basic Information */}
//           <Card>
//             <CardContent className="pt-6">
//               <h2 className="text-xl font-bold mb-4">Basic Information</h2>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="title" className="text-base">Story Title</Label>
//                   <Input
//                     id="title"
//                     name="title"
//                     value={story.title}
//                     onChange={handleInputChange}
//                     placeholder="Enter a captivating title"
//                     className="mt-1.5"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="author" className="text-base">Author</Label>
//                   <Input
//                     id="author"
//                     name="author"
//                     value={story.author}
//                     onChange={handleInputChange}
//                     placeholder="Enter author's name"
//                     className="mt-1.5"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="ageGroup" className="text-base">Age Group</Label>
//                     <Select
//                       value={story.ageGroup}
//                       onValueChange={(value) => handleSelectChange("ageGroup", value)}
//                     >
//                       <SelectTrigger id="ageGroup" className="mt-1.5">
//                         <SelectValue placeholder="Select age group" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="3-5">3-5 years</SelectItem>
//                         <SelectItem value="6-8">6-8 years</SelectItem>
//                         <SelectItem value="9-12">9-12 years</SelectItem>
//                         <SelectItem value="13+">13+ years</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label htmlFor="category" className="text-base">Category</Label>
//                     <Select
//                       value={story.category}
//                       onValueChange={(value) => handleSelectChange("category", value as Category)}
//                     >
//                       <SelectTrigger id="category" className="mt-1.5">
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Adventure">Adventure</SelectItem>
//                         <SelectItem value="Fantasy">Fantasy</SelectItem>
//                         <SelectItem value="Science">Science</SelectItem>
//                         <SelectItem value="History">History</SelectItem>
//                         <SelectItem value="Nature">Nature</SelectItem>
//                         <SelectItem value="Friendship">Friendship</SelectItem>
//                         <SelectItem value="Family">Family</SelectItem>
//                         <SelectItem value="Animals">Animals</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="readingTimeMinutes" className="text-base">Reading Time (minutes)</Label>
//                   <Input
//                     id="readingTimeMinutes"
//                     name="readingTimeMinutes"
//                     type="number"
//                     min="1"
//                     value={story.readingTimeMinutes}
//                     onChange={handleInputChange}
//                     className="mt-1.5"
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Story Content */}
//           <Card>
//             <CardContent className="pt-6">
//               <h2 className="text-xl font-bold mb-4">Story Content</h2>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="content" className="text-base">Story Text</Label>
//                   <p className="text-sm text-muted-foreground mb-2">
//                     Use HTML tags like &lt;p&gt; for paragraphs to structure your content.
//                   </p>
//                   <Textarea
//                     id="content"
//                     name="content"
//                     value={story.content}
//                     onChange={handleInputChange}
//                     placeholder="Once upon a time..."
//                     className="min-h-[300px] mt-1.5"
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Illustrations */}
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold">Illustrations</h2>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={handleAddIllustration}
//                   className="flex items-center gap-1"
//                 >
//                   <Plus size={16} /> Add Illustration
//                 </Button>
//               </div>

//               {story.illustrations.length === 0 ? (
//                 <div className="border border-dashed border-border rounded-lg p-8 text-center">
//                   <Image className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
//                   <h3 className="font-medium mb-1">No illustrations yet</h3>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     Add beautiful images to enhance your story
//                   </p>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={handleAddIllustration}
//                     className="flex items-center gap-1 mx-auto"
//                   >
//                     <Plus size={16} /> Add Illustration
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {story.illustrations.map((illustration, index) => (
//                     <div key={illustration.id} className="border rounded-lg p-4">
//                       <div className="flex items-center justify-between mb-3">
//                         <h3 className="font-medium">Illustration {index + 1}</h3>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleRemoveIllustration(illustration.id)}
//                           className="h-8 w-8 text-destructive"
//                         >
//                           <Trash size={16} />
//                         </Button>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div className="flex items-center justify-center border rounded-md overflow-hidden h-40">
//                           <img
//                             src={illustration.imageUrl}
//                             alt={`Illustration ${index + 1}`}
//                             className="max-h-full max-w-full object-contain"
//                           />
//                         </div>

//                         <div className="md:col-span-2 space-y-3">
//                           <div>
//                             <Label htmlFor={`illustration-${illustration.id}-image`}>Image URL</Label>
//                             <div className="flex mt-1.5">
//                               <Input
//                                 id={`illustration-${illustration.id}-image`}
//                                 value={illustration.imageUrl}
//                                 onChange={(e) =>
//                                   handleIllustrationChange(illustration.id, "imageUrl", e.target.value)
//                                 }
//                                 className="rounded-r-none"
//                               />
//                               <Button
//                                 variant="secondary"
//                                 className="rounded-l-none"
//                                 disabled={true} // Would enable actual upload in real app
//                               >
//                                 <Upload size={16} />
//                               </Button>
//                             </div>
//                             <p className="text-xs text-muted-foreground mt-1">
//                               For demonstration, using placeholder images only
//                             </p>
//                           </div>

//                           <div>
//                             <Label htmlFor={`illustration-${illustration.id}-caption`}>Caption</Label>
//                             <Input
//                               id={`illustration-${illustration.id}-caption`}
//                               value={illustration.caption || ""}
//                               onChange={(e) =>
//                                 handleIllustrationChange(illustration.id, "caption", e.target.value)
//                               }
//                               placeholder="Describe this illustration"
//                               className="mt-1.5"
//                             />
//                           </div>

//                           <div>
//                             <Label htmlFor={`illustration-${illustration.id}-position`}>Position in Story</Label>
//                             <Input
//                               id={`illustration-${illustration.id}-position`}
//                               type="number"
//                               min="1"
//                               value={illustration.position}
//                               onChange={(e) =>
//                                 handleIllustrationChange(
//                                   illustration.id,
//                                   "position",
//                                   parseInt(e.target.value) || 1
//                                 )
//                               }
//                               className="mt-1.5"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Audio Narration */}
//           <Card>
//             <CardContent className="pt-6">
//               <h2 className="text-xl font-bold mb-4">Audio Narration</h2>

//               <div className="border border-dashed border-border rounded-lg p-8 text-center">
//                 <Headphones className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
//                 <h3 className="font-medium mb-1">Add Audio Narration</h3>
//                 <p className="text-sm text-muted-foreground mb-4">
//                   Upload audio to enable the read-along feature
//                 </p>
//                 <Button
//                   variant="outline"
//                   disabled={true} // Would enable actual upload in real app
//                   className="flex items-center gap-1 mx-auto"
//                 >
//                   <Upload size={16} /> Upload Audio File
//                 </Button>
//                 <p className="text-xs text-muted-foreground mt-4">
//                   Supports MP3 files up to 50MB
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar (1 column) */}
//         <div className="space-y-8">
//           {/* Actions Card */}
//           <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
//             <h3 className="font-medium mb-4">Story Actions</h3>

//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="published"
//                   checked={isPublished}
//                   onCheckedChange={handlePublishedChange}
//                 />
//                 <Label htmlFor="published" className="cursor-pointer">Published</Label>
//               </div>
//               <Badge variant={isPublished ? "default" : "secondary"}>
//                 {isPublished ? "Live" : "Draft"}
//               </Badge>
//             </div>

//             <div className="space-y-3">
//               <Button
//                 className="w-full storybook-button"
//                 onClick={() => handleSave(true)}
//                 disabled={isSaving}
//               >
//                 {isSaving ? (
//                   <span className="flex items-center">
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Saving...
//                   </span>
//                 ) : (
//                   <span className="flex items-center">
//                     <FileCheck className="mr-2 h-4 w-4" />
//                     {isPublished ? "Update & Publish" : "Save & Publish"}
//                   </span>
//                 )}
//               </Button>

//               <Button
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => handleSave(false)}
//                 disabled={isSaving}
//               >
//                 <Save className="mr-2 h-4 w-4" />
//                 Save as Draft
//               </Button>

//               <Button
//                 variant="secondary"
//                 className="w-full"
//                 onClick={handlePreview}
//                 disabled={isSaving || isPreviewing}
//               >
//                 {isPreviewing ? (
//                   <span className="flex items-center">
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Loading Preview...
//                   </span>
//                 ) : (
//                   <span className="flex items-center">
//                     <Eye className="mr-2 h-4 w-4" />
//                     Preview Story
//                   </span>
//                 )}
//               </Button>
//             </div>

//             {isEditing && (
//               <div className="mt-6 pt-6 border-t">
//                 <Button variant="destructive" className="w-full">
//                   <Trash className="mr-2 h-4 w-4" />
//                   Delete Story
//                 </Button>
//               </div>
//             )}
//           </div>

//           {/* Cover Image */}
//           <Card>
//             <CardContent className="pt-6">
//               <h3 className="font-medium mb-4">Cover Image</h3>

//               <div className="aspect-[4/3] bg-muted rounded-md overflow-hidden mb-4 border">
//                 <img
//                   src={story.coverImage}
//                   alt="Cover"
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <Button className="w-full" variant="outline">
//                 <Upload className="mr-2 h-4 w-4" />
//                 Upload Cover Image
//               </Button>
//               <p className="text-xs text-muted-foreground text-center mt-2">
//                 Recommended size: 800x600 pixels
//               </p>
//             </CardContent>
//           </Card>

//           {/* Tags */}
//           <Card>
//             <CardContent className="pt-6">
//               <h3 className="font-medium mb-4">Tags</h3>

//               <form onSubmit={handleAddTag}>
//                 <div className="flex gap-2 mb-4">
//                   <div className="relative flex-1">
//                     <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                     <Input
//                       placeholder="Add a tag"
//                       value={currentTag}
//                       onChange={(e) => setCurrentTag(e.target.value)}
//                       className="pl-9"
//                     />
//                   </div>
//                   <Button type="submit" variant="secondary" size="icon">
//                     <Plus size={16} />
//                   </Button>
//                 </div>
//               </form>

//               <div className="flex flex-wrap gap-2">
//                 {story.tags.length === 0 ? (
//                   <p className="text-sm text-muted-foreground">
//                     No tags added yet. Tags help readers find your story.
//                   </p>
//                 ) : (
//                   story.tags.map((tag) => (
//                     <Badge key={tag} variant="outline" className="flex items-center gap-1 py-1.5">
//                       {tag}
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveTag(tag)}
//                         className="ml-1 hover:text-destructive"
//                       >
//                         <X size={14} />
//                       </button>
//                     </Badge>
//                   ))
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Eye, Upload, ArrowLeft, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Story } from "@/types";

export default function StoryEditor() {
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== "new";
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const currentStory = useSelector((state: RootState) => state.storiesSlice.stories).find((s) => s.id === id);
  const { loading } = useSelector((state: RootState) => state.storiesSlice);

  const emptyStory: Story = {
    id: "",
    title: "",
    display_html: "",
    audio_file: "",
    category: "",
    code: "",
    language: "",
    cover_image: "",
    original_text: "",
  };

  const [story, setStory] = useState<Story>(emptyStory);
  const [isPreviewing, setIsPreviewing] = useState(false);



  useEffect(() => {
    if (isEditing && currentStory) {
      setStory(currentStory);
    }
  }, [currentStory, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSave = async () => {
  //   try {
  //     // Validate form
  //     if (!story.title.trim()) {
  //       toast({
  //         title: "Error",
  //         description: "Please enter a story title",
  //         variant: "destructive",
  //       });
  //       return;
  //     }

  //     if (!story.display_html.trim()) {
  //       toast({
  //         title: "Error",
  //         description: "Please enter story content",
  //         variant: "destructive",
  //       });
  //       return;
  //     }

  //     // Save story using Redux
  //     await dispatch(saveStory(story));

  //     toast({
  //       title: "Success",
  //       description: `Story ${isEditing ? "updated" : "created"} successfully.`,
  //     });

  //     navigate("/admin");
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to save the story. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handlePreview = () => {
    setIsPreviewing(true);
    setTimeout(() => {
      setIsPreviewing(false);
      toast({
        title: "Preview Mode",
        description: "This would open a preview of your story in a new tab.",
      });
    }, 1000);
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
      <div className="flex items-center mb-8 gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/admin")} className="shrink-0">
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Story" : "Create New Story"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Make changes to your story" : "Create a new story for your readers"}
          </p>
        </div>
      </div>

      {/* Story Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-base">
                    Story Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={story.title}
                    onChange={handleInputChange}
                    placeholder="Enter a captivating title"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="code" className="text-base">
                    Code
                  </Label>
                  <Input
                    id="code"
                    name="code"
                    value={story.code}
                    onChange={handleInputChange}
                    placeholder="Enter a unique code"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-base">
                    Category
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    value={story.category}
                    onChange={handleInputChange}
                    placeholder="Enter category"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="language" className="text-base">
                    Language
                  </Label>
                  <Input
                    id="language"
                    name="language"
                    value={story.language}
                    onChange={handleInputChange}
                    placeholder="Enter language"
                    className="mt-1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story Content */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Story Content</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="display_html" className="text-base">
                    Story HTML
                  </Label>
                  <Textarea
                    id="display_html"
                    name="display_html"
                    value={story.original_text}
                    onChange={handleInputChange}
                    placeholder="Enter your story in HTML format"
                    className="min-h-[300px] mt-1.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar (1 column) */}
        <div className="space-y-8">
          {/* Actions Card */}
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="font-medium mb-4">Story Actions</h3>

            <div className="space-y-3">
              <Button
                className="w-full storybook-button"
              // onClick={handleSave}
              // disabled={saving}
              >
                {/* {saving ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Update Story" : "Save Story"}
                  </span>
                )} */}
                <span className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? "Update Story" : "Save Story"}
                </span>
              </Button>

              <Button
                variant="secondary"
                className="w-full"
                onClick={handlePreview}
                disabled={isPreviewing}
              >
                {isPreviewing ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading Preview...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Story
                  </span>
                )}
              </Button>
            </div>

            {isEditing && (
              <div className="mt-6 pt-6 border-t">
                <Button variant="destructive" className="w-full">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Story
                </Button>
              </div>
            )}
          </div>

          {/* Cover Image */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Cover Image</h3>

              <div className="aspect-[4/3] bg-muted rounded-md overflow-hidden mb-4 border">
                <img
                  src={story.cover_image || "/placeholder.svg"}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <Button className="w-full" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Cover Image
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Recommended size: 800x600 pixels
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}