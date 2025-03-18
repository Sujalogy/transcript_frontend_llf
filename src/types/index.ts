
export type AgeGroup = "3-5" | "6-8" | "9-12" | "13+";

export type Category = 
  | "Adventure" 
  | "Fantasy" 
  | "Science" 
  | "History" 
  | "Nature" 
  | "Friendship" 
  | "Family" 
  | "Animals";

export type StoryStatus = "published" | "draft";

export interface Story {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  content: string;
  audioUrl?: string;
  illustrations: StoryIllustration[];
  ageGroup: AgeGroup;
  category: Category;
  tags: string[];
  status: StoryStatus;
  publishedDate?: string;
  readingTimeMinutes: number;
  likes: number;
  views: number;
}

export interface StoryIllustration {
  id: string;
  imageUrl: string;
  caption?: string;
  position: number; // Position in the story where the illustration should appear
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "admin" | "reader";
  bookmarks: string[]; // Array of story IDs
  readingHistory: ReadingHistory[];
  likedStories: string[]; // Array of story IDs
}

export interface ReadingHistory {
  storyId: string;
  lastReadTimestamp: string;
  progress: number; // 0-100 percentage
}

export interface StoryFilters {
  ageGroup?: AgeGroup;
  category?: Category;
  searchTerm?: string;
  sortBy?: "popularity" | "date" | "title";
}
