export function PageWrap({
  children,
  className = "",
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-10 ${
        narrow ? "max-w-3xl" : "max-w-[1600px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
