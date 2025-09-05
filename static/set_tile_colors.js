const flip_delay = 700;
const per_tile_delay = 200;
const tot_flip_delay =  2000;

function setTileColors(colorslist, row){
  const tiles = row.querySelectorAll(".tile");

  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add("flip");

      setTimeout(() => {
        tile.classList.add(colorslist[i]); // apply color
        tile.classList.remove("flip");
      }, flip_delay); // setTimeout Duration of flip
    }, i * per_tile_delay); // setTimeout Staggered delay between tiles
  }); // foreach
} // function