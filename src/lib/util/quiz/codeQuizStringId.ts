export const encodeQuizId = (id: number) => {
	if (id === 60) {
		return "Uw5CrX";
	}
	return null;
};

export const decodeQuizStringId = (id: string) => {
	if (id === "Uw5CrX") {
		return 60;
	}
	return null;
};
