"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ZustandProvider } from "@store/zustand";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Hydrate } from "react-query/hydration";
import { useState } from "react";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <ZustandProvider>
              <QueryClientProvider client={queryClient}>
                <Hydrate state={queryClient.dehydrate()}>
                  <ErrorBoundary>{children}</ErrorBoundary>
                </Hydrate>
              </QueryClientProvider>
            </ZustandProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}