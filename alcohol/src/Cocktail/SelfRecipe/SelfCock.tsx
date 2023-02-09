import { useEffect, useState } from "react";
import AlcoholSearch from "../../alcohol/AlcoholSearch/AlcoholSearch";
import { addr } from "../../Common/serverAddr";
import { Cocktail } from "../../interface/Cocktail";
import { RecipeList } from "../../interface/RecipeList";
import RecipeListco from "../Recipe/RecipeListco";

const SelfCock = () => {
    const [recipeList,setRecipeList] = useState<RecipeList[]>([]);
    const [loading,setLoading] = useState<boolean>(true);

    const list = async () => {
        setLoading(true);
        setRecipeList([]);
        fetch(addr+'/selfcocktail',{
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

    useEffect(()=>{
        list();
    },[]);

    const [search, setSearch] = useState<string>('');
    const [searchData,setSearchData] = useState<Cocktail[]>([]);

    //아직 검색 기능 없음    
    const onChange = (e:any) => {
        let category = '';
        
        category = e.target.value;
        console.log('category : '+category);
        setLoading(true);
        setRecipeList([]);
        fetch(addr+'/cocktail/search/'+category,{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
        .then((res) => {
            
            let i:number = 0;
            for (i; i < res.length; i++) {
                const data:Cocktail ={
                    id: res[i].id,
                    name: res[i].name,
                    dosu: res[i].dosu,
                    imgUrl: res[i].imgUrl,
                    only: res[i].only,
                    likeOne: res[i].likeOne
                }
                setRecipeList(recipeList => [...recipeList,data]);
                
            }
            
            setLoading(false);
        })
    }
    
    const onSearch = (e:React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        console.log(search);
        if(search==''){
            list();
            return;
        }
        const filterData = recipeList.filter((row)=>row.name.includes(search));

        setRecipeList(filterData)
        setSearch('');
    }

    const onChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return(
        <div id='wrapper2'>
            <AlcoholSearch
                 onSearch={onSearch}
                 onChange={onChange}
                 onChangeSearch = {onChangeSearch}
            />

            <hr></hr>
            {loading ? <strong>loading....</strong>:
                
               <p>hiyo</p>
            }
            
        </div>
    )
}

export default SelfCock;