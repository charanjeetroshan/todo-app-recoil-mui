import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function SearchButton() {
  return (
    <Button
      type="submit"
      variant="contained"
      color="info"
      startIcon={<Search />}
      sx={(theme) => ({
        padding: "1rem",
        height: "100%",
        [`${theme.breakpoints.up("md")}`]: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
      })}
    />
  );
}
