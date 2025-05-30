import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  Highlight,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  StrikethroughS,
  FormatSize,
} from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup, Menu, MenuItem } from "@mui/material";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!editor) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fontSizes = [
    "12px",
    "13px",
    "14px",
    "15px",
    "16px",
    "17px",
    "18px",
    "19px",
    "20px",
    "21px",
    "22px",
    "23px",
    "24px",
    "25px",
    "26px",
    "27px",
    "28px",
    "29px",
    "30px",
    "31px",
    "32px",
  ];


  const Options = [
    {
      icon: <FormatSize className="size-4 text-black dark:text-white" />,
      onClick: handleClick,
      selected: fontSizes.some((size) =>
        editor.isActive("textStyle", { fontSize: size }),
      ),
    },
    {
      icon: <FormatBold className="size-4 text-black dark:text-white" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      selected: editor.isActive("bold"),
    },
    {
      icon: <FormatItalic className="size-4 text-black dark:text-white" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      selected: editor.isActive("italic"),
    },
    {
      icon: <StrikethroughS className="size-4 text-black dark:text-white" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      selected: editor.isActive("strike"),
    },
    {
      icon: <FormatAlignLeft className="size-4 text-black dark:text-white" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      selected: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <FormatAlignCenter className="size-4 text-black dark:text-white" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      selected: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <FormatAlignRight className="size-4 text-black dark:text-white" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      selected: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: (
        <FormatListBulleted className="size-4 text-black dark:text-white" />
      ),
      onClick: () => {
        editor.chain().focus().toggleBulletList().run();
        return false;
      },
      selected: editor.isActive("bulletList"),
    },
    {
      icon: (
        <FormatListNumbered className="size-4 text-black dark:text-white" />
      ),
      onClick: () => {
        editor.chain().focus().toggleOrderedList().run();
        return false;
      },
      selected: editor.isActive("orderedList"),
    },
    {
      icon: <Highlight className="size-4 text-black dark:text-white" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      selected: editor.isActive("highlight"),
    },
  ];

  return (
    <div className="z-50 mb-1 rounded-md border border-gray-300 bg-transparent p-1 dark:border-gray-700 dark:bg-gray-900">
      <ToggleButtonGroup size="small" color="primary">
        {Options.map((option, index) => (
          <ToggleButton
            key={index}
            selected={option.selected}
            onChange={option.onClick}
            value={index}
          >
            {option.icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {fontSizes.map((size) => (
          <MenuItem
            key={size}
            onClick={() => {
              editor.chain().focus().setFontSize(size).run();
              handleClose();
            }}
            selected={editor.isActive("textStyle", { fontSize: size })}
            style={{ fontSize: size }}
          >
            {size}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
