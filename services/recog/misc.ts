import { Canvas, Image } from 'canvas';
import { Tensor } from 'onnxruntime-node';
const clasess:string[] = require('./classes.json');

export function createImage(src:string|Buffer){
    const img = new Image();
    return new Promise<Image>((res, rej)=>{
        img.onerror = e=>rej(e);
        img.onload = ()=>res(img);
        img.src = src;
    });
}

export function getEle(a:Array<number>|Float32Array, shape:number[],idx:number[]){
    const mul = (a:number[]) => a.reduce((am, el)=>am*el, 1);
    const pos = idx.reduce((am, el, i)=>el * mul(shape.slice(i+1)) + am, 0) 
    return a[pos];
}


/**
 * similar to opencv's blobfromimage, always direct resize without cropping and preserving aspect ratio is performed
 * Mean subtraction
 * Scaling
 * And optionally channel swapping
 * @param img 
 * @param scale multiplier for image values.
 * @param size  spatial size for output tensor, HEIGHT, WIDTH
 * @param inputMean scalar with mean values which are subtracted from channels
 * @returns 
 */
 export function blobFromImage(img:Image, scale=1/127.5, size=[112,112], inputMean=[127.5, 127.5, 127.5]){
    const [H, W] = size;

    const cnv = new Canvas(W, H, "image");
    const ctx = cnv.getContext('2d');

    // scale to size
    // const hRatio = W / img.width;
    // const vRatio = H / img.height;
    // due to opencv's doc
    // if crop is true, input image is resized so one side after resize is equal to corresponding dimension in size and another one is equal or larger. 
    // Then, crop from the center is performed. 
    // If crop is false, direct resize without cropping and preserving aspect ratio is performed.
    // const ratio  = Math.min ( hRatio, vRatio );

    // make it as same with opencv's resize with interpolation= cv2.INTER_LINEAR
    // still has some different
    // resize function will make it different with opencv
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(img, 0,0, img.width, img.height, 0,0,W, H);
    /**
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray
     * https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data
     */
    const bitmap = ctx.getImageData(0, 0, W, H);

    const total = W * H;

    
    const [R, G, B] = [new Array(total).fill(0),new Array(total).fill(0),new Array(total).fill(0)];
    
    new Array(total).fill(0).forEach((_, i)=>{
        // four channel, ignore alpha
        R[i] = bitmap.data[4*i];
        G[i] = bitmap.data[4*i+1];
        B[i] = bitmap.data[4*i+2];
    });

    const transposedData = R.concat(G).concat(B);
    // convert to 3 * height * width float32

    const float32Data = new Float32Array(3 * total);

    transposedData.forEach((el, i)=>{
        float32Data[i] = (el - inputMean[i%3]) * scale; // to keep the precious
    });

    // 5. create the tensor object from onnxruntime-web.
    const inputTensor = new Tensor("float32", float32Data, [1, 3, H, W]);
    return inputTensor;
}

export function normalizeVector(input: Array<number>|Float32Array){
    if (input instanceof Float32Array) {
        const l2Norm =input.reduce((am,cur)=>{
            return am + cur * cur;
        });    
        return input.map(el=>el/l2Norm);
    }
    else {
        const l2Norm =input.reduce((am,cur)=>{
            return am + cur * cur;
        });    
        return input.map(el=>el/l2Norm);
    }
}

export function topK(ls:Array<number>, k:number){
    return ls.map((el,idx)=>({label:clasess[idx], value:el})).sort((a,b)=>b.value-a.value).slice(0, k)
}