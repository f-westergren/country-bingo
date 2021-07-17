let WORDS = [
  "Beer",
  "Whiskey",
  "Jack and coke",
  "Dirt road",
  "Country road",
  "Jack",
  "Cornfield",
  "Truckbed",
  "Honky tonk",
  "Small town",
  "Pickup",
  "Beach",
  "Guitar",
  "Love",
  "Faith",
  "Church",
  "Jesus",
  "Sunday",
  "Lord",
  "Friday",
  "Football",
  "Dixie cup",
  "Bud light",
  "Freedom",
  "Fourth of July",
  "Highway",
  "Tequila",
  "Shot",
  "Dad",
  "Skirt",
  "Jeans",
  "Boots",
  "Hat",
  "Nashville",
  "Kentucky",
  "Tennessee",
  "Alabama",
  "Texas",
  "Barbecue",
  "Margarita",
  "Saturday",
  "Dress",
  "Country",
  "Fireflies",
  "Lake",
  "Porch",
  "Barn",
  "Horse",
  "Cowboy",
  "Car",
  "Red light",
  "Blue skies",
  "Sunshine",
  "USA",
  "America",
  "Six pack",
  "Homegrown",
  "Moonshine",
  "Drinking",
  "Baby",
  "Pray",
  "Father",
  "Southern",
  "Drawl",
  "Hometown",
  "Bible",
  "Amen",
  "Summer",
  "Drive",
  "Bar",
  "Barstool",
];

const SIZE = 5;
const board = [];

const card = document.querySelector(".card");

let fullCard = false;

const makeBoard = () => {
  for (let i = 0; i < SIZE; i++) {
    board.push(Array.from({ length: SIZE }));
  }
};

const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

WORDS = shuffleArray(WORDS);

const markWord = (y, x) => {
  board[y][x] = 1;
};

const unMarkWord = (y, x) => {
  board[y][x] = undefined;
};

const handleClick = (evt) => {
  evt.target.classList.toggle("selected");
  let coordinates = evt.target.id.split("-");
  let y = coordinates[0];
  let x = coordinates[1];

  if (!board[y][x]) board[y][x] = 1;
  else board[y][x] = undefined;
  if (checkForWin()) card.removeEventListener("click", handleClick);
};

const makeHTMLBoard = () => {
  card.addEventListener("click", handleClick);
  let i = 0;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let div = document.createElement("div");
      div.classList.add("word");
      div.id = `${y}-${x}`;
      card.append(div);
      div.innerText = `${WORDS[i]}`;
      //   div.addEventListener("click", handleClick);
      i++;
    }
  }
};

const checkHorizontalBingo = () => {
  for (let row of board) {
    if (row.every((cell) => cell === 1)) return true;
  }
  return false;
};

const checkVerticalBingo = () => {
  for (let cell in board) {
    let win = true;
    for (let column in board) {
      if (board[column][cell] !== 1) win = false;
    }
    if (win) return true;
  }
  return false;
};

const checkForWin = () => {
  if (checkHorizontalBingo() || (checkVerticalBingo() && !fullCard)) {
    setTimeout(() => alert("BINGO!"), 500);
    return true;
  }
  return false;
};

makeBoard();
makeHTMLBoard();
