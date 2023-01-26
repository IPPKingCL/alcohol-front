import { Cookies} from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name:string, value:string, option?:any) => {
    return cookies.set(name,value,{...option})
}

export const getCookie = (name:string) => {
    return cookies.get(name);
}

export const getAllCookie = () => {
    return cookies.getAll();
}

export const removeCookie = (name:string) => {
    try{
        cookies.remove(name);
        return {success:true};
    }catch(err){
        console.log(err);
        return {success:false};
    }
}


/*인증할 때 보내는 헤더 예시 참조*/
/*
    headers:{
        "Content-Type":"application/json"
        Authorization:"Bearer ${getCookie('myToken')}",
    }
*/ 