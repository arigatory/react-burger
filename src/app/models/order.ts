import { Ingredient } from "./ingredient";

export interface Order {
  ingredients: string[];
}

export interface OrderItem
{
  name: string;
  number: number;
  date: Date;
  ingredients: Ingredient[];
}