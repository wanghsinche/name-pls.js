import { Octokit } from '@octokit/rest';
import React, { useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
enum API {
    login = '/github/login',
    actresslist = '/api/actresslist',
    comments = '/github/comment'
}
export const useData=()=>{
    const token = global.sessionStorage?.getItem('token');
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
    


    return {
        userData, actresslistData, mutation
    }
}