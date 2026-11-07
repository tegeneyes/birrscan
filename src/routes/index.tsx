import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <h1>BirrScan</h1>
      <p>Payment receipt scanning for Ethiopian merchants.</p>
    </main>
  );
}
