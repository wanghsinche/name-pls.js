import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';
interface IItem {
    label: string;
    value: string;
}
interface IProps {
    options: IItem[];
    value?: string;
    onChange?: (v: string) => void;
}

export const SearchSelect: React.FC<IProps> = (p) => {
    const [v, setV] = useState(p.value || '');
    const [word, setWord] = useState('');
    const [show, setShow] = useState(false);
    const realV: string = v || p.value as string;

    const showOpt = useMemo(() => word ? p.options.filter(el => (el.value + el.label).toLowerCase().includes(word)).slice(0, 10) : [], [word])

    const cOnChange = useCallback((v: string) => {
        if (p.onChange) {
            p.onChange(v);
        }
        console.log(v)
        setV(v);
        setShow(false);
    }, [p.onChange]);

    const inputRef = createRef<HTMLInputElement>();

    useEffect(() => {
        inputRef.current?.focus();
    }, [show])

    return <div>
        <div className="h-8 border border-slate-500 w-52" style={{ display: !show ? 'block' : 'none' }} onClick={() => { setShow(true); }}>{realV}</div>
        <input ref={inputRef} className="h-8 border border-slate-500 w-52" style={{ display: show ? 'block' : 'none' }} value={word} onChange={e => setWord(e.target.value.toLowerCase())} ></input>
        <div style={{ display: show ? 'block' : 'none' }} className="border border-slate-500 w-52 ">
            {showOpt.length === 0 && <div>No Data</div>}
            {showOpt.map(el => <div className="cursor-pointer" key={el.value} onClick={() => {console.log('---');cOnChange(el.value)}}>{el.label}</div>)}
        </div>
    </div>;
}