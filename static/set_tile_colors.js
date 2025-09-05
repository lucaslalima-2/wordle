function setTileColors(colorslist, row){
  const tiles = row.querySelectorAll(".tile");

  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add("flip");

      setTimeout(() => {
        tile.classList.add(colorslist[i]); // apply color
        tile.classList.remove("flip");
      }, 700); // setTimeout Duration of flip
    }, i * 200); // setTimeout Staggered delay between tiles
  }); // foreach
} // function