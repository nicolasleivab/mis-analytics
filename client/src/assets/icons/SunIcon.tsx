import { TIconProps } from "./types";

export default function SunIcon({
  width = 24,
  height = 24,
  color = "#F7DAA1",
  className = "",
}: TIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
    >
      <path
        fill={color}
        stroke={color}
        d="M12 4.354a1 1 0 1 0 2 0V2.354a1 1 0 0 0-2 0v2zm0 15.292a1 1 0 0 0-2 0v2.001a1 1 0 1 0 2 0v-2.001zM4.354 12a1 1 0 0 0 0 2H2.354a1 1 0 0 0 0-2h2zm15.292 0a1 1 0 1 0 0-2h-2a1 1 0 0 0 0 2h2zM5.636 6.05a1 1 0 0 0-1.415 1.415l1.416 1.414a1 1 0 0 0 1.414-1.415L5.636 6.05zm12.728 0a1 1 0 1 0-1.414 1.415l1.414 1.414a1 1 0 0 0 1.414-1.415l-1.414-1.414zM5.636 17.95a1 1 0 0 0 1.415 1.415l1.414-1.414a1 1 0 0 0-1.415-1.414l-1.414 1.414zm12.728 0a1 1 0 0 0 1.414 1.415l1.414-1.414a1 1 0 0 0-1.415-1.414l-1.413 1.414zM12 6.354a5.646 5.646 0 1 0 0 11.292 5.646 5.646 0 0 0 0-11.292z"
      />
    </svg>
  );
}
