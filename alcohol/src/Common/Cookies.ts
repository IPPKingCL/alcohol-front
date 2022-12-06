import { Cookies} from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name:string, value:string, option?:any) => {
    return cookies.set(name,value,{...option})
}

export const getCookie = (name:string) => {
    return cookies.get(name);
}

/*인증할 때 보내는 헤더 예시 참조*/
/*
    headers:{
        "Content-Type":"application/json"
        Authorization:"Bearer ${getCookie('myToken')}",
    }
*/ 