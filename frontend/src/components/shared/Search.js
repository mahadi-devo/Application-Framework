import React, { useContext, useEffect, useState } from 'react';
import SearchBar from 'material-ui-search-bar';

const Search = () => {
  //   const productContext = useContext(ProductContext);

  //   const { filtered, filterProducts, clearFilter } = productContext;

  const [search, setSearch] = useState('');

  //   useEffect(() => {
  //     if (filtered === null) {
  //       setSearch('');
  //     }
  //   }, [filtered]);

  const onChange = (e) => {
    if (e !== '') {
      setSearch(e);
      filterProducts(search);
    } else {
      clearFilter();
    }
  };

  return (
    <div>
      <form action=''>
        <SearchBar
          placeholder='Search products ...'
          type='text'
          value={search}
          autoFocus
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default Search;
