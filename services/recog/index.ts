import * as ort from 'onnxruntime-node';
import { Image } from 'canvas';
import * as misc from './misc';

export * from './misc';

let session:ort.InferenceSession;

const modelPath = '/mnt/c/Documents and Settings/wangh/Downloads/r100-glint300k.onnx';

async function getSession(){
    if (!session) {
        session = await ort.InferenceSession.create(modelPath);
        console.info(`[onnxruntime-node] create session with ${modelPath}`);
    }

    return session;
}


export async function getFeat(face: Image){
    const blob = await misc.blobFromImage(face);
    const net_sess = await getSession();
    const feed:Record<string, ort.Tensor> = {};
    feed[net_sess.inputNames[0]] = blob;
    
    const outputData = await net_sess.run(feed);
    const feat = outputData[net_sess.outputNames[0]].data as Float32Array;
    return misc.normalizeVector(feat)
}