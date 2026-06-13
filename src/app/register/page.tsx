import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | VeloProxy",
  description: "Create your VeloProxy account and purchase a plan to get started",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
