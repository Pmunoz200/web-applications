/* Add the fecth here */
"use strict";

const main = async () => {
  const response = await fetch("http://localhost:3001/api/questions");

  if (response.ok) {
    const data = await response.json();
    document.getElementById("result").innerText = data;
  }
};

main();
