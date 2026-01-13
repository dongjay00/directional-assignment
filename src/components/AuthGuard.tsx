"use client";

import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (!useAuthStore.persist?.hasHydrated) {
      setHasHydrated(true);
      return undefined;
    }
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    setHasHydrated(useAuthStore.persist.hasHydrated());
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (hasHydrated && !token) {
      router.replace("/");
    }
  }, [hasHydrated, router, token]);

  if (!hasHydrated) {
    return (
      <div style={{ padding: "32px" }}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }
  if (!token) return null;

  return <>{children}</>;
}
