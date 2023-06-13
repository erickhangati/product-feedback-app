type User = {
  _id: string;
  image: string;
  name: string;
  username: string;
  email: string;
};

type Comment = {
  _id: string;
  content: string;
  user: User;
  replies?: Reply[];
};

type Reply = {
  _id: string;
  content: string;
  replyingTo: User;
  user: User;
};

type ProductRequest = {
  _id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
  user: User;
};

type AppState = {
  currentUser?: User;
  productRequests: ProductRequest[];
};

export type { User, Comment, Reply, ProductRequest, AppState };
