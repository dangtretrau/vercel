var titles = [
  "@",
  "@y",
  "@ya",
  "@yan",
  "@yanj",
  "@yanji",
  "@yanji",
  "@yanj",
  "@yan",
  "@ya",
  "@y",
  "@", 
  "@H",
  "@Ha",
  "@Hai",
  "@Hai D",
  "@Hai Da",
  "@Hai Dan",
  "@Hai Dang",
  "@Hai Dan",
  "@Hai Da",
  "@Hai D",
  "@Hai",
  "@Ha",
  "@H",
  "@",
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 1000);
}

changeTitle();
