import * as ort from 'onnxruntime-node';
import { Image } from 'canvas';
import * as misc from './misc';
import { InferenceSession, OnnxValue } from 'onnxruntime-node';
import * as path from 'path';
export * from './misc';


let featSession:ort.InferenceSession;

const featModelPath = path.resolve(__dirname,'./r100-glint300k.onnx');

async function getFeatSession(){
    if (!featSession) {
        featSession = await ort.InferenceSession.create(featModelPath);
        console.info(`[onnxruntime-node] create session with ${featModelPath}`);
    }

    return featSession;
}

const bayesianModelPath = path.resolve(__dirname,'./bernoullinb_R100_Glint360K_XSList-full.onnx');

let bayesianSession: ort.InferenceSession;

async function getBayesianSession(){
    if (!bayesianSession) {
        bayesianSession = await ort.InferenceSession.create(bayesianModelPath);
        console.info(`[onnxruntime-node] create session with ${bayesianModelPath}`);
    }

    return bayesianSession;
}


export async function getFeat(face: Image){
    const tens = await misc.blobFromImage(face);
    const net_sess = await getFeatSession();
    const feed:Record<string, ort.Tensor> = {};
    feed[net_sess.inputNames[0]] = tens;
    
    const outputData = await net_sess.run(feed);
    const feat = outputData[net_sess.outputNames[0]].data as Float32Array;
    return misc.normalizeVector(feat)
}

// interface Ioutput {
//     label:OnnxValue;
//     probabilities:OnnxValue;
// }

export async function predict(feat: Float32Array) {
    const tens = new ort.Tensor('float32', feat, [1, 512]);
    const net_sess = await getBayesianSession();
    const feed:Record<string, ort.Tensor> = {};
    feed[net_sess.inputNames[0]] = tens;
    const outputData: InferenceSession.OnnxValueMapType = await net_sess.run(feed);
    return outputData;
}