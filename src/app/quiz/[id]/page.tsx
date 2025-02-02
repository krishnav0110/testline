"use client";
import * as React from "react";

import { QuizStateType } from "@/lib/types";
import { useQuizData } from "@/components/context/QuizContext";

import { InitialState, QuizState, ResultState } from "@/components/quiz";

// ------------------------------------------------------------------------------------------------

export default function Page() {
	const { state } = useQuizData();

	if (state === QuizStateType.QUIZ_STATE) {
		return <QuizState />;
	}

	if (state === QuizStateType.RESULT_STATE) {
		return <ResultState />;
	}

	return <InitialState />;
}
