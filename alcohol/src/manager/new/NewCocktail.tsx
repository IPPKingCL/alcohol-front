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
    title: string;
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

    //AuthRegister.js 참조

    const nextID = useRef<number>(1);
    const [inputItems, setInputItems] = useState<InputItem[]>([{ id: 0, title: '' }]);

    // 추가
    function addInput() {
        const input = {			  // 새로운 인풋객체를 하나 만들고,
            id: nextID.current,		  // id 값은 변수로 넣어주고,
            title: '',			  // 내용은 빈칸으로 만들자
        };

        setInputItems([...inputItems, input]); // 기존 값에 새로운 인풋객체를 추가해준다.
        nextID.current += 1; 		   // id값은 1씩 늘려준다.
    }

    // 삭제
    function deleteInput(index: number) {    // 인덱스 값을 받아서
        setInputItems(inputItems.filter(item => item.id !== index)); // 인덱스 값과 같지 않은 애들만 남겨둔다
    }

    function handleChange( 	// ↓ 이벤트 객체를 받고, 인덱스를 받자
        e: React.ChangeEvent<HTMLInputElement>, index: number
    ) {
        if (index > inputItems.length) return; // 혹시 모르니 예외처리

        // 인풋배열을 copy 해주자
        const inputItemsCopy: InputItem[] = JSON.parse(JSON.stringify(inputItems));
        inputItemsCopy[index].title = e.target.value; // 그리고 해당 인덱스를 가진 <input>의 내용을 변경해주자 
        setInputItems(inputItemsCopy);		  // 그걸 InputItems 에 저장해주자
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
                                <select>
                                    {alcho.map((data: any) => (
                                        <SearchOption prop={data} key={data.id} />
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    className={`title-${index}`}
                                    onChange={e => handleChange(e, index)}
                                    value={item.title}
                                />
                                <select>
                                    {unit.map((data: any) => (
                                        <SearchOption prop={data} key={data.id} />
                                    ))}
                                </select>
                                only<Radio></Radio>


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
                        {inputItems.map((item, index) => (
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
                                    onChange={e => handleChange(e, index)}
                                    value={item.title}
                                />
                                <select>
                                    {unit.map((data: any) => (
                                        <SearchOption prop={data} key={data.id} />
                                    ))}
                                </select>
                                only<Radio></Radio>


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
                    <button>완료</button>
                </>



            }
        </div>
    )

}

export default NewCocktail;