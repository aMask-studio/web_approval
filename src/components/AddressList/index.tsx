import { MouseEventHandler, useEffect, useState } from "react";
import { Address } from "../../types/Address";
import { GetAddresses } from "../../api/GetAddresses";
import FindTextBox from "../FindTextBox";

interface Props {
    onChoosed: Function,
    addressesS?: Address[] | undefined,
    findBoxActive?: Boolean
}
function compare(text: string, a: string, b: string): number {
    if (a.includes(text)) {
        return -1;
    } else if (b.includes(text)) {
        return 1;
    } else {
        // Сравнение по алфавиту
        return a.localeCompare(b);
    }
}

const AddressList = ({onChoosed, addressesS, findBoxActive}:Props) => {
    const [addresses, setAddresses] = useState<Address[] | undefined>(addressesS);
    const [txt, setTxt] = useState<string>();

    var listAddresses;

    useEffect(()=>{
        if(!addresses){
            GetAddresses().then((res)=>{
                if(res){
                    setAddresses(res);
                }
            });
        }
    });

    if(addresses){
        listAddresses = addresses.map((elem)=>{
            return <li key={elem.address_id} onClick={()=>onChoosed(elem)} style={{margin:"0px 0px 5px 0px",cursor:"pointer"}}>{elem.address_name}</li>
        });
    }

    const search=(name:string|undefined)=>{
        var adrs = addresses;
        if(name){
            adrs?.sort((a, b) => compare(name, a.address_name, b.address_name));
            setAddresses(adrs);
        }
    }
//style={{overflowY:"scroll",margin:"0px",listStyleType:"none",padding:"0px"}}
    return <div style={{maxHeight:"80%",display:"flex",flexDirection:"column",gap:"5px"}}>
        {findBoxActive && <FindTextBox height={40} value={txt} onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{setTxt(event.target.value);search(txt)}}/>}
        <ul style={{maxHeight:"100%",overflowY:"scroll",margin:"0px",listStyleType:"none",padding:"0px"}}>
            {listAddresses}
        </ul>
    </div>
}
export default AddressList;