export type OptionType = {
	id: number;
	description: string;
	question_id: number;
	is_correct: boolean;
};

export type ReadingMaterialType = {
	id: number;
	keywords: string;
	content_sections: string[];
	practice_material: {
		content: string[];
		keywords: string[];
	};
};

export type QuestionType = {
	id: number;
	description: string;
	detailed_solution: string;
	options: [OptionType];
	reading_material: ReadingMaterialType;
};

export type QuizType = {
	id: number;
	code: string;
	title: string;
	duration: number;
	correct_answer_marks: string;
	negative_marks: string;
	show_answers: boolean;
	max_mistake_count: number;
};

export type ResultType = {
	correctAnswered: number;
	incorrectAnswered: number;
	totalQuestions: number;
	marks: number;
	totalMarks: number;
	points: number;
};

export enum QuizStateType {
	INITIAL_STATE,
	QUIZ_STATE,
	RESULT_STATE,
}
