export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://fe-hiring-rest-api.vercel.app";

export const FORBIDDEN_WORDS = ["캄보디아", "프놈펜", "불법체류", "텔레그램"];

export const POST_CATEGORIES = ["NOTICE", "QNA", "FREE"] as const;
