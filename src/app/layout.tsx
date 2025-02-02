import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { Container, Paper, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "@/lib/theme";
import "./globals.css";

import { UserProvider } from "@/components/context/UserContext";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
	title: "Quiz App",
	description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider options={{ enableCssLayer: true }}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Container
							maxWidth="md"
							disableGutters
							sx={{
								height: "100vh",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<UserProvider>
								<Navbar />
								<Paper variant="outlined" sx={{ p: 2, width: 1, height: 1 }}>
									{children}
								</Paper>
							</UserProvider>
						</Container>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
