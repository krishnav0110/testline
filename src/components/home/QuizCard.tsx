import { QuizType } from "@/lib/types";
import { Card, CardContent, CardActionArea, Typography, Stack } from "@mui/material";

import { ArrowCircleRight as ArrowRightIcon } from "@mui/icons-material";

// ------------------------------------------------------------------------------------------------

export const QuizCard = ({ quiz }: { quiz: QuizType }) => {
	return (
		<Card
			elevation={3}
			sx={{
				color: "secondary.contrastText",
				bgcolor: "secondary.main",
			}}
		>
			<CardActionArea href={`/quiz/${quiz?.code}`}>
				<CardContent>
					<Stack
						direction="row"
						spacing={2}
						sx={{ alignItems: "center", justifyContent: "space-between" }}
					>
						<Stack>
							<Typography variant="h6">{quiz?.title}</Typography>
							<Typography variant="caption">Code: {quiz?.code}</Typography>
							<Typography variant="body2" sx={{ mt: 2 }}>
								Time: {quiz?.duration}min
							</Typography>
						</Stack>
						<ArrowRightIcon fontSize="large" />
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
