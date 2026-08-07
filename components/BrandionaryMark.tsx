type BrandionaryMarkProps = {
  className?: string;
};

/** Rounded hexagon mark with stylized “b” cutout */
export default function BrandionaryMark({ className }: BrandionaryMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M31.21 4.96 L68.44 4.96 L74.47 7.09 L79.43 11.7 L97.87 43.97 L98.94 51.06 L96.81 57.8 L78.72 88.65 L75.89 91.49 L71.99 93.62 L66.67 94.68 L32.98 94.68 L28.72 93.97 L25.53 92.55 L23.4 91.13 L19.86 86.88 L2.13 56.38 L0.71 51.77 L0.71 47.52 L3.19 41.13 L21.63 9.93 L25.89 6.74 L30.85 5.32 Z M76.24 26.6 L73.05 26.6 L69.5 29.43 L59.22 47.87 L59.22 52.13 L59.93 54.26 L70.92 73.76 L73.4 76.24 L76.24 75.53 L77.3 74.11 L86.17 58.51 L88.3 52.48 L88.3 47.52 L87.23 43.62 L85.11 40.78 L82.62 39.36 L80.85 39.36 L80.5 31.91 L79.43 29.08 L76.6 26.6 Z"
      />
    </svg>
  );
}
