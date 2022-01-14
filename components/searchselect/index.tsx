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

    return <div className="form-control" style={{ position: 'relative' }}>
        <div className="fixed left-0 top-0 w-full h-full z-0" style={{ display: show ? 'block' : 'none' }} onClick={() => { setShow(false); }}></div>
        <input className="input input-bordered" style={{ display: !show ? 'block' : 'none' }} onClick={() => { setShow(true); }} value={realV} placeholder="actress name"></input>
        <div className="z-10 dropdown" style={{ display: show ? 'block' : 'none' }} >
            <input ref={inputRef} value={word} onChange={e => setWord(e.target.value.toLowerCase())} type="text" placeholder="actress name" className="input input-bordered" />
            <ul tabIndex={0} className="shadow bg-base-100 menu dropdown-content w-full mt-2">
                {showOpt.length === 0 && <li><a>No Data</a></li>}
                {showOpt.map(el => <li key={el.value}><a onClick={() => { cOnChange(el.value); }}>{el.label}</a></li>)}
            </ul>
        </div>
    </div>


}

