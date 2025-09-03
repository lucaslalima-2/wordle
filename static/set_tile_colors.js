function setTileColors(colorslist, row){
  const tiles = row.querySelectorAll(".tile");
  for (let i=0; i<colorslist.length; i++){
    tiles[i].classList.add(colorslist[i]);
  } // for
} // function