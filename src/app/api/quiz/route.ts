import { NextResponse } from "next/server";

import { QuizType } from "@/lib/types";
import { encodeQuizId } from "@/lib/util/quiz";

import QuizData from "@/data/tempQuizData.json";

// ------------------------------------------------------------------------------------------------

export async function GET() {
	const jsonQuizData = QuizData;
	const encodedQuizCode = encodeQuizId(jsonQuizData.id);

	if (encodedQuizCode) {
		const quizData: QuizType = { ...QuizData, code: encodedQuizCode };
		return NextResponse.json([quizData], { status: 200 });
	}
	return NextResponse.json({}, { status: 500 });
}
