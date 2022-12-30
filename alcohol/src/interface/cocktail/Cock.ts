import { Cocktail } from "../Cocktail";
import { CockAlcho } from "./cockAlcho";
import { CockJuice } from "./cockJuice";


export interface Cock{
    cocktail:Cocktail;
    cockAlcho:CockAlcho[];
    cockJuice:CockJuice[];
}