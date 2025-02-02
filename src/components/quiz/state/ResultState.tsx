import * as React from "react";

import { Stack, Paper, Typography, Button, Fade, Zoom } from "@mui/material";
import { LocalFireDepartment as StreakIcon } from "@mui/icons-material";

import { useUserData } from "@/components/context/UserContext";
import { useQuizData } from "@/components/context/QuizContext";

// ------------------------------------------------------------------------------------------------

const timeout = 1000;
const scoresDelay = 1000;
const buttonDelay = 5000;

// ------------------------------------------------------------------------------------------------

export const ResultState = () => {
	const { user, addPoints } = useUserData();
	const { result } = useQuizData();

	const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);

	const results = [
		{
			color: "success",
			label: "Correct",
			value: `${result.correctAnswered}/${result.totalQuestions}`,
		},
		{
			color: "error",
			label: "Incorrect",
			value: `${result.incorrectAnswered}/${result.totalQuestions}`,
		},
		{ color: "info", label: "Points", value: result.points },
	];

	return (
		<Stack spacing={2} sx={{ height: 1, alignItems: "center", justifyContent: "space-between" }}>
			<Zoom in={true} timeout={timeout}>
				<Stack sx={{ alignItems: "center", pt: 7 }}>
					<StreakIcon sx={{ fontSize: 150, color: "orange" }} />
					<Typography variant="h4" sx={{ color: "orange" }}>
						{user?.streak}
					</Typography>
					<Typography>Days Strong</Typography>
				</Stack>
			</Zoom>

			<Stack spacing={1}>
				<Typography textAlign="center" sx={{ fontWeight: "bold" }}>
					Marks: {result.marks}/{result.totalMarks}
				</Typography>
				<Stack direction="row" spacing={2}>
					{results.map((result, index) => (
						<Zoom
							key={index}
							in={true}
							timeout={timeout}
							style={{ transitionDelay: `${scoresDelay + index * timeout}ms` }}
						>
							<Paper
								variant="outlined"
								sx={{ width: 80, pb: 1, textAlign: "center", borderColor: `${result.color}.main` }}
							>
								<Typography
									variant="body2"
									sx={{
										width: 1,
										p: 0.5,
										mb: 1,
										color: `${result.color}.contrastText`,
										bgcolor: `${result.color}.main`,
									}}
								>
									{result.label}
								</Typography>
								<Typography color={result.color} sx={{ fontWeight: "bold" }}>
									{result.value}
								</Typography>
							</Paper>
						</Zoom>
					))}
				</Stack>
			</Stack>

			<Fade
				in={true}
				style={{ transitionDelay: `${buttonDelay}ms` }}
				timeout={timeout}
				onTransitionStart={() => setButtonDisabled(false)}
			>
				<Button
					href="/"
					variant="contained"
					disabled={buttonDisabled}
					fullWidth
					onClick={() => addPoints(result.points)}
				>
					Back to home
				</Button>
			</Fade>
		</Stack>
	);
};
