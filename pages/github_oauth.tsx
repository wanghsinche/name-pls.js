import { auth } from "@/services/submitface";
import { NextPage, GetServerSidePropsContext } from "next";
import { useEffect } from "react";

const Oauth:NextPage<{token:string}>=(p)=>{
    
    useEffect(()=>{
      window.opener?.postMessage(p.token, '*');
      console.log(window.opener, p.token);
      window.close();
    }, [p.token])

    return <div>
      redirect ...
    </div>;
}

export default Oauth;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const res = await auth(ctx.query['code'] as string)
  
  return {
    props: {token:res.token}, // will be passed to the page component as props
  }
}

