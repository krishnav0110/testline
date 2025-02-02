"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

declare module "@mui/material/styles" {
	interface Palette {
		fire: string;
		freezeIce: string;
	}
	interface PaletteOptions {
		fire: string;
		freezeIce: string;
	}
}

export const theme = createTheme({
	cssVariables: true,
	palette: {
		primary: {
			main: "#367AFF",
			contrastText: "#fafaff",
		},
		fire: "#ffa500",
		freezeIce: "#20a2e9",
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
});
