
// import { Story, User, AgeGroup, Category, StoryExample } from "@/types";

// export const mockStories: StoryExample[] = [
//   {
//     id: "1",
//     title: "The Lost Dragon",
//     author: "Emma Thompson",
//     coverImage: "/placeholder.svg",
//     content: `<p>Once upon a time, in a land far, far away, there lived a small dragon named Spark. Spark was no ordinary dragon. Instead of breathing fire, he breathed beautiful sparkles that lit up the night sky.</p>
//       <p>One day, Spark got separated from his family during a terrible storm. The little dragon found himself lost in a dark forest, far from the mountain caves he called home.</p>
//       <p>"Hello? Is anyone there?" Spark called out, his voice echoing through the trees. But no one answered.</p>
//       <p>As night fell, Spark felt scared and alone. He curled up under a large oak tree and cried sparkly tears that glowed in the darkness.</p>
//       <p>Suddenly, he heard a tiny voice. "Why are you crying?"</p>
//       <p>Spark looked up to see a small fox with bright orange fur. "I'm lost," Spark explained. "I can't find my way home."</p>
//       <p>"I know these woods very well," said the fox. "My name is Rusty. I can help you find your way home."</p>
//       <p>And so, Spark and Rusty became friends. Together, they embarked on an adventure through the forest, over rolling hills, and across bubbling streams.</p>
//       <p>Along the way, they met other woodland creatures who joined their journey: a wise old owl named Hoot, a playful rabbit called Bounce, and a brave little mouse named Tiny.</p>
//       <p>As they traveled, Spark's sparkles lit the way, creating a beautiful path of twinkling lights. The other animals were amazed by his special gift.</p>
//       <p>"Your sparkles aren't just beautiful," said Hoot the owl, "they're also very useful!"</p>
//       <p>After many days of traveling, they finally reached the mountains. Spark could see his family's cave high up on the cliff.</p>
//       <p>"That's my home!" Spark exclaimed excitedly. "Thank you all for helping me find my way back!"</p>
//       <p>Spark's family was overjoyed to see him. They welcomed all of his new friends with open wings.</p>
//       <p>From that day on, Spark would visit his friends in the forest often. And whenever any creature was lost in the dark, Spark would use his special sparkles to light their way home.</p>
//       <p>The End.</p>`,
//     audioUrl: "",
//     illustrations: [
//       {
//         id: "101",
//         imageUrl: "/placeholder.svg",
//         caption: "Spark the dragon breathing sparkles",
//         position: 1
//       },
//       {
//         id: "102",
//         imageUrl: "/placeholder.svg",
//         caption: "Spark meeting Rusty the fox",
//         position: 5
//       },
//       {
//         id: "103",
//         imageUrl: "/placeholder.svg",
//         caption: "All friends journeying through the forest",
//         position: 8
//       },
//       {
//         id: "104",
//         imageUrl: "/placeholder.svg",
//         caption: "Spark reunited with his family",
//         position: 12
//       }
//     ],
//     ageGroup: "6-8",
//     category: "Fantasy",
//     tags: ["dragons", "friendship", "adventure"],
//     status: "published",
//     publishedDate: "2023-05-15T10:30:00Z",
//     readingTimeMinutes: 8,
//     likes: 146,
//     views: 2347
//   },
//   {
//     id: "2",
//     title: "The Ocean Explorer",
//     author: "Marcus Lee",
//     coverImage: "/placeholder.svg",
//     content: `<p>This is the story about a girl who loved to explore the ocean...</p>`,
//     audioUrl: "",
//     illustrations: [
//       {
//         id: "201",
//         imageUrl: "/placeholder.svg",
//         caption: "Maria looking at the ocean",
//         position: 1
//       }
//     ],
//     ageGroup: "9-12",
//     category: "Adventure",
//     tags: ["ocean", "exploration", "marine life"],
//     status: "published",
//     publishedDate: "2023-06-22T14:45:00Z",
//     readingTimeMinutes: 12,
//     likes: 89,
//     views: 1256
//   },
//   {
//     id: "3",
//     title: "The Tiny Astronaut",
//     author: "Zoe Williams",
//     coverImage: "/placeholder.svg",
//     content: `<p>Tim was the smallest astronaut to ever go to space...</p>`,
//     audioUrl: "",
//     illustrations: [
//       {
//         id: "301",
//         imageUrl: "/placeholder.svg",
//         caption: "Tim looking at the stars",
//         position: 1
//       }
//     ],
//     ageGroup: "3-5",
//     category: "Science",
//     tags: ["space", "astronauts", "dreams"],
//     status: "published",
//     publishedDate: "2023-07-05T09:15:00Z",
//     readingTimeMinutes: 5,
//     likes: 215,
//     views: 3102
//   },
//   {
//     id: "4",
//     title: "Dinosaur Friends",
//     author: "Alex Johnson",
//     coverImage: "/placeholder.svg",
//     content: `<p>Long ago, when dinosaurs ruled the Earth...</p>`,
//     audioUrl: "",
//     illustrations: [
//       {
//         id: "401",
//         imageUrl: "/placeholder.svg",
//         caption: "Dinosaurs playing together",
//         position: 1
//       }
//     ],
//     ageGroup: "3-5",
//     category: "History",
//     tags: ["dinosaurs", "prehistory", "friendship"],
//     status: "published",
//     publishedDate: "2023-08-12T11:30:00Z",
//     readingTimeMinutes: 6,
//     likes: 178,
//     views: 2704
//   },
//   {
//     id: "5",
//     title: "The Magic Garden",
//     author: "Sophia Chen",
//     coverImage: "/placeholder.svg",
//     content: `<p>Behind an old stone wall, there was a garden unlike any other...</p>`,
//     audioUrl: "",
//     illustrations: [
//       {
//         id: "501",
//         imageUrl: "/placeholder.svg",
//         caption: "The magical garden in bloom",
//         position: 1
//       }
//     ],
//     ageGroup: "6-8",
//     category: "Fantasy",
//     tags: ["magic", "nature", "exploration"],
//     status: "published",
//     publishedDate: "2023-09-03T15:20:00Z",
//     readingTimeMinutes: 9,
//     likes: 132,
//     views: 1876
//   },
//   {
//     id: "6",
//     title: "The Brave Little Boat",
//     author: "Noah Parker",
//     coverImage: "/placeholder.svg",
//     content: `<p>Bobbie was a small wooden boat with big dreams...</p>`,
//     audioUrl: "",
//     illustrations: [
//       {
//         id: "601",
//         imageUrl: "/placeholder.svg",
//         caption: "Bobbie sailing on rough seas",
//         position: 1
//       }
//     ],
//     ageGroup: "3-5",
//     category: "Adventure",
//     tags: ["ocean", "courage", "boats"],
//     status: "draft",
//     readingTimeMinutes: 7,
//     likes: 0,
//     views: 0
//   }
// ];

// export const mockUsers: User[] = [
//   {
//     id: "101",
//     username: "admin",
//     name: "Admin User",
//     email: "admin@storyweaver.com",
//     role: "admin",
//     bookmarks: [],
//     readingHistory: [],
//     likedStories: []
//   },
//   {
//     id: "102",
//     username: "sarah",
//     name: "Sarah Johnson",
//     email: "sarah@example.com",
//     role: "reader",
//     bookmarks: ["1", "3"],
//     readingHistory: [
//       {
//         storyId: "1",
//         lastReadTimestamp: "2023-11-15T14:30:00Z",
//         progress: 60
//       },
//       {
//         storyId: "3",
//         lastReadTimestamp: "2023-11-16T08:45:00Z",
//         progress: 100
//       }
//     ],
//     likedStories: ["1", "3", "5"]
//   }
// ];

// export const filterStories = (
//   stories: StoryExample[],
//   filters: {
//     ageGroup?: AgeGroup;
//     category?: Category;
//     searchTerm?: string;
//     status?: "published" | "draft" | "all";
//     sortBy?: "popularity" | "date" | "title";
//   }
// ) => {
//   let filtered = [...stories];

//   // Filter by age group
//   if (filters.ageGroup) {
//     filtered = filtered.filter(story => story.ageGroup === filters.ageGroup);
//   }

//   // Filter by category
//   if (filters.category) {
//     filtered = filtered.filter(story => story.category === filters.category);
//   }

//   // Filter by status
//   if (filters.status && filters.status !== "all") {
//     filtered = filtered.filter(story => story.status === filters.status);
//   }

//   // Filter by search term
//   if (filters.searchTerm) {
//     const searchLower = filters.searchTerm.toLowerCase();
//     filtered = filtered.filter(
//       story =>
//         story.title.toLowerCase().includes(searchLower) ||
//         story.author.toLowerCase().includes(searchLower) ||
//         story.tags.some(tag => tag.toLowerCase().includes(searchLower))
//     );
//   }

//   // Sort stories
//   if (filters.sortBy) {
//     switch (filters.sortBy) {
//       case "popularity":
//         filtered.sort((a, b) => b.likes - a.likes);
//         break;
//       case "date":
//         filtered.sort((a, b) => {
//           if (!a.publishedDate) return 1;
//           if (!b.publishedDate) return -1;
//           return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
//         });
//         break;
//       case "title":
//         filtered.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//     }
//   }

//   return filtered;
// };

// // Mock authentication functions
// let currentUser: User | null = null;

// export const login = (username: string, password: string): Promise<User> => {
//   return new Promise((resolve, reject) => {
//     // For demo purposes, accept any admin/admin or reader/reader combination
//     if (username === "admin" && password === "admin") {
//       currentUser = mockUsers.find(u => u.username === "admin") || null;
//       resolve(currentUser as User);
//     } else if (username === "reader" && password === "reader") {
//       currentUser = mockUsers.find(u => u.username === "sarah") || null;
//       resolve(currentUser as User);
//     } else {
//       reject(new Error("Invalid credentials"));
//     }
//   });
// };

// export const logout = (): Promise<void> => {
//   return new Promise(resolve => {
//     currentUser = null;
//     resolve();
//   });
// };

// export const getCurrentUser = (): Promise<User | null> => {
//   return new Promise(resolve => {
//     resolve(currentUser);
//   });
// };