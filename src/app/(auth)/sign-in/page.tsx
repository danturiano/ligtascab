import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import GoogleButton from "../_components/GoogleButton";
import SignInForm from "../_components/SignInForm";

export default async function SignInPage() {
  return (
    <div className="container md:flex items-center justify-center flex-col">
      <div className="flex flex-col rounded-md items-start gap-4 md:gap-6 bg-white">
        <div className="text-start">
          <h1 className="text-2xl font-bold md:tracking-normal md:text-3xl">
            Login to Ligtascab
          </h1>
          <div className="flex gap-1 items-center text-sm md:text-lg md:gap-2">
            <p className="text-sm text-muted-foreground md:text-lg">
              Don&apos;t have an account?
            </p>
            <Link href="/sign-up">
              <span className="text-sm text-primary md:text-lg">Sign up.</span>
            </Link>
          </div>
        </div>
        <SignInForm />
        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center w-full">
          <Separator orientation="horizontal" />
          <p className="text-center text-xs text-muted-foreground font-semibold">
            OR
          </p>
          <Separator orientation="horizontal" />
        </div>
        <GoogleButton />
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4">
        By signing in, you agree to our{" "}
        <span className="text-primary font-medium">Terms</span> and{" "}
        <span className="text-primary font-medium">Privacy Policy</span>.
      </p>
    </div>
  );
}
