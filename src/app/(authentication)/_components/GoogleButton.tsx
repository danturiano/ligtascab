"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "../_lib/actions";

export default function GoogleButton() {
  return (
    <form className="w-full md:w-[20rem]" action={signInWithGoogle}>
      <Button
        className="w-full p-1 hover:text-primary"
        variant="outline"
        type="submit"
      >
        <div className="flex gap-2 items-center">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="14"
            width="14"
          />
          <span>Google</span>
        </div>
      </Button>
    </form>
  );
}
