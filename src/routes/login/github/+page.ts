

import { error, redirect } from '@sveltejs/kit';
import { goto, invalidate } from '$app/navigation';
import type { PageLoad } from './$types';
import { browser } from '$app/environment'; 

const OAUTH_URL = "https://github.com/login/oauth/authorize";
const CLIENT_ID = "Ov23liZxB5WZVqEt7Gja";

export const load: PageLoad = async ({ url, fetch }) => {  
  const code = url.searchParams.get("code");

  if (code) {
    const body = new URLSearchParams();
    body.append("oauth_method", "github")
    body.append("code", code)
    const response = await fetch("/api/auth/user", {
      method: "PUT",
      body: body.toString()
    })
    const user = await response.json()    
    
    if (!user.ok) {
      return error(400, "user creation failed.")
    }
    return  redirect(303, "/")
  }
  const githubOAuthURL =  new URL(OAUTH_URL);
  githubOAuthURL.searchParams.append("client_id", CLIENT_ID)
  githubOAuthURL.searchParams.append("redirect_uri", url.origin + url.pathname)
  if (browser) {
    window.location.href = githubOAuthURL.toString();
  } else {
    redirect(303, githubOAuthURL)
  }
}