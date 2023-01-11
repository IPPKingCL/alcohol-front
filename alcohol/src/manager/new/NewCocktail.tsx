import { Radio } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AlcoholSearchOption from "../../alcohol/AlcoholSearch/AlcoholSearchOption";
import { getCookie } from "../../Common/Cookies";
import { addr } from "../../Common/serverAddr";
import { alcho } from "../../interface/Alcho"
import { CockJuice } from "../../interface/cocktail/CockJuice";
import { InputItem } from "../../interface/manage/InputItem";
import { Unit } from "../../interface/unit";
import SearchOption from "./SearchOption";




const NewCocktail = () => {
    const [alcho, setAlcho] = useState<alcho[]>([]);
    const [juice, setJuice] = useState<CockJuice[]>([]);
    const [unit, setUnit] = useState<Unit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const list = async () => {
        fetch(addr + '/admin/newCocktail', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('myToken')}`,
            },
        }).then((res) => res.json())
            .then((res) => {
                console.log(res);
                setAlcho(res.alchoCategory);
                setJuice(res.juiceCategory);
                setUnit(res.unitCategory)
            })
        setLoading(false);
    }

    useEffect(() => {
        list();
    }, []);
    

    const nextID = useRef<number>(1);
    const [inputItems, setInputItems] = useState<InputItem[]>([{ id: 0, name:0, amount:0 ,unit:1, only:false}]);

    // 추가
    function addInput() {
        const input = {			  // 새로운 인풋객체를 하나 만들고,
            id: nextID.current,		  // id 값은 변수로 넣어주고,
            name:0,
            amount:0,              // 내용은 빈칸으로 만들자
            unit:1,
            only:false			  
        };

        setInputItems([...inputItems, input]); // 기존 값에 새로운 인풋객체를 추가해준다.
        nextID.current += 1; 		   // id값은 1씩 늘려준다.
    }

    // 삭제
    function deleteInput(index: number) {    // 인덱스 값을 받아서
        setInputItems(inputItems.filter(item => item.id !== index)); // 인덱스 값과 같지 않은 애들만 남겨둔다
    }

    function optionChange( e: React.ChangeEvent<HTMLSelectElement>, index: number){
        if (index > inputItems.length) return; // 혹시 모르니 예외처리

        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItems));
        inputItemsCopy[index].name = parseInt(e.target.value); // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItems(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
    }

    function handleChange( 	// ↓ 이벤트 객체를 받고, 인덱스를 받자
        e: React.ChangeEvent<HTMLInputElement>, index: number
    ) {
        if (index > inputItems.length) return; // 혹시 모르니 예외처리

        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItems));
        inputItemsCopy[index].amount = parseInt(e.target.value); // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItems(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
    }

    function unitChange( e: React.ChangeEvent<HTMLSelectElement>, index: number){
        if (index > inputItems.length) return; // 혹시 모르니 예외처리

        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItems));
        inputItemsCopy[index].unit = parseInt(e.target.value); // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItems(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
    }


    function onlyChange( e: React.ChangeEvent<HTMLInputElement>, index: number){
        if (index > inputItems.length) return; // 혹시 모르니 예외처리
        
        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItems));
        console.log(e.target.value)
        inputItemsCopy[index].only = Boolean(e.target.value); // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItems(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
    }

    /*****************************************juice recipe*************************************/
    
    
    const nextIDJuice = useRef<number>(1);
    const [inputItemsJuice, setInputItemsJuice] = useState<InputItem[]>([{ id: 0, name:0, amount:0 ,unit:1, only:false}]);

    // 추가
    function addInputJuice() {
        const input = {			  // 새로운 인풋객체를 하나 만들고,
            id: nextIDJuice.current,		  // id 값은 변수로 넣어주고,
            name:0,
            amount:0,			  // 내용은 빈칸으로 만들자
            unit:1,
            only:false
        };

        setInputItemsJuice([...inputItemsJuice, input]); // 기존 값에 새로운 인풋객체를 추가해준다.
        nextIDJuice.current += 1; 		   // id값은 1씩 늘려준다.
    }

    // 삭제
    function deleteInputJuice(index: number) {    // 인덱스 값을 받아서
        setInputItemsJuice(inputItemsJuice.filter(item => item.id !== index)); // 인덱스 값과 같지 않은 애들만 남겨둔다
    }

    function optionChangeJuice( e: React.ChangeEvent<HTMLSelectElement>, index: number){
        if (index > inputItemsJuice.length) return; // 혹시 모르니 예외처리

        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItemsJuice));
        inputItemsCopy[index].name = parseInt(e.target.value); // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItemsJuice(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
    }

    function handleChangeJuice( 	// ↓ 이벤트 객체를 받고, 인덱스를 받자
        e: React.ChangeEvent<HTMLInputElement>, index: number
    ) {
        if (index > inputItemsJuice.length) return; // 혹시 모르니 예외처리

        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItemsJuice));
        inputItemsCopy[index].amount = parseInt(e.target.value); // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItemsJuice(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
    }

    function unitChangeJuice( e: React.ChangeEvent<HTMLSelectElement>, index: number){
        if (index > inputItemsJuice.length) return; // 혹시 모르니 예외처리

        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItemsJuice));
        inputItemsCopy[index].unit = parseInt(e.target.value); // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItemsJuice(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
    }


    function onlyChangeJuice( e: React.ChangeEvent<HTMLInputElement>, index: number){
        if (index > inputItemsJuice.length) return; // 혹시 모르니 예외처리
        
        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItemsJuice));
        console.log(e.target.value)
        inputItemsCopy[index].only = Boolean(e.target.value); // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItemsJuice(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
    }
    
    const [cocktail,setCocktail] = useState<string>('');
    const insertCocktail = (e : React.ChangeEvent<HTMLInputElement>) => {
        setCocktail(e.target.value);
    }
    const [selectedFile, setSelectedFile] = useState<any>('');
    const handleFileInput = (e: any) => {
        console.log("event : " + e);
        const file = e.target.files[0];
        console.log(file);
        setSelectedFile(file);
    }

    const [dosu,setDosu] = useState<number>();
    const dosuChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setDosu(parseInt(e.target.value));
    }
    const test = () =>{
        console.log(inputItems);
        console.log(inputItemsJuice);
        console.log(cocktail);
        console.log(selectedFile)
    }

    const insert = async () => {
        if(!cocktail){
            alert("이름을 입력해주세요");
            return;
        }else if(!selectedFile){
            alert("사진을 넣어주세요");
            return;
        }else if(!inputItems){
            alert("술 레시피를 알려주세요");
            return;
        }else if(!inputItemsJuice){
            alert("음료 레시피를 알려주세요");
            return;
        }

        fetch(addr + '/board/s3url',{
            method:"GET",
            headers : {
                "Content-Type" : "application/json",
            }
        }).then((res) => res.json())
        .then((res) => {
            let imageUrl = '';
            
            fetch(res.data,{
                method:"put",
                headers : {
                    "Content-Type": "multipart/form-data",
                },
                body : selectedFile
            })
            if(selectedFile.size>0){
                imageUrl = res.data.split('?')[0];
            }else{
                alert('이미지 오류');
                return;
            }

            fetch(addr + '/admin/insert',{
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${getCookie('myToken')}`,
                },
                body : JSON.stringify({
                    name:cocktail,
                    imgUrl:imageUrl,
                    dosu : dosu,
                    alcho : inputItems,
                    juice : inputItemsJuice
                })
            }).then((res) => res.json())
            .then((res)=>{
                if(res.success){
                    alert('등록 성공');
                    
                }else{
                    alert(res.msg);
                }
            })
        })
    }

    return (
        <div>
            {loading ? <strong>loading...</strong> :
                <>
                    <h1>관리자 페이지</h1>
                    <hr></hr>
                    칵테일 이름 : <input type="text" onChange={insertCocktail}/><br></br>
                    이미지 : <input accept="image/*" multiple type="file" onChange={handleFileInput}/>
                    도수 : <input type = "text" onChange={dosuChange}/>
                    <hr></hr>



                    <div>
                        {inputItems.map((item, index) => (
                            <div key={index}>
                                <div>술 레시피</div>
                                <select onChange={e => optionChange(e, index)}>
                                    {alcho.map((data: any) => (
                                        <SearchOption prop={data} key={data.id} />
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    className={`title-${index}`}
                                    onChange={e => handleChange(e, index)}
                                    value={item.amount}
                                />
                                <select onChange={e => unitChange(e, index)}>
                                    {unit.map((data: any) => (
                                        <SearchOption prop={data} key={data.id} />
                                    ))}
                                </select>
                                only<input onChange={e =>onlyChange(e, index)}
                                        type="checkBox"
                                    />                 
                                    


                                {index === 0 && inputItems.length < 4 && (
                                    <button onClick={addInput}> + </button>
                                )}

                                {index > 0 && inputItems[index - 1] ? (
                                    <button onClick={() => deleteInput(item.id)}> - </button>
                                ) : (
                                    ''
                                )}

                            </div>
                        ))}
                    </div>

                    <hr></hr>

                    <div>
                        {inputItemsJuice.map((item, index) => (
                            <div key={index}>
                                <div>음료 레시피</div>
                                <select onChange={e => optionChangeJuice(e, index)}>
                                    {juice.map((data: any) => (
                                        <SearchOption prop={data} key={data.id} />
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    className={`title-${index}`}
                                    onChange={e => handleChangeJuice(e, index)}
                                    value={item.amount}
                                />
                                <select onChange={e => unitChangeJuice(e, index)}>
                                    {unit.map((data: any) => (
                                        <SearchOption prop={data} key={data.id} />
                                    ))}
                                </select>
                                only<input onChange={e =>onlyChangeJuice(e, index)}
                                        type="checkBox"
                                    /> 

                                {index === 0 && inputItems.length < 4 && (
                                    <button onClick={addInputJuice}> + </button>
                                )}

                                {index > 0 && inputItems[index - 1] ? (
                                    <button onClick={() => deleteInputJuice(item.id)}> - </button>
                                ) : (
                                    ''
                                )}



                            </div>
                        ))}
                    </div>
                    <hr></hr>
                    <button onClick={insert}>완료</button>
                </>



            }
        </div>
    )

}

export default NewCocktail;