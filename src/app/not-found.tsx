import Link from "next/link";
import { MachineVisual } from "@/components/machines/MachineVisual";

export default function NotFound() {
  return (
    <section className="container-luxe flex flex-col items-center py-20 text-center sm:py-28">
      <MachineVisual kind="capsule" color="#e8dcc4" steam className="size-48" />
      <p className="eyebrow mt-6">404</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">This cup is empty.</h1>
      <p className="mt-4 max-w-md text-muted">The page you’re looking for has moved or never existed. Let’s get you back to the good stuff.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/machines" className="btn btn-primary">
          Browse machines
        </Link>
        <Link href="/" className="btn btn-ghost">
          Go home
        </Link>
      </div>
    </section>
  );
}
