import { NextRequest, NextResponse } from "next/server";

import QuizData from "@/data/tempQuizData.json";
import { decodeQuizStringId } from "@/lib/util/quiz";

// ------------------------------------------------------------------------------------------------

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const jsonId = decodeQuizStringId(id);

	if (!jsonId || jsonId !== QuizData.id) {
		return NextResponse.json({}, { status: 404 });
	}

	return NextResponse.json(QuizData, { status: 200 });
}
