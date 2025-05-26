"use client";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Menu, MenuItem, Button, Paper } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    fontSize: 14,
  },
});

const BootstrapButton = styled(Button)(() => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 14,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#f9f9f9",
  borderColor: "#f9f9f9",
  color: "black",
  "&:hover": {
    backgroundColor: "#E0E9FB",
    borderColor: "#E0E9FB",
    boxShadow: "none",
    color: "#1B69F9",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#E0E9FB",
    borderColor: "#E0E9FB",
    color: "#1B69F9",
  },
}));

const StyledMenuItem = styled(MenuItem)({
  fontSize: 14,
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(","),
});

interface ActionsButtonProps {
  MenuItemOne?: string;
  MenuItemTwo?: string;
  MenuItemThree?: string;
  MenuItemFour?: string;
  MenuItemFive?: string;
  handleClickMenuItemOne?: () => void;
  handleClickMenuItemTwo?: () => void;
  handleClickMenuItemThree?: () => void;
  handleClickMenuItemFour?: () => void;
  handleClickMenuItemFive?: () => void;
}

const ActionsButton: React.FC<ActionsButtonProps> = ({
  MenuItemOne,
  MenuItemTwo,
  MenuItemThree,
  MenuItemFour,
  MenuItemFive,
  handleClickMenuItemOne,
  handleClickMenuItemTwo,
  handleClickMenuItemThree,
  handleClickMenuItemFour,
  handleClickMenuItemFive,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickWithClose = (callback?: () => void) => {
    return () => {
      if (callback) {
        callback();
      }
      handleClose();
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <BootstrapButton
          variant="contained"
          endIcon={<ExpandMoreIcon />}
          onClick={handleClick}
        >
          Actions
        </BootstrapButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Paper
            sx={{ minWidth: "110px", padding: "2px 0", boxShadow: "none" }}
          >
            {MenuItemOne && handleClickMenuItemOne && (
              <StyledMenuItem
                onClick={handleClickWithClose(handleClickMenuItemOne)}
              >
                {MenuItemOne}
              </StyledMenuItem>
            )}
            {MenuItemTwo && handleClickMenuItemTwo && (
              <StyledMenuItem
                onClick={handleClickWithClose(handleClickMenuItemTwo)}
              >
                {MenuItemTwo}
              </StyledMenuItem>
            )}
            {MenuItemThree && handleClickMenuItemThree && (
              <StyledMenuItem
                onClick={handleClickWithClose(handleClickMenuItemThree)}
              >
                {MenuItemThree}
              </StyledMenuItem>
            )}
            {MenuItemFour && handleClickMenuItemFour && (
              <StyledMenuItem
                onClick={handleClickWithClose(handleClickMenuItemFour)}
              >
                {MenuItemFour}
              </StyledMenuItem>
            )}
            {MenuItemFive && handleClickMenuItemFive && (
              <StyledMenuItem
                onClick={handleClickWithClose(handleClickMenuItemFive)}
              >
                {MenuItemFive}
              </StyledMenuItem>
            )}
          </Paper>
        </Menu>
      </div>
    </ThemeProvider>
  );
};

export default ActionsButton;
