import { Ingredient } from "./ingredient";

export interface HistoryItem
{
  name: string;
  number: number;
  date: Date;
  ingredients: Ingredient[];
  status: string;
}