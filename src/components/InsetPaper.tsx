import { Paper } from "@mui/material";

import { styled } from "@mui/material/styles";

// ------------------------------------------------------------------------------------------------

export const InsetPaper = styled(Paper)(({ theme, elevation }) => ({
	border: `1px solid ${theme.palette.grey["300"]}`,
	boxShadow: `inset 0px 0px ${elevation}px ${elevation}px rgba(0, 0, 0, 0.12)`,
}));
