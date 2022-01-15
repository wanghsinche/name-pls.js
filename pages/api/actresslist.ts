import { NextApiRequest, NextApiResponse } from "next";
const classes:{id:string;cast:string;alias:string;}[] = require('@/services/recog/xslist-cast');


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{label:string;value:string}[]>
){
    res.json(classes.map(el=>({label:el.alias.replace(/\/Age \d+/,''), value:`${el.id}/${el.cast.replaceAll(' ','_')}`})));
}