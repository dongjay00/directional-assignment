import Link from "next/link";
import { Button, Typography } from "antd";
import styled from "styled-components";

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  background: radial-gradient(circle at top, #f7f4ef, #e8eefb 60%, #fdfcf7);
`;

const Card = styled.div`
  text-align: center;
  max-width: 420px;
`;

export default function NotFound() {
  return (
    <Page>
      <Card>
        <Typography.Text type="secondary">404</Typography.Text>
        <Typography.Title level={3} style={{ marginTop: 8 }}>
          페이지를 찾을 수 없습니다
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          주소를 확인하거나 로그인 페이지로 이동해 주세요.
        </Typography.Paragraph>
        <Button type="primary">
          <Link href="/">로그인 페이지로 이동</Link>
        </Button>
      </Card>
    </Page>
  );
}
