import React from "react";

const SearchBar = ({placeHolder,UpdateSearchWord}) => {

  return (
  <div className="search">
    <div className="searchInput">
      <input type="text" id="textBox" placeholder={placeHolder} onChange={()=>{
        const word = document.getElementById('textBox').value ?document.getElementById('textBox').value:""
        UpdateSearchWord(word)
      }
      }/>
      <div className="searchIcon"></div>
    </div>
  </div>);
};

export default SearchBar;

