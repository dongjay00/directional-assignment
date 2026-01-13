import type { PostInput } from "@/apis/posts/types";
import { FORBIDDEN_WORDS } from "@/lib/constants";

export type PostValidationError = {
  field: keyof PostInput | "tags" | "form";
  message: string;
};

export const validatePost = (payload: PostInput): PostValidationError[] => {
  const errors: PostValidationError[] = [];
  const forbidden = FORBIDDEN_WORDS.find((word) =>
    [payload.title, payload.body].some((text) => text.includes(word)),
  );

  if (payload.title.trim().length === 0) {
    errors.push({ field: "title", message: "제목은 필수입니다." });
  } else if (payload.title.length > 80) {
    errors.push({ field: "title", message: "제목은 80자 이내여야 합니다." });
  }

  if (payload.body.trim().length === 0) {
    errors.push({ field: "body", message: "본문은 필수입니다." });
  } else if (payload.body.length > 2000) {
    errors.push({ field: "body", message: "본문은 2000자 이내여야 합니다." });
  }

  if (payload.tags.length > 5) {
    errors.push({ field: "tags", message: "태그는 최대 5개까지 가능합니다." });
  }

  const invalidTag = payload.tags.find((tag) => tag.length > 24);
  if (invalidTag) {
    errors.push({
      field: "tags",
      message: `태그 "${invalidTag}"는 24자를 넘을 수 없습니다.`,
    });
  }

  if (forbidden) {
    errors.push({
      field: "form",
      message: `금칙어가 포함되어 있습니다: ${forbidden}.`,
    });
  }

  return errors;
};
