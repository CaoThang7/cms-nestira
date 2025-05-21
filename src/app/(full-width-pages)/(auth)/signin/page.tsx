import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nestira Admin | SignIn",
  description: "This is Next.js Signin Page Nestira Admin Dashboard Template",
};

export default function SignIn() {
  return <SignInForm />;
}
