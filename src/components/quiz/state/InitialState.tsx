import { Stack, CircularProgress, Typography, Button } from "@mui/material";

import { useQuizData } from "@/components/context/QuizContext";

// ------------------------------------------------------------------------------------------------

export const InitialState = () => {
	const { isLoading, error } = useQuizData();

	return (
		<Stack spacing={2} sx={{ height: 1, alignItems: "center", justifyContent: "center" }}>
			{isLoading && <CircularProgress size={60} />}

			{error && <Typography color="error">{error}</Typography>}
			{error && (
				<Button variant="contained" href="/" fullWidth sx={{ justifySelf: "end" }}>
					Back to Home
				</Button>
			)}
		</Stack>
	);
};
