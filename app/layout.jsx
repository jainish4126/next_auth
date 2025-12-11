import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Authentication System",
  description: "Secure authentication system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{<Providers>{children}</Providers>}</body>
    </html>
  );
}