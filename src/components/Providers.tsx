"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ChatProvider } from "@/contexts/ChatContext";
import AdminChat from "@/components/AdminChat";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <ChatProvider>
          {children}
          <AdminChat />
        </ChatProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}
