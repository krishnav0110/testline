import { Stack, Drawer, Chip, Typography, Button, Paper } from "@mui/material";

import { KeyboardArrowDown as DownIcon } from "@mui/icons-material";

import { InsetPaper } from "@/components";

import { OptionType, ReadingMaterialType } from "@/lib/types";

// ------------------------------------------------------------------------------------------------

export const AnswerPopup = ({
	open,
	onClose,
	answer,
	correctOption,
}: {
	open: boolean;
	onClose: () => void;
	answer: ReadingMaterialType;
	correctOption: OptionType;
}) => {
	return (
		<Drawer open={open} anchor="bottom" onClose={onClose}>
			<Button variant="contained" onClick={onClose} sx={{ borderRadius: 0 }}>
				<DownIcon />
			</Button>

			<Stack sx={{ height: "70vh", p: 2, overflowY: "scroll" }}>
				<Stack spacing={4}>
					{[
						{ label: "Correct Option", value: correctOption.description },
						{ label: "Reading Material", html: answer.content_sections.join("") },
						{ label: "Practice Material", html: answer.practice_material.content.join("") },
					].map((item, index) => (
						<Stack key={index}>
							<Typography variant="h6">{item.label}:</Typography>
							{item.value && (
								<Paper variant="outlined" sx={{ p: 2 }}>
									{item.value}
								</Paper>
							)}

							{item.html && (
								<InsetPaper elevation={5} sx={{ mx: 2, p: 2, maxHeight: 250, overflowY: "scroll" }}>
									<div dangerouslySetInnerHTML={{ __html: item.html }} />
								</InsetPaper>
							)}
						</Stack>
					))}

					<Stack>
						<Typography variant="h6">Keywords:</Typography>
						<Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
							{(JSON.parse(answer.keywords) as Array<string>).map((item, index) => (
								<Chip key={index} label={item} color="secondary" />
							))}
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Drawer>
	);
};
