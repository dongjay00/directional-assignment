import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/app/providers";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import "antd/dist/reset.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Directional 과제",
  description:
    "React 기반 웹 애플리케이션 구현 능력, API 연동, 코드 구조화, UI 완성도 등을 종합적으로 평가하기 위한 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <AntdRegistry>
            <Providers>{children}</Providers>
          </AntdRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
