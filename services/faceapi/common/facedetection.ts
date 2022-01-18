import * as faceapi from '@vladmandic/face-api';

export const faceDetectionNet = faceapi.nets.ssdMobilenetv1
// export const faceDetectionNet = faceapi.nets.tinyFaceDetector
export const faceLandmarksNet = faceapi.nets.faceLandmark68Net
export const faceLandmarksTinyNet = faceapi.nets.faceLandmark68TinyNet

// SsdMobilenetv1Options
const minConfidence = 0.5

// TinyFaceDetectorOptions
  // size at which image is processed, the smaller the faster,
  // but less precise in detecting smaller faces,
  // must be divisible by 32, 
  // common sizes are 128, 160, 224, 320, 416, 512, 608,
  // for face tracking via webcam I would recommend using smaller sizes,
  // e.g. 128, 160, for detecting smaller faces use larger sizes, e.g. 512, 608
  // default: 416

const inputSize = 512
const scoreThreshold = 0.5

function getFaceDetectorOptions(net: faceapi.NeuralNetwork<any>) {
  return net === faceapi.nets.ssdMobilenetv1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

export const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet)
