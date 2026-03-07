"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "../ui/loadingScreen";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isVisible={loading} />
      {children}
    </>
  );
}
