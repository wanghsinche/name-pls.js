// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer'
import { promisify } from 'util';
import { getFaceFromBlob } from '@/services/faceapi';
import { saveBlob } from '@/utils/saveblob';
import * as path from 'path';

const upload = multer({ storage: multer.memoryStorage() })

interface IMulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer:Buffer;
    size: number;
  }

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
    const data = (req as any).file as IMulterFile;

    const face = await getFaceFromBlob(data.buffer, 1, [224,224]);

    let out = path.resolve(process.cwd(), './face.jpg');
    if (face) {
        out = face.length + ''
    }
    else {
        out = 'no face'
    }

    return res.status(200).json({ name: out })
}

export const config = {
    api: {
        bodyParser: false,
    },
}

