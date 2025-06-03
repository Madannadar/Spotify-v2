import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button"

const SignInOAuthButton = () => {
  const { signIn, isLoaded } = useSignIn()

  if (!isLoaded) {
    return null
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback", // get the token from google and redirect to this url
      redirectUrlComplete: "/auth-callback", // after the user is authenticated, redirect to this url
    })
  }

  return (
    <Button onClick={signInWithGoogle} variant={"secondary"} className="w-full text-white border-zinc-200 h-11">
      continue with google
    </Button>
  )
}

export default SignInOAuthButton;
