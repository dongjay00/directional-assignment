import AuthGuard from "@/components/AuthGuard";
import TopNav from "@/components/TopNav";
import styled from "styled-components";

const Shell = styled.div`
  min-height: 100vh;
  background: #f5f5f7;
`;

const Page = styled.main`
  padding: 48px 32px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Shell>
        <TopNav />
        <Page>
          <Container>{children}</Container>
        </Page>
      </Shell>
    </AuthGuard>
  );
}
