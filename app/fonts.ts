import { Instrument_Serif, Montserrat } from "next/font/google";
import localFont from "next/font/local";

export const montserrat = Montserrat({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ms",
});

export const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/PPNeueMontreal-Book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMontreal-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/PPNeueMontreal-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMontreal-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
