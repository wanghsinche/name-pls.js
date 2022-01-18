const actress:{label:string;value:string;}[] = require('@/services/recog/label');

export const list = actress

export const record = list.reduce((am, cu)=>{
    am[cu.value] = cu.label; 
    return am;
}, {} as Record<string, string>)