import React from 'react';
import Image from 'next/image';
export const Sponsor = () => {
    return <>
    <a href="#my-modal" >💰 Sponor AI </a> 
      <div id="my-modal" className="modal">
      <div className="modal-box">
        <div className="flex justify-around">
        <Image src="/Ethereum_QR.png" height={140} width={140}/>
        <Image src="/Tether_QR.png" height={140} width={140}/>
        </div>
        <p className="text-neutral my-8">Due to the costly AI computation fee, you donate is pretty important to this project. Much appreciated to sponsor with USDT or ETH. ❤️ </p> 
        <p className="text-neutral my-8">Top Sponsors: 
          <kbd className="kbd text-ellipsis overflow-hidden w-32 my-2 mx-2">0xa053c0c9f32ccbb0b871b22d1c1050e89e87ab7b</kbd> 
          <kbd className="kbd text-ellipsis overflow-hidden w-32 my-2 mx-2">0x088876687ac7c4c60cbc0690a4bfae0971964162</kbd> 
          <kbd className="kbd text-ellipsis overflow-hidden w-32 my-2 mx-2">0x59728544b08ab483533076417fbbb2fd0b17ce3a</kbd> 
        </p> 
        <div className="modal-action">
          <a href="#" className="btn">Close</a> 
        </div>
      </div>
    </div>
    </>
}