# Name-PLS.JS
[![node](https://img.shields.io/badge/node-%3E%3D14-green)](https://nodejs.org/) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/) [![onnx](https://img.shields.io/badge/onnxruntime-node-brightgreen)](https://onnxruntime.ai/) [![InsightFace](https://img.shields.io/badge/InsightFace-ai-red)](https://insightface.ai/)

A ONNX Runtime backed Face-Recognition implementation for Node.js. You can easily replace the pre-train ONNX format file with your [SOTA](https://github.com/onnx/models) model to inter other **IMAGE** machine learning problems, include but not limited to **face** _verification_, _recognition_ and **object** _detection_.

<img src="https://raw.githubusercontent.com/wanghsinche/name-pls.js/main/public/android-chrome-512x512.png" height="100" title="Name-PLS.JS" alt="Name-PLS.JS" />

An online demo can be found at [name-pls.com](https://name-pls.com)

<a href="https://ibb.co/Z1GpTcy"><img src="https://i.ibb.co/cXkST2z/2022-01-18-14-10-14-name-pls.png" alt="2022-01-18-14-10-14-name-pls" border="0"></a>

Using InsightFace, sklearn and ONNX to extract feature and classify.

<img src="https://insightface.ai/assets/img/custom/logo3.jpg" height="100"/> <img src="https://raw.githubusercontent.com/scikit-learn/scikit-learn/main/doc/logos/scikit-learn-logo.png" height="100" /><img src="https://onnxruntime.ai/images/svg/ONNX-Runtime-logo.svg" height="100" />

Thanks for [Next.js](https://nextjs.org/) and [daisyui](https://daisyui.com/)'s awasome UI Lib. 


## Getting Started

First, run the development server:

```bash
# install dependencies
yarn add

# run the dev server, make sure your free memory is enough
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Besides, you can directly call the `api/recog` to recognize your image. In fact, it doesn't require a preprocessing.

To use your customized pre-train model, you can easily convert it into ONNX format and put it in `services/recog/model`. Be cautioned, you should modify the preprocessing method to make your input match your model. 

The bayesian classifier was trained with Japanese actress face. To add more actress in the feature db, you can try the notebooks in `/notebook` folder.

## How does it work

![workflow](http://www.plantuml.com/plantuml/svg/NL31ifim3BphApJla9xeJF81cNn3pxa8B8WwHcPaCsdwzRKSIaalOAzsLxk-vK9MrZd2A97nAvbCeXHHPfhu2odNqtG6q1JgUAI1CN3XeKZIk-BfX1HbqfcrDFPYl5WQE6VN57PCpu2kf4M-_yp06j170E3Us8NqrExwAQtmklm7RXdRGWvkkIUyx0cPocgC_AiOjPIDKY-QnsGpso7N1H15iqoFucRVClxWh5nmhbwn3jDIP9RV7F0fvO5CkR1frGffstyiyoygTjSjb7_zzhd_idS-ubizjyMjHilkPu03SrU_9u4AzPGFvQFqHlPgwj3_VPgUJTCQes1FBsuLxef3f9nb53Qdr-i806wqRt4ezDYPlrDtROo5BIV5zm-WOljymswiOPtZ7m00)

## TO DO

- Face detect and align module relies on `faceapi.js`, which is built on Tensorflow.js and causes high memory usage. It'd be better to replace this module with onnx runtime module.
- The Node Canvas module has external c++ libray dependecies, which is unfriendly to deploy them on cloud platform such as vercel or aws lambda. Replacing it with Jimp to process image would be more compatible.
- The feature extraction pre-trained model is still low precision (about 70%).  
