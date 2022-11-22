export interface board{
    boardType: string;
    title:string,
    contents:string,
    
}

export interface boardRead extends board{
    dateTime:string,
    isDeleted:Boolean,
    isModified:Boolean,
    userId:string,
    nickname:string
}


export interface address{
    address:string,
}