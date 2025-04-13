import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/modules/layout.module.scss";
import Navbar from "@/components/Navbar/navbar.component";
import "../styles/modules/layout.module.scss";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Test Work 13",
  description: "Weather App with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${styles.wrapper}`}
      >
        <Navbar />

        <main className="container-fluid mt-5 px-4 py-3">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
