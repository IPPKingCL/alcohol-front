import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addr } from "../../Common/serverAddr";
import { RecipeList } from "../../interface/RecipeList";
import RecipeListco from "./RecipeListco";


const Recipe = () => {
    const {id} = useParams();
    const [recipeList,setRecipeList] = useState<RecipeList[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const list = async (id:number,category:string) => {
        fetch(addr+'/cocktail/alchoCock',{
            method:"Post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                id:id,
                category:category
            }),
        }).then((res)=>res.json())
        .then(res => {
            if(res.success!==undefined){
                if (!window.confirm("해당 술을 사용한 칵테일이 없어요\n대신 이 술과 같은 종류의 술로 만든 칵테일을 알려드릴게요!!")) {
                    window.history.go(-1);
                } else {
                    
                    fetch(addr+'/cocktail/categoryCock/'+category,{
                        method:"Get",
                        headers:{
                            "Content-Type":"application/json",
                        },
                    }).then((res)=>res.json())
                    .then(res => {
                        setRecipeList(res);
                    })
                }
            }else{
                console.log(res);
                setRecipeList(res);
            }
            
            
        })
        setLoading(false);
    }

    const allList = async () => {
        fetch(addr+'/cocktail',{
            method:"Get",
            headers:{
                "Content-Type":"application/json",
            },
        }).then((res)=>res.json())
        .then((res)=>{
            setRecipeList(res);
        })
        setLoading(false);
    }

    useEffect(() => {
        console.log(id);
        if(id!==undefined){
            if(id==='all'){
                allList();
            }else{
                const param = id?.split('&');
                list(parseInt(param[0]),param[1]);
            }
            
        }else{
            alert('조회 중 에러 발생 \n다시 시도해주세요');
        }
        

    },[])

    const test = () => {
        console.log(recipeList)
    }
    return (
        <div id='wrapper2'>
            <div className='search-tool'>
                <select name="selectBoard" id="selectBoard" className="select-search">
                    <option value="A">전체</option>
                    <option value="W">위스키</option>
                    <option value="B">보드카</option>
                    <option value="BR">브랜디</option>
                    <option value="S">전통주</option>
                    <option value="BE">맥주</option>
                    <option value='G'>진</option>
                    <option value='R'>럼</option>
                    <option value="D">데낄라</option>
                    <option value='WI'>와인</option>
                </select>
                <form className='search-form' >
                    <input type="text" id="search"  ></input>
                    <button type='submit' className='btn-submit'>검색</button>
                </form>
            </div>

            <hr></hr>


            {loading ? <strong>loading....</strong>:
                <RecipeListco
                    datas={recipeList}/>
            }
            
        </div>
    )
}

export default Recipe;