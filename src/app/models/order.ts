import { Ingredient } from "./ingredient";

export interface Order {
  ingredients: string[];
}

export interface FeedItem
{
  name: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  ingredients: string[];
  status: string;
  _id: string;
}