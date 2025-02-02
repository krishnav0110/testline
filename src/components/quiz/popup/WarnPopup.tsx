import { Stack, Typography, Button, IconButton, Slide } from "@mui/material";

import {
	Close as CloseIcon,
	SentimentVeryDissatisfiedTwoTone as SadIcon,
} from "@mui/icons-material";

// ------------------------------------------------------------------------------------------------

export const WarnPopup = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
	return (
		<Slide in={open} direction="up">
			<Stack spacing={2} sx={{ height: 1, justifyContent: "space-between" }}>
				<IconButton sx={{ alignSelf: "start" }} onClick={onClose}>
					<CloseIcon />
				</IconButton>

				<Stack sx={{ alignItems: "center" }}>
					<SadIcon color="primary" sx={{ fontSize: 100 }} />
					<Typography variant="h5">All the progress will be lost</Typography>
					<Typography sx={{ fontWeight: "bold" }}>Are you sure?</Typography>
				</Stack>

				<Stack direction="row" spacing={2}>
					<Button href="/" variant="outlined" fullWidth>
						Back to home
					</Button>
					<Button variant="contained" fullWidth onClick={onClose}>
						Continue
					</Button>
				</Stack>
			</Stack>
		</Slide>
	);
};
