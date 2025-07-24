// Review: We should also add an app/error.tsx (Error Boundary) 
// and app/not-found.tsx (404 fallback) alongside this layout.

import "../styles/globals.css";
import Head from "./head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head />
      <body>{children}</body>
    </html>
  );
}
