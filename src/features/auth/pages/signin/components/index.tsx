import SignInForm from "./sign-in.form";


export default function SignInIndex() {
  return (
    <div className="w-full max-w-xl rounded-xl border bg-white p-6 shadow-sm z-10">
      <h1 className="text-xl font-semibold ">Login</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Please sign in to continue
      </p>

      <div className="mt-6">
        <SignInForm />
      </div>
    </div>
  );
}
