import { Radio } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AlcoholSearchOption from "../../alcohol/AlcoholSearch/AlcoholSearchOption";
import { getCookie } from "../../Common/Cookies";
import { addr } from "../../Common/serverAddr";
import { alcho } from "../../interface/Alcho"
import { CockJuice } from "../../interface/cocktail/CockJuice";
import { Unit } from "../../interface/unit";
import SearchOption from "./SearchOption";


interface InputItem {
    id: number;
    name : number,
    amount: number;//양
    unit:number;
    only:boolean;

}

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
    const [inputItems, setInputItems] = useState<InputItem[]>([{ id: 0, name:0, amount:0 ,unit:0, only:false}]);

    // 추가
    function addInput() {
        const input = {			  // 새로운 인풋객체를 하나 만들고,
            id: nextID.current,		  // id 값은 변수로 넣어주고,
            name:0,
            amount:0,              // 내용은 빈칸으로 만들자
            unit:0,
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
    const [inputItemsJuice, setInputItemsJuice] = useState<InputItem[]>([{ id: 0, name:0, amount:0 ,unit:0, only:false}]);

    // 추가
    function addInputJuice() {
        const input = {			  // 새로운 인풋객체를 하나 만들고,
            id: nextIDJuice.current,		  // id 값은 변수로 넣어주고,
            name:0,
            amount:0,			  // 내용은 빈칸으로 만들자
            unit:0,
            only:false
        };

        setInputItemsJuice([...inputItemsJuice, input]); // 기존 값에 새로운 인풋객체를 추가해준다.
        nextIDJuice.current += 1; 		   // id값은 1씩 늘려준다.
    }

    // 삭제
    function deleteInputJuice(index: number) {    // 인덱스 값을 받아서
        setInputItemsJuice(inputItemsJuice.filter(item => item.id !== index)); // 인덱스 값과 같지 않은 애들만 남겨둔다
    }

    function handleChangeJuice( 	// ↓ 이벤트 객체를 받고, 인덱스를 받자
        e: React.ChangeEvent<HTMLInputElement>, index: number
    ) {
        if (index > inputItems.length) return; // 혹시 모르니 예외처리

        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItems));
        inputItemsCopy[index].amount = parseInt(e.target.value); // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItemsJuice(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
    }


    const test = () =>{
        console.log(inputItems);
    }
    return (
        <div>
            {loading ? <strong>loading...</strong> :
                <>
                    <h1>관리자 페이지</h1>
                    <hr></hr>
                    칵테일 이름 : <input type="text" /><br></br>
                    이미지 : <input accept="image/*" multiple type="file" />

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
                                <select>
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
                                <select>
                                    {unit.map((data: any) => (
                                        <SearchOption prop={data} key={data.id} />
                                    ))}
                                </select>
                                only<input type='radio'/>


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
                    <button onClick={test}>완료</button>
                </>



            }
        </div>
    )

}

export default NewCocktail;