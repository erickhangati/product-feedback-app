type User = {
  image: string;
  name: string;
  username: string;
};

type DBUser = {
  image: string;
  name: string;
  username: string;
  email: string;
};

type Comment = {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
};

type Reply = {
  content: string;
  replyingTo: string;
  user: User;
};

type ProductRequest = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
};

type AppState = {
  currentUser: User;
  productRequests: ProductRequest[];
};

export type { User, DBUser, Comment, Reply, ProductRequest, AppState };
