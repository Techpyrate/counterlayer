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
      className={`mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-8 xl:px-10 ${
        narrow ? "max-w-3xl" : "max-w-[min(100%,1600px)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
