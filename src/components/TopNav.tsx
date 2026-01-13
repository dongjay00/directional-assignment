"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu, Button, Space, Typography } from "antd";
import { useAuthStore } from "@/features/auth/store";
import styled from "styled-components";

const { Header } = Layout;

const Wrapper = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-bottom: 1px solid #e6e8ec;
  padding: 8px 32px;
`;

const NavTitle = styled(Typography.Text)`
  font-weight: 600;
  font-size: 18px;
`;

export default function TopNav() {
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const items = [
    { key: "/posts", label: <Link href="/posts">게시판</Link> },
    { key: "/charts", label: <Link href="/charts">차트</Link> },
  ];

  return (
    <Wrapper>
      <Space size={24} align="center">
        <NavTitle>디렉셔널 과제</NavTitle>
        <Menu
          mode="horizontal"
          selectedKeys={[pathname]}
          items={items}
          style={{ borderBottom: "none" }}
        />
      </Space>
      <Space size={16} align="center">
        <Typography.Text type="secondary">{user?.email}</Typography.Text>
        {token ? <Button onClick={clearSession}>로그아웃</Button> : null}
      </Space>
    </Wrapper>
  );
}
