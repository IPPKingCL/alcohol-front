export interface board{
    boardType: string;
    title:string,
    contents:string,
    
}

export interface modiBoard extends board{
    userId:number
}

export interface boardRead extends board{
    dateTime:string,
    isDeleted:Boolean,
    isModified:Boolean,
    userId:number,
    nickname:string,
    imgUrl:string,
    videoUrl:string
}


export interface address{
    address:string,
}

export interface boardWrite extends board{
    videoUrl:string
}