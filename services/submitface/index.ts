import { Octokit } from '@octokit/rest';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';

const info = {
    clientId: "95353c42e0068b5dbbbf",
    clientSecret: "f7ce87de2b6d7941c407cb6d9a51765559c7e5f2",
  }


export function loginByGithub() {
    const url = new URL('https://github.com/login/oauth/authorize')
    url.searchParams.set('client_id', info.clientId);
    url.searchParams.set('scope','public_repo');
    url.searchParams.set('redirect_uri', encodeURI('http://localhost:3000/github_oauth'))
    return url.href;
}

export async function auth(code:string){
    const github = new Octokit({
        authStrategy: createOAuthAppAuth,
        auth: info,  
    });
    
    const res = await github.auth({
        type: "oauth-user",
        code,
    }) as {
        token: string;
    }
    return res;
}
