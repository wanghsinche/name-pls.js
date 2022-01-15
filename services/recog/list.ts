const actress:{id:string;cast:string;alias:string;}[] = require('@/services/recog/xslist-cast');

export const list = actress.map(el=>({label:el.alias.replace(/\/Age \d+/,''), value:`${el.id}/${el.cast.replaceAll(' ','_')}`}));

export const record = list.reduce((am, cu)=>{
    am[cu.value] = cu.label; 
    return am;
}, {} as Record<string, string>)