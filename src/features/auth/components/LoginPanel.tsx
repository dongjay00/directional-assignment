"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Form, Input, Alert, Typography } from "antd";
import styled from "styled-components";
import { useLoginMutation } from "@/features/auth/queries";
import { useAuthStore } from "@/features/auth/store";

const Wrapper = styled.div`
  max-width: 420px;
  width: 100%;
`;

export default function LoginPanel() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { mutateAsync, isPending, error } = useLoginMutation();

  useEffect(() => {
    if (token) {
      router.replace("/posts");
    }
  }, [router, token]);

  const handleFinish = async (values: { email: string; password: string }) => {
    await mutateAsync(values);
  };

  return (
    <Wrapper>
      <Card>
        <Typography.Title level={4}>로그인</Typography.Title>
        <Typography.Paragraph type="secondary">
          제공된 계정으로 인증해주세요.
        </Typography.Paragraph>
        {error ? (
          <Alert
            type="error"
            title="로그인 실패"
            description="이메일 또는 비밀번호를 확인해 주세요."
            showIcon
            style={{ marginBottom: 16 }}
          />
        ) : null}
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="이메일"
            name="email"
            rules={[{ required: true, message: "이메일을 입력하세요." }]}
          >
            <Input type="email" placeholder="example@domain.com" />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력하세요." }]}
          >
            <Input.Password placeholder="비밀번호" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending} block>
            로그인
          </Button>
        </Form>
      </Card>
    </Wrapper>
  );
}
