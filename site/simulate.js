const hand_size = 6;
const deck_size = 60;
const prizes = 6;

function get_cards() {
  let cards = new Array();

  let textarea = document.getElementById("decklist");
  
  let lines = textarea.value.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let parts = lines[i].split(" ");
    if (!parts || parts.length === 0 || !parseInt(parts[0])) {
      continue;
    }
    for (let j = 0; j < parseInt(parts[0]); j++) {
      cards.push(parts.slice(1).join(" "));
    }
  }
  return cards;
}

function get_random_card_number() {
  return Math.floor(Math.random() * deck_size);
}

function generate_hand(cards) {
  let numbers = new Array();
  for (let i = 0; i < hand_size + prizes + 1; i++) {
    let number = get_random_card_number();
    while (numbers.includes(number)) {
      number = get_random_card_number();
    }
    numbers.push(number);
  }
  let hand = new Array();
  for (let i = 0; i < hand_size + prizes + 1; i++) {
    hand.push(cards[numbers[i]]);
  }
  return hand;
}

function simulate() {
  let resultdiv = document.getElementById("result");
  let handdiv = document.getElementById("hand");
  let topdeckdiv = document.getElementById("topdeck");
  let prizesdiv = document.getElementById("prizes");
  handdiv.innerHTML = "";
  topdeckdiv.innerHTML = "";
  prizesdiv.innerHTML = "";
  resultdiv.hidden = false;

  let cards = get_cards();
  if (cards.length === deck_size) {
    let hand = generate_hand(cards);

    let list = document.createElement("ol");
    for (let i = 0; i < hand_size; i++) {
      let entry = document.createElement("li");
      entry.innerHTML = hand[i];
      list.appendChild(entry);
    }
    handdiv.appendChild(list);

    topdeckdiv.innerHTML = hand[hand_size + prizes];

    let prizeslist = document.createElement("ol");
    for (let i = hand_size; i < hand_size + prizes; i++) {
      let entry = document.createElement("li");
      entry.innerHTML = hand[i];
      prizeslist.appendChild(entry);
    }
    prizesdiv.appendChild(prizeslist);
  } else {
    handdiv.innerHTML = "<p>Not a " + deck_size +" card deck</p>";
    topdeckdiv.innerHTML = "-";
    prizesdiv.innerHTML = "-";
  }
}
