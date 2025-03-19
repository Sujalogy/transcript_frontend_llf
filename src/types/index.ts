
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
  display_html: string;
  audio_file?: string;
  category: string;
  code: string;
  language: string;
  cover_image: string;
  original_text: string;
}

export interface StoryState {
  stories: Story[];
  loading: boolean;
  error: string | null;
}

export interface StoryIllustration {
  id: string;
  imageUrl: string;
  caption?: string;
  position: number; // Position in the story where the illustration should appear
}



export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add any other user properties your app uses
}

export interface LoginResponse {
  user: User;
  token?: string; // If you're using tokens alongside cookies
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
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

export interface StoryExample {
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
