import { auth, loginByGithub } from '@/services/submitface';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SearchSelect } from '../searchselect';
import { useData } from './data';
import { Transition } from 'react-transition-group';
import { info } from '../info';


const transitionClass: Record<string, any> = {
    entering: { left: '100%' },
    entered: { left: 0 },
    exiting: { left: 0 },
    exited: { left: '100%' },
};

const defaultStyle = {
    transition: `left 200ms ease-out`,
}

export const SubmitPage: React.FC<{ img?: Blob; className?: string }> = (p) => {
    const [show, setShow] = useState(false);

    const imgURL = useMemo(() => p.img && URL.createObjectURL(p.img), [p.img])

    const [label, setLabel] = useState('');

    const { userData, actresslistData, mutation, login } = useData();



    const submit = useCallback(async () => {
        if (mutation.isLoading) {
            return
        }
        if (!p.img || !label) {
            alert('Please fill the info')
            return
        }
        const res = await mutation.mutateAsync({ img: p.img, label })
        console.log(res);
        setShow(false);
        info('submitted!')
    }, [p.img, label]);

    const content = <div >
        <div className="navbar mb-2 ">
            <div className="flex-1 px-2 ">
                <span className="text-lg font-bold">
                    Submit new face
                </span>
            </div>
            <div className="flex-none">
                <div className="avatar placeholder w-12 h-12">
                    {userData ? <img src={userData?.data.avatar_url}  /> : <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12">
                        <span>Guest</span>
                    </div>}
                </div>
            </div>
        </div>

        <div className="mask mask-squircle mx-auto my-8" style={{width:224, height:224}}>
            {imgURL && <img src={imgURL} width={224} height={224} />}
        </div>

        <div className="flex justify-center my-8">
            <SearchSelect options={actresslistData?.data || []} onChange={v => setLabel(v)} />
        </div>
        <div className="flex justify-center my-8">
            {!userData && <button onClick={login} className="btn btn-active">Login with github</button>} 
            {userData && <button className={'btn btn-secondary '+(mutation.isLoading?'loading':'')} onClick={submit}>submit</button>}
        </div>
    </div>;

    const dom = <Transition in={show} timeout={200}>
        {state => show && <div style={{ ...defaultStyle, ...transitionClass[state] }} className={"fixed top-0 w-full h-full "} >
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => setShow(false)}></div>
            <div className="container absolute right-0 top-0 h-full w-2/3 p-2 max-w-xl" style={{ backgroundColor: '#fff' }}>
                {content}
            </div>
        </div>}

    </Transition>;
    return <>
        <a className={"cursor-pointer " + p.className} onClick={() => setShow(true)}>
            recognize failed? <span className="link link-primary">submit a new face</span>
        </a>
        {createPortal(dom, document.body)}
    </>;
}

