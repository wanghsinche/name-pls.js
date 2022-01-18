import React from 'react';
import Image from 'next/image';
export const Sponsor = () => {
  return <>
    <a href="#about-modal" >🔔 About </a>
    <div id="about-modal" className="modal">
      <div className="modal-box">
        <div className="flex justify-around">
          <Image src="/android-chrome-512x512.png" height={140} width={140} title="icon" />
        </div>
        <h2 className="text-neutral text-center my-4">
          name-pls.js 
        </h2>
        <p className="text-neutral my-4">
          A Face Recognize Solution written in NodeJS. Using SOTA model optimized with eastern asian face. Running on microsoft's ONNX Runntime.</p>
        <p className="text-neutral my-8">
          Star it on <a href="https://github.com/wanghsinche/name-pls.js" target="_blank" className="link">GITHUB</a>  ❤️ </p>
        <div className="modal-action">
          <a href="#" className="btn">Close</a>
        </div>
      </div>
    </div>
  </>
}