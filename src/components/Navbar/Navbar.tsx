"use client";
import { AppBar, Toolbar, Stack, Typography, Tooltip } from "@mui/material";

import {
	LocalFireDepartment as StreakIcon,
	Cookie as CookieIcon,
	AcUnit as FreezeIcon,
} from "@mui/icons-material";

import { useUserData } from "@/components/context/UserContext";
import { maxStreakFreeze } from "@/lib/types";

// ------------------------------------------------------------------------------------------------

export const Navbar = () => {
	const { user } = useUserData();

	return (
		<AppBar position="sticky" color="transparent" elevation={0}>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				{[
					{ title: "Streak", icon: <StreakIcon />, color: "fire", value: user?.streak },
					{
						title: "Streak Freeze",
						icon: <FreezeIcon />,
						color: "freezeIce",
						value: `${user?.streakFreeze ?? 0}/${maxStreakFreeze}`,
					},
					{ title: "Coins", icon: <CookieIcon />, color: "primary.main", value: user?.points },
				].map((item, index) => (
					<Tooltip key={index} title={item.title}>
						<Stack direction="row" spacing={1} sx={{ color: item.color }}>
							{item.icon}
							<Typography sx={{ fontWeight: "bold" }}>{item.value}</Typography>
						</Stack>
					</Tooltip>
				))}
			</Toolbar>
		</AppBar>
	);
};
