import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addr } from "../../Common/serverAddr";
import { RecipeList } from "../../interface/RecipeList";
import RecipeListco from "./RecipeListco";


const Recipe = () => {
    const {id} = useParams();
    const [recipeList,setRecipeList] = useState<RecipeList[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const list = () => {
        fetch(addr+'/cocktail/alchoCock/'+id,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        }).then((res)=>res.json())
        .then(res => {
            console.log(res);
            setRecipeList(res);
        })
        setLoading(false);
    }

    useEffect(() => {
        list();
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