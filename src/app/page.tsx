import styled from "styled-components";
import LoginPanel from "@/features/auth/components/LoginPanel";

const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: radial-gradient(circle at top, #f7f4ef, #e8eefb 60%, #fdfcf7);
`;

export default function LoginPage() {
  return (
    <Page>
      <LoginPanel />
    </Page>
  );
}
