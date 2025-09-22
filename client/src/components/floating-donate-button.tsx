import { Link } from "wouter";

export default function FloatingDonateButton() {
  return (
    <Link
      href="/donate"
      aria-label="Donate to Access Global Foundation"
      className="group fixed bottom-5 right-4 z-50 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white text-primary-600 shadow-xl ring-1 ring-primary-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:bottom-8 md:right-8 md:h-16 md:w-16 lg:bottom-10 lg:right-10"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-success-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <i className="fas fa-heart text-xl transition-colors duration-300 group-hover:text-primary-700 md:text-2xl" />
      <span className="sr-only">Donate to Access Global Foundation</span>
    </Link>
  );
}
