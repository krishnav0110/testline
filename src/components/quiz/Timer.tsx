import { Box, Typography, CircularProgress } from "@mui/material";

// ------------------------------------------------------------------------------------------------

export const Timer = ({
	value,
	totalValue,
	size,
	position,
}: {
	value: number;
	totalValue: number;
	size: number;
	position: { top?: number; left?: number; right?: number; bottom?: number };
}) => {
	const minutes = Math.round(value / 60);
	const seconds = value % 60;
	const format = (value: number) => value.toString().padStart(2, "0");

	const digitalTime = `${format(minutes)}:${format(seconds)}`;

	return (
		<Box
			sx={{
				position: "absolute",
				top: position.top,
				right: position.right,
				bottom: position.bottom,
				left: position.left,
				zIndex: 1000,
				borderRadius: size,
				color: "secondary.contrastText",
				bgcolor: "secondary.main",
			}}
		>
			<Box
				sx={{
					position: "relative",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					sx={{
						fontSize: size / 4,
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					{digitalTime}
				</Typography>

				<CircularProgress variant="determinate" value={(value / totalValue) * 100} size={size} />
			</Box>
		</Box>
	);
};
