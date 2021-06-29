import React, { useContext, useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar";
import ConferenceContext from "../../context/conference/conference-context";

const Search = () => {
  const conferenceContext = useContext(ConferenceContext);

  const { filtered, filterConferences, clearFilter } = conferenceContext;

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (filtered === null) {
      setSearch("");
    }
  }, [filtered]);

  const onChange = (e) => {
    if (e !== "") {
      setSearch(e);
      filterConferences(search);
    } else {
      clearFilter();
    }
  };

  return (
    <div>
      <form action="">
        <SearchBar
          placeholder="Search products ..."
          type="text"
          value={search}
          autoFocus
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default Search;
