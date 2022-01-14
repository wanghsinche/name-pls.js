import { Octokit } from '@octokit/rest';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { loginByGithub } from '@/services/submitface';
enum API {
    login = '/github/login',
    actresslist = '/api/actresslist',
    comments = '/github/comment'
}
export const useData=()=>{
    const [token, setToken] = useState(global.sessionStorage?.getItem('token') as string);
    const oct = useRef<Octokit>();
    useEffect(()=>{
        oct.current = new Octokit({auth:token});
    }, [token])

    const {data: userData} = useQuery(API.login+token, ()=>oct.current?.request('GET /user'), {
        enabled: !!oct.current
    });

    const {data: actresslistData} = useQuery(API.actresslist, ()=>axios.get<unknown, AxiosResponse<{label:string;value:string;}[]>>(API.actresslist));

    const mutation = useMutation<{}, unknown, {img:Blob; label:string}>(async (d)=>{
        const encoded = await new Promise(resolve=>{
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            }
            reader.readAsDataURL(d.img);
        })
        return oct.current!.issues.createComment({
            owner: 'wanghsinche',
            repo: 'action-practise',
            issue_number: 1,
            body: `${d.label}\n[img](${encoded})`
        });
    })  
    
    const login = useCallback(async () => {
        window.open(loginByGithub());
        const tk = await new Promise(res => {
            const ii = (msg: MessageEvent) => {
                console.log(msg);
                window.removeEventListener("message", ii);
                res(msg.data);
            };
            window.addEventListener("message", ii);
        });
        sessionStorage.setItem('token', tk as string);
        setToken(tk as string);
    }, [])


    return {
        userData, actresslistData, mutation, login
    }
}