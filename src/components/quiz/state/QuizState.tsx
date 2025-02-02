import * as React from "react";

import { Stack, Typography, Button, LinearProgress, IconButton } from "@mui/material";

import { Close as CloseIcon } from "@mui/icons-material";

import { useQuizData } from "@/components/context/QuizContext";

import { OptionList } from "../OptionList";
import { WarnPopup } from "../popup/WarnPopup";
import { Timer } from "../Timer";
import { AnswerPopup } from "../popup/AnswerPopup";

// ------------------------------------------------------------------------------------------------

export const QuizState = () => {
	const {
		questionNo,
		totalQuestions,
		selectCurrentQuestion,
		nextQuestion,
		optionSelected,
		timeRemainingSeconds,
		totalTimeSeconds,
	} = useQuizData();
	const question = selectCurrentQuestion();

	const [showWarning, setShowWarning] = React.useState<boolean>(false);
	const [showAnswer, setShowAnswer] = React.useState<boolean>(false);

	if (showWarning) {
		return <WarnPopup open={showWarning} onClose={() => setShowWarning(false)} />;
	}

	return (
		<Stack spacing={1} sx={{ position: "relative", height: 1 }}>
			<AnswerPopup
				open={showAnswer}
				correctOption={question.options.find(option => option.is_correct)!}
				answer={question.reading_material}
				onClose={() => setShowAnswer(false)}
			/>

			<IconButton sx={{ alignSelf: "start", my: 0 }} onClick={() => setShowWarning(true)}>
				<CloseIcon />
			</IconButton>

			<LinearProgress
				variant="determinate"
				value={(questionNo / totalQuestions) * 100}
				sx={{ width: 1 }}
			/>

			<Typography variant="h5" sx={{ pt: 1 }}>
				Question {questionNo}
			</Typography>
			<Typography>{question?.description}</Typography>

			<OptionList options={question?.options} />

			<Stack direction="row" spacing={2} sx={{ width: 1, position: "absolute", bottom: 0 }}>
				<Button
					variant="outlined"
					fullWidth
					disabled={!optionSelected}
					onClick={() => setShowAnswer(true)}
				>
					Show answer
				</Button>
				<Button
					variant="contained"
					fullWidth
					disabled={!optionSelected}
					onClick={() => nextQuestion()}
				>
					Continue
				</Button>
			</Stack>

			<Timer
				value={timeRemainingSeconds}
				totalValue={totalTimeSeconds}
				size={60}
				position={{ right: 0, bottom: 50 }}
			/>
		</Stack>
	);
};
