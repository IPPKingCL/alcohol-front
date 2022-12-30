import { Cocktail } from "../Cocktail";
import { CockAlcho } from "./CockAlcho";
import { CockJuice } from "./CockJuice";


export interface Cock{
    cocktail:Cocktail;
    cockAlcho:CockAlcho[];
    cockJuice:CockJuice[];
}