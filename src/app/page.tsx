import { QuizCard } from "@/components/home";
import { QuizType } from "@/lib/types";
import { Stack } from "@mui/material";

// ------------------------------------------------------------------------------------------------

export default async function Page() {
	const res = await fetch("http://localhost:3000/api/quiz");
	const quizzes: QuizType[] = await res.json();

	return (
		<Stack sx={{ height: 1 }}>
			{quizzes.map((quiz, index) => (
				<QuizCard key={index} quiz={quiz} />
			))}
		</Stack>
	);
}
