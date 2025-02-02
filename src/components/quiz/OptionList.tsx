import * as React from "react";

import { List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";

import { OptionType } from "@/lib/types";
import { useQuizData } from "../context/QuizContext";

// ------------------------------------------------------------------------------------------------

export const OptionList = ({ options }: { options: OptionType[] }) => {
	const { optionSelected, setOptionSelected, incrementCorrectAnswered } = useQuizData();
	const [selectedOptionId, setSelectedOptionId] = React.useState<number>(-1);

	const handleClick = (id: number) => {
		setSelectedOptionId(id);
		setOptionSelected(true);
		incrementCorrectAnswered(Boolean(options.find(option => option.id === id)?.is_correct));
	};

	return (
		<List sx={{ width: 1 }}>
			{options?.map((opt: OptionType, index) => (
				<ListItem key={index}>
					<Paper
						variant="outlined"
						sx={{
							width: 1,
							color:
								selectedOptionId === opt.id
									? opt.is_correct
										? "success.contrastText"
										: "error.contrastText"
									: "inherit",
							bgcolor:
								selectedOptionId === opt.id
									? opt.is_correct
										? "success.light"
										: "error.light"
									: "inherit",
						}}
					>
						<ListItemButton disabled={optionSelected} onClick={() => handleClick(opt.id)}>
							<ListItemText>{opt.description}</ListItemText>
						</ListItemButton>
					</Paper>
				</ListItem>
			))}
		</List>
	);
};
