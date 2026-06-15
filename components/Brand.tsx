export function Brand({ sub = "PARK · BRIDGE · PAY" }: { sub?: string }) {
  return (
    <div className="flex items-center gap-2">
      <BrandMark />
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold tracking-tight">ParkBridge</span>
        <span className="font-mono text-[8.5px] tracking-[1.5px] text-gray-400 uppercase">{sub}</span>
      </div>
    </div>
  );
}

export function BrandMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="oklch(0.55 0.15 250)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 12c2.4 0 2.4-4 5.5-4s3.1 4 5.5 4 2.4-4 3.5-4" />
      <path d="M1.5 12v2M16.5 12v2M6 9.2v4.8M12 9.2v4.8" />
    </svg>
  );
}
