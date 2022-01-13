import { NextApiRequest, NextApiResponse } from "next";
const classes:string[] = require('@/services/recog/classes');


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{label:string;value:string}[]>
){
    res.json(classes.map(el=>({label:el, value:el})));
}