import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  createFilterOptions,
  AutocompleteProps as MuiAutoCompleteProps,
  outlinedInputClasses,
  styled,
  TextField,
} from "@mui/material";
import top100Films, { Film } from "../../data/films";
import { useMemo, useState } from "react";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "80%",
  [`${theme.breakpoints.down("md")}`]: {
    width: "100%",
  },
  [`${theme.breakpoints.up("md")}`]: {
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
}));

StyledTextField.defaultProps = { variant: "outlined", color: "info", type: "text" };

type FilmAutoCompleteProps = Omit<
  MuiAutoCompleteProps<Film, false, false, false>,
  "options" | "renderInput"
>;

export default function FilmsAutoComplete(props: FilmAutoCompleteProps) {
  const MIN_CHARS = 2;

  const [film, setFilm] = useState<Film | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const filter = useMemo(() => createFilterOptions<Film>(), []);

  const handleChange = (
    _: React.SyntheticEvent,
    newFilm: Film | null,
    reason: AutocompleteChangeReason
  ) => {
    setFilm(newFilm);
    props.onChange?.(_, newFilm, reason, undefined);
  };

  const handleInputChange = (
    _: React.SyntheticEvent,
    newInput: string,
    reason: AutocompleteInputChangeReason
  ) => {
    setInputValue(newInput);
    props.onInputChange?.(_, newInput, reason);
  };

  return (
    <Autocomplete
      {...props}
      options={top100Films}
      renderInput={(params) => <StyledTextField {...params} label="Movie" />}
      filterOptions={(options, state) =>
        state.inputValue.length < MIN_CHARS ? [] : filter(options, state)
      }
      value={film}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      noOptionsText="No items match your search"
      isOptionEqualToValue={(opt, val) => opt.id === val.id}
      popupIcon={null}
      clearIcon={null}
      clearOnBlur={false}
      openOnFocus
      autoComplete
    />
  );
}
