import { Ingredient } from "./ingredient";

export interface Order {
  ingredients: string[];
}

export interface FeedItem
{
  name: string;
  number: number;
  date: Date;
  ingredients: Ingredient[];
}