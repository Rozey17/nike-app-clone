import { View, Text, TextInput } from "react-native";
import React from "react";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setCLicked }) => {
  return (
    <View>
      <TextInput
        placeholder="Search"
        value={searchPhrase}
        onChangeText={setSearchPhrase}
        onFocus={() => {
          setClicked(true);
        }}
      />
    </View>
  );
};

export default SearchBar;
