import { Cocktail } from "./Cocktail";

export interface RecipeList{
    id:number,
    name:string,
    amount:number,
    cocktail:Cocktail
}