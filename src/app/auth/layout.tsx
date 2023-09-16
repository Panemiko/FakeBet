export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-1 flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
