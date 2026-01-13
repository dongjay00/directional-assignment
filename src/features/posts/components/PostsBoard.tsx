"use client";

import { SettingOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Dropdown,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useQueryClient } from "@tanstack/react-query";
import type { ColumnsType } from "antd/es/table";
import { useMemo, useRef, useState } from "react";
import { Resizable } from "react-resizable";
import styled from "styled-components";
import { createPost } from "@/apis/posts/api";
import type { Post } from "@/apis/posts/types";
import PostFormModal from "@/features/posts/components/PostFormModal";
import {
  useCreatePostMutation,
  useDeleteAllPostsMutation,
  useDeletePostMutation,
  useInfinitePosts,
  useUpdatePostMutation,
} from "@/features/posts/queries";
import { createDummyPosts } from "@/features/posts/seedPosts";
import { useAuthStore } from "@/features/auth/store";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { POST_CATEGORIES } from "@/lib/constants";

const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

const Controls = styled(Space)`
  flex-wrap: wrap;
`;

const formatDate = (value: Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);

const ResizableTitle = (
  props: React.HTMLAttributes<HTMLTableCellElement> & {
    width?: number;
    onResize?: (
      e: React.SyntheticEvent,
      data: { size: { width: number } }
    ) => void;
  }
) => {
  const { onResize, width, ...restProps } = props;
  if (!width || !onResize) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={<span className="react-resizable-handle" />}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default function PostsBoard() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 300);
  const search = debouncedSearchInput.trim();
  const [sort, setSort] = useState<"createdAt" | "title">("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [category, setCategory] = useState<string>("all");
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    {
      title: true,
      category: true,
      tags: true,
      createdAt: true,
      actions: true,
    }
  );
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    title: 280,
    category: 140,
    tags: 220,
    createdAt: 180,
    actions: 160,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePosts({
      limit: 10,
      search,
      sort,
      order,
      category: category === "all" ? undefined : category,
    });

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );

  const createMutation = useCreatePostMutation();
  const updateMutation = useUpdatePostMutation();
  const deleteMutation = useDeletePostMutation();
  const deleteAllMutation = useDeleteAllPostsMutation();

  const handleSeedPosts = async () => {
    if (isSeeding) return;
    if (!token) {
      message.error("로그인이 필요합니다.");
      return;
    }
    setIsSeeding(true);
    try {
      const posts = createDummyPosts(30);
      for (const post of posts) {
        await createPost(token, post);
      }
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("더미 게시글 30건을 생성했습니다.");
    } catch (error) {
      console.error(error);
      message.error("더미 게시글 생성에 실패했습니다.");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleResize =
    (key: string) =>
    (_: React.SyntheticEvent, { size }: { size: { width: number } }) => {
      setColumnWidths((prev) => ({ ...prev, [key]: size.width }));
    };

  const columns: ColumnsType<Post> = useMemo(
    () => [
      {
        title: "제목",
        dataIndex: "title",
        key: "title",
        width: columnWidths.title,
        render: (_, record) => (
          <div>
            <Typography.Text strong>{record.title}</Typography.Text>
            <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
              {record.body}
            </Typography.Paragraph>
          </div>
        ),
      },
      {
        title: "카테고리",
        dataIndex: "category",
        key: "category",
        width: columnWidths.category,
        render: (value) => <Tag>{value}</Tag>,
      },
      {
        title: "태그",
        dataIndex: "tags",
        key: "tags",
        width: columnWidths.tags,
        render: (tags: string[]) =>
          tags.length === 0 ? (
            <Typography.Text type="secondary">태그 없음</Typography.Text>
          ) : (
            <Space wrap>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Space>
          ),
      },
      {
        title: "작성일",
        dataIndex: "createdAt",
        key: "createdAt",
        width: columnWidths.createdAt,
        render: (value: Date) => (
          <Typography.Text type="secondary">
            {formatDate(value)}
          </Typography.Text>
        ),
      },
      {
        title: "관리",
        key: "actions",
        width: columnWidths.actions,
        render: (_, record) => (
          <Space>
            <Button
              size="small"
              onClick={() => {
                setEditingPost(record);
                setModalOpen(true);
              }}
            >
              수정
            </Button>
            <Popconfirm
              title="게시글을 삭제할까요?"
              okText="삭제"
              cancelText="취소"
              okButtonProps={{ danger: true }}
              onConfirm={() => deleteMutation.mutateAsync(record.id)}
            >
              <Button size="small" danger>
                삭제
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [
      columnWidths.actions,
      columnWidths.category,
      columnWidths.createdAt,
      columnWidths.tags,
      columnWidths.title,
      deleteMutation,
    ]
  );

  const mergedColumns = columns
    .map((col) => ({
      ...col,
      onHeaderCell: (column: ColumnsType<Post>[number]) => ({
        width: column.width,
        onResize: handleResize(column.key as string),
      }),
    }))
    .filter((col) => visibleColumns[col.key as string]);

  const menuItems = columns.map((column) => ({
    key: column.key as string,
    label: (
      <Space>
        <Badge
          status={visibleColumns[column.key as string] ? "success" : "default"}
        />
        {column.title as string}
      </Space>
    ),
  }));

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    target: sentinelRef,
    onIntersect: () => fetchNextPage(),
  });

  return (
    <div>
      <HeaderRow>
        <div>
          <Typography.Title level={3}>게시판</Typography.Title>
          <Typography.Text type="secondary">
            게시글 작성 / 조회 / 수정 / 삭제 (CRUD)
          </Typography.Text>
        </div>
        <Space>
          <Button onClick={handleSeedPosts} loading={isSeeding}>
            {isSeeding
              ? "생성중입니다. 잠시만 기다려주세요."
              : "더미 게시글 생성"}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setEditingPost(null);
              setModalOpen(true);
            }}
          >
            게시글 작성
          </Button>
          <Popconfirm
            title="모든 게시글을 삭제할까요?"
            description="이 작업은 되돌릴 수 없습니다."
            okText="삭제"
            cancelText="취소"
            okButtonProps={{ danger: true }}
            onConfirm={() => deleteAllMutation.mutateAsync()}
          >
            <Button danger>전체 삭제</Button>
          </Popconfirm>
        </Space>
      </HeaderRow>

      <Card>
        <Controls size="middle">
          <Input
            placeholder="제목/본문 검색"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{ width: 220 }}
          />
          <Select
            value={sort}
            onChange={(value) => setSort(value)}
            style={{ width: 140 }}
            options={[
              { value: "createdAt", label: "작성일" },
              { value: "title", label: "제목" },
            ]}
          />
          <Select
            value={order}
            onChange={(value) => setOrder(value)}
            style={{ width: 140 }}
            options={[
              { value: "asc", label: "오름차순" },
              { value: "desc", label: "내림차순" },
            ]}
          />
          <Select
            value={category}
            onChange={(value) => setCategory(value)}
            style={{ width: 140 }}
            options={[
              { value: "all", label: "전체" },
              ...POST_CATEGORIES.map((value) => ({ value, label: value })),
            ]}
          />
          <Dropdown
            menu={{
              items: menuItems,
              onClick: ({ key }) =>
                setVisibleColumns((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                })),
            }}
          >
            <Button icon={<SettingOutlined />}>컬럼 설정</Button>
          </Dropdown>
        </Controls>

        <div style={{ height: 16 }} />

        <Table
          components={{ header: { cell: ResizableTitle } }}
          columns={mergedColumns}
          dataSource={posts}
          rowKey="id"
          pagination={false}
          loading={isLoading}
        />

        <div style={{ marginTop: 16, textAlign: "right" }}>
          <Typography.Text type="secondary">
            {posts.length}건 표시
          </Typography.Text>
          {isFetchingNextPage ? (
            <Typography.Text style={{ marginLeft: 8 }}>
              추가 로딩 중...
            </Typography.Text>
          ) : null}
        </div>
        <div ref={sentinelRef} />
      </Card>

      <PostFormModal
        open={modalOpen}
        initialValue={editingPost}
        onClose={() => setModalOpen(false)}
        onSubmit={async (payload) => {
          if (editingPost) {
            await updateMutation.mutateAsync({
              id: editingPost.id,
              payload,
            });
            return;
          }

          await createMutation.mutateAsync(payload);
        }}
      />
    </div>
  );
}
