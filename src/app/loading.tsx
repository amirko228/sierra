import { Container } from '@/components/layout/Container';

export default function Loading() {
  return (
    <Container className="py-24">
      <div className="h-8 w-48 animate-pulse rounded-xl bg-sierra-latte" />
      <div className="mt-6 h-4 max-w-md animate-pulse rounded bg-sierra-latte/80" />
      <div className="mt-3 h-4 max-w-sm animate-pulse rounded bg-sierra-mist/60" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="h-40 animate-pulse rounded-3xl bg-sierra-latte/50" />
        <div className="h-40 animate-pulse rounded-3xl bg-sierra-latte/50" />
      </div>
    </Container>
  );
}
