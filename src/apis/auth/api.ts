import { requestJson } from "@/lib/http";
import { LoginRequest, LoginResponseDto } from "./types";

export const login = (payload: LoginRequest) =>
  requestJson<LoginResponseDto, LoginRequest>("/auth/login", {
    method: "POST",
    body: payload,
  });
