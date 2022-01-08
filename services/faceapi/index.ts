// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
import '@tensorflow/tfjs-node';
// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import { Canvas, loadImage, ImageData, Image } from 'canvas';
import * as faceapi from '@vladmandic/face-api';
import * as path from 'path';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData

/**
 * vary important
 */
// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
faceapi.env.monkeyPatch({ 
    Canvas: Canvas as unknown as typeof HTMLCanvasElement, 
    Image: Image as unknown as typeof HTMLImageElement, 
    ImageData 
})


import { faceDetectionNet, faceDetectionOptions, faceLandmarksNet, faceLandmarksTinyNet } from './common/facedetection';
import { postprecessBox, rotateCanvas, theBestFaceWithLandmarks } from './common/utils';

export async function init() {
    if (!faceDetectionNet.isLoaded) {
        await faceDetectionNet.loadFromDisk(path.resolve(__dirname, 'model'))
    }
    if (!faceLandmarksTinyNet.isLoaded) {
        await faceLandmarksTinyNet.loadFromDisk(path.resolve(__dirname, 'model'))
    }
    if (!faceLandmarksNet.isLoaded) {
        await faceLandmarksNet.loadFromDisk(path.resolve(__dirname, 'model'))
    }

}
export async function getFaceFromBlob(blob: Buffer, scale = 1.2,size:[number, number] = [212, 212]) {

    await init();
    
    const img = await loadImage(blob) as unknown as HTMLImageElement
    const detection = await faceapi.detectAllFaces(img, faceDetectionOptions)
    .withFaceLandmarks(true);

    
    const theBest = theBestFaceWithLandmarks(detection);
    if (!theBest){
        return;
    }
    const regionsToExtract = [
        postprecessBox(theBest.detection.box, scale, size)
    ]
    // actually extractFaces is meant to extract face regions from bounding boxes
    // but you can also use it to extract any other region
    const canvases = await faceapi.extractFaces(img, regionsToExtract) as unknown as Canvas[]

    if (canvases.length < 1) {
        return;
    }


    const faceCanva = rotateCanvas(canvases[0], theBest.angle.roll!)

    return faceCanva.toBuffer('image/jpeg');
}
