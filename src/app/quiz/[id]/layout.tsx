import { QuizProvider } from "@/components/context/QuizContext";

// ------------------------------------------------------------------------------------------------

export default function QuizLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <QuizProvider>{children}</QuizProvider>;
}
