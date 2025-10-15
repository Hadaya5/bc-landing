import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <img
        src="/logo.png"
        alt="Logo de baila ciencias"
        width={80}
        height={50}
      />
    </Link>
  );
}
