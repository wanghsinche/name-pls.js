import { NextApiRequest, NextApiResponse } from "next";
import { list } from '@/services/recog/list';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{label:string;value:string}[]>
){
    res.json(list);
}