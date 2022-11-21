export interface board{
    title:string,
    contents:string,
    
}

export interface boardRead extends board{
    dateTime:string,
    boardType:string,
    isDeleted:Boolean,
    isModified:Boolean,
    userId:string,
    nickname:string
}


export interface address{
    address:string,
}