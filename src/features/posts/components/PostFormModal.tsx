"use client";

import { useEffect } from "react";
import { Form, Input, Modal, Select, Typography } from "antd";
import styled from "styled-components";
import type { Post, PostInput } from "@/apis/posts/types";
import { POST_CATEGORIES } from "@/lib/constants";
import { validatePost } from "@/features/posts/validation";

const ErrorText = styled(Typography.Text)`
  display: block;
  margin-top: 4px;
`;

type PostFormModalProps = {
  open: boolean;
  initialValue?: Post | null;
  onClose: () => void;
  onSubmit: (payload: PostInput) => Promise<void> | void;
};

export default function PostFormModal({
  open,
  initialValue,
  onClose,
  onSubmit,
}: PostFormModalProps) {
  const [form] = Form.useForm<PostInput>();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        title: initialValue?.title ?? "",
        body: initialValue?.body ?? "",
        category: initialValue?.category ?? POST_CATEGORIES[0],
        tags: initialValue?.tags ?? [],
      });
    }
  }, [form, open, initialValue]);

  const handleOk = async () => {
    const values = await form.validateFields();
    const payload: PostInput = {
      title: values.title.trim(),
      body: values.body.trim(),
      category: values.category,
      tags: Array.from(new Set(values.tags ?? [])), // 중복 제거
    };
    const errors = validatePost(payload);
    if (errors.length > 0) {
      errors.forEach((error) => {
        form.setFields([
          {
            name: error.field === "form" ? "title" : error.field,
            errors: [error.message],
          },
        ]);
      });
      return;
    }
    await onSubmit(payload);
    onClose();
  };

  return (
    <Modal
      open={open}
      title={initialValue ? "게시글 수정" : "게시글 작성"}
      onCancel={onClose}
      onOk={handleOk}
      okText="저장"
      cancelText="취소"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: "제목을 입력하세요." }]}
        >
          <Input maxLength={80} />
        </Form.Item>
        <Form.Item
          label="본문"
          name="body"
          rules={[{ required: true, message: "본문을 입력하세요." }]}
        >
          <Input.TextArea rows={6} maxLength={2000} />
        </Form.Item>
        <Form.Item label="카테고리" name="category">
          <Select>
            {POST_CATEGORIES.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="태그" name="tags">
          <Select mode="tags" placeholder="태그를 입력하세요" />
        </Form.Item>
        <ErrorText type="secondary">
          태그는 최대 5개, 각 24자 이내로 입력하세요.
        </ErrorText>
      </Form>
    </Modal>
  );
}
