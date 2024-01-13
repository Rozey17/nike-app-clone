import {
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React from "react";

interface props {
  value: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const SearchInput = ({ value, onChange }: props) => {
  return (
    <TextInput
      value={value}
      onChange={onChange}
      clearTextOnFocus={true}
      placeholder="Rechercher un produit"
      className="flex-1 px-3 py-2 m-5 rounded-md text-[16px]"
      style={{ fontFamily: "HelveticaMedium" }}
    />
  );
};

export default SearchInput;
