export type TChevronUp = {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

export default function ChevronUp({
  width = 20,
  height = 20,
  color = "#1E4E49",
  className = "",
}: TChevronUp) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M3.75 12.5L10 6.25L16.25 12.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
