"use client";
import * as React from "react";
import { usePathname } from "next/navigation";

import { QuestionType, QuizStateType, QuizType, ResultType } from "@/lib/types";

// ------------------------------------------------------------------------------------------------

type QuizContextType = {
	state: QuizStateType;
	isLoading: boolean;
	error: string;
	questionNo: number;
	totalQuestions: number;
	optionSelected: boolean;
	timeRemainingSeconds: number;
	totalTimeSeconds: number;
	result: ResultType;
	incrementCorrectAnswered: (result: boolean) => void;
	setOptionSelected: React.Dispatch<React.SetStateAction<boolean>>;
	selectCurrentQuestion: () => QuestionType;
	nextQuestion: () => void;
};

const QuizContext = React.createContext<QuizContextType | null>(null);

// ------------------------------------------------------------------------------------------------

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const pathname = usePathname();
	const quizId = pathname.split("/").at(-1);

	const [timeRemainingSeconds, setTimeRemainingSeconds] = React.useState<number>(0);
	const [totalTimeSeconds, setTotalTimeSeconds] = React.useState<number>(0);

	const [state, setQuizState] = React.useState<QuizStateType>(QuizStateType.INITIAL_STATE);

	const [questionIndex, setQuestionIndex] = React.useState<number>(0);
	const [optionSelected, setOptionSelected] = React.useState<boolean>(false);
	const [correctAnswered, setCorrectAnswered] = React.useState<number>(0);
	const [incorrectAnswered, setIncorrectAnswered] = React.useState<number>(0);

	const [quiz, setQuiz] = React.useState<QuizType | null>(null);
	const [questions, setQuestions] = React.useState<QuestionType[]>([]);
	const [isLoading, setLoading] = React.useState<boolean>(true);
	const [error, setError] = React.useState<string>("");

	React.useEffect(() => {
		if (!quiz) {
			return;
		}
		const timer = setInterval(() => {
			if (timeRemainingSeconds <= 0) {
				setQuizState(QuizStateType.RESULT_STATE);
				clearInterval(timer);
			}
			setTimeRemainingSeconds(prev => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [timeRemainingSeconds, quiz]);

	/**
	 *
	 */
	const fetchQuiz = React.useCallback(async () => {
		if (!quizId) {
			return;
		}
		setQuizState(QuizStateType.INITIAL_STATE);
		setLoading(true);
		setError("");

		try {
			console.log(`/api/quiz/${quizId}`);
			const res = await fetch(`/api/quiz/${quizId}`);

			if (!res.ok) {
				setError("Error fetching quiz");
				return;
			}

			const data = await res.json();
			const time = (data.duration - 1) * 60;

			setQuiz(data);
			setTotalTimeSeconds(time);
			setTimeRemainingSeconds(time);
			setQuestions(data.questions);
			setQuizState(QuizStateType.QUIZ_STATE);
		} catch {
			setError("Error fetching quiz");
		} finally {
			setLoading(false);
		}
	}, [quizId]);

	React.useEffect(() => {
		fetchQuiz();
	}, [fetchQuiz]);

	/**
	 *
	 */
	const selectCurrentQuestion = React.useCallback(() => {
		return questions[questionIndex];
	}, [questions, questionIndex]);

	const incrementCorrectAnswered = (result: boolean) => {
		if (result) {
			setCorrectAnswered(prev => prev + 1);
		} else {
			setIncorrectAnswered(prev => prev + 1);
		}
	};

	/**
	 *
	 */
	const nextQuestion = () => {
		if (questionIndex >= questions.length - 1) {
			setQuizState(QuizStateType.RESULT_STATE);
		}
		setQuestionIndex(prev => prev + 1);
		setOptionSelected(false);
	};

	/**
	 *
	 *
	 *
	 */
	return (
		<QuizContext.Provider
			value={{
				state,
				isLoading,
				error,
				questionNo: questionIndex + 1,
				totalQuestions: questions.length,
				optionSelected,
				timeRemainingSeconds,
				totalTimeSeconds,
				result: {
					correctAnswered: correctAnswered,
					incorrectAnswered: incorrectAnswered,
					totalQuestions: questions.length,
					marks:
						correctAnswered * Number(quiz?.correct_answer_marks) -
						incorrectAnswered * Number(quiz?.negative_marks),
					totalMarks: questions.length * Number(quiz?.correct_answer_marks),
					points: correctAnswered * 5,
				},
				incrementCorrectAnswered,
				setOptionSelected,
				selectCurrentQuestion,
				nextQuestion,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

// ------------------------------------------------------------------------------------------------

export const useQuizData = (): QuizContextType => {
	const context = React.useContext(QuizContext);
	if (!context) {
		throw new Error("useQuizData must be used within an QuizProvider");
	}
	return context;
};
