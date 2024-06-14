import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HyeJeong Lim's blog",
  description: "Just Practices",
  icons: {
    icon: "duck-svgrepo-com.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <nav>
          <Link href="/">Home</Link> &nbsp;&nbsp;
          <Link href="/posts">Post</Link>
        </nav>
        {/* 로딩을 하게 된다면 아래의 내용만 따로 로딩이 일어나게 하면 된다. */}
        {/* 에러도 마찬가지. 에러가 있다면 header나 nav를 제외하고 body 등 특정 부분만 에러 표시를 할 수 있게 하면 된다. */}
        <main>
          {children}
        </main>
        </body>0
    </html>
  );
}
