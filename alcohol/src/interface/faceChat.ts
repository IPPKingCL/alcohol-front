import { AlchoCategory } from "./AlchoCategory";

export interface FaceChat{
    id:number;
    roomName : string;
    dateTime : Date;
    detailComment : string;
    alchoCategory:AlchoCategory
}