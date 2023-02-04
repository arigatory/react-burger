
export interface Order {
  ingredients: string[];
}

export interface FeedItem {
  name: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  ingredients: string[];
  status: 'done' | 'created' | 'cancelled' | 'pending';
  _id: string;
}
