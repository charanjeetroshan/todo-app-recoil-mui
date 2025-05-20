import { formControlClasses, Stack } from "@mui/material";
import AutoComplete from "../components/ui/AutoComplete";
import SearchButton from "../components/ui/SearchButton";
import { useAutoCompleteStyles } from "../hooks/useAutoCompleteStyles";

export default function Test() {
  const { containerRef, autoCompleteSx, autoCompleteModifiers } = useAutoCompleteStyles();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      height={57}
      ref={containerRef}
      width="fit-content"
      marginInline="auto">
      <AutoComplete
        sx={{ width: 400, [`.${formControlClasses.root}`]: { width: "100%" } }}
        componentsProps={{
          popper: { sx: autoCompleteSx, modifiers: autoCompleteModifiers },
        }}
      />
      <SearchButton />
    </Stack>
  );
}
