// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import { promisify } from 'util';

const upload = multer({ storage: multer.memoryStorage() })


export type IData = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IData>
) {
    if (req.method !== 'POST') {
        return res.status(400);
    }
    await promisify(upload.single('file'))(req as any, res as any);
    const data = (req as any).file as File;
    console.log(data);
    return res.status(200).json({ name: 'John Doe' })
}

export const config = {
    api: {
        bodyParser: false,
    },
}

