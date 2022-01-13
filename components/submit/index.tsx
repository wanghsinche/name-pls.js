import { auth, loginByGithub } from '@/services/submitface';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useData } from './data';


export const SubmitPage: React.FC<{ img?: Blob; className?: string }> = (p) => {
    const [show, setShow] = useState(false);

    const imgURL = useMemo(()=>p.img && URL.createObjectURL(p.img), [p.img])

    const { userData, actresslistData, mutation} = useData();

    const login = useCallback(async ()=>{
        window.open(loginByGithub());
        const token = await new Promise(res=>{
            const ii = (msg:MessageEvent)=>{
                console.log(msg);
                window.removeEventListener("message", ii);
                res(msg.data);
            };
            window.addEventListener("message", ii);
        });
        sessionStorage.setItem('token', token as string);
    }, [])


    const submit = useCallback(async ()=>{
        if (mutation.isLoading) {
            return
        }
        if (!p.img) {
            return
        }
        const res = await mutation.mutateAsync({img:p.img, label:'54581/Ichika_Nagano' })
        console.log(res);
        setShow(false);
    }, [p.img]);

    const dom = show && <div className="fixed top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full" style={{backgroundColor:'rgba(0,0,0,0.6)'}} onClick={()=>setShow(false)}></div>
        <div className="container absolute right-0 top-0 h-full w-1/2 p-2" style={{backgroundColor:'#fff'}}>
            {userData ? <div><img className="inline" src={userData?.data.avatar_url} width={50} /> {userData.data.email}</div>:<div>Please login</div>}
            {imgURL && <img className="block" src={imgURL} width={224} height={224}/>}
            <select >
                {actresslistData?.data.map(el=><option value={el.value} key={el.value}>{el.label}</option>)}
            </select>
            <div>
            {!userData ? <button className="border rounded border-slate-500 max-w-xs	" onClick={login} >Login with github</button>:
            <button className="border rounded border-slate-500 max-w-xs	"  onClick={submit}>submit a new image</button>
            }
            </div>
        </div>
    </div>;
    return <>
        <a className={"underline cursor-pointer "+p.className} onClick={() => setShow(true)}>
            recognize failed? submit a new face
        </a>
        {createPortal(dom, document.body)}
    </>;
}