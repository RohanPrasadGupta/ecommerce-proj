"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoaderComp from "./components/loadingPage/LoaderComp";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/pages/dashboard");
  }, [router]);

  return <LoaderComp />;
}
