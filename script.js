const API_KEY="9618e623ecee4fa3a3f123a822c7db4a";
const url="https://newsapi.org/v2/everything?q="

// Add these functions at the top of your script.js file

// function toggleDarkMode() {
//     const body = document.body;
//     body.classList.toggle("dark-mode");

//     // Check if dark mode is enabled and update button text accordingly
//     const darkModeEnabled = body.classList.contains("dark-mode");
//     updateDarkModeButtonText(darkModeEnabled);
// }

// function updateDarkModeButtonText(isDarkMode) {
//     const darkModeToggle = document.getElementById("dark-mode-toggle");
//     darkModeToggle.textContent = isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode";
// }

// // Add event listener to the dark mode toggle button
// const darkModeToggle = document.getElementById("dark-mode-toggle");
// darkModeToggle.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
    // Get the current body element
    const body = document.body;
  
    // Toggle the dark-mode class on the body element
    body.classList.toggle("dark-mode");

    // Toggle the background color of the navbar
    const navbar = document.querySelector(".bada");
    navbar.classList.toggle("dark-mode-navbar");

  
    // Get all of the cards in the document
    const cards = document.querySelectorAll(".card");
  
    // Iterate over the cards and toggle the dark-mode class on each card
    for (const card of cards) {
      card.classList.toggle("dark-mode");
    }
  }
  
  function preventDarkModeHover() {
    // Get all of the cards in the document
    const cards = document.querySelectorAll(".card");
  
    // Iterate over the cards and add an event listener to each card
    for (const card of cards) {
      card.addEventListener("mouseover", function() {
        // If the card is in dark mode, prevent the text color from changing
        // if (card.classList.contains("dark-mode")) {
        //   card.style.color = "white";
        // }
      });
    }
  }
  
  window.onload = function() {
    preventDarkModeHover();
  };
  window.onload = function() {
    preventDarkModeHoverTitleDate();
  };

  function preventDarkModeHoverTitleDate() {
    // Get all of the cards in the document
    const cards = document.querySelectorAll(".card");
  
    // Iterate over the cards and add an event listener to each card
    for (const card of cards) {
      card.addEventListener("mouseover", function() {
        // If the card is in dark mode, prevent the title and date color from changing
        if (card.classList.contains("dark-mode")) {
          card.querySelector(".news-title").style.color = "black";
          card.querySelector(".news-source").style.color = "black";
        }
      });
    }
  }


//   function ensureDarkModeHoverTitle() {
//     // Get all of the cards in the document
//     const cards = document.querySelectorAll(".card");
  
//     // Iterate over the cards and add an event listener to each card
//     for (const card of cards) {
//       card.addEventListener("mouseover", function() {
//         // If the card is in dark mode and the title color is not black, make the title color black
//         if (card.classList.contains("dark-mode") && card.querySelector(".news-title").style.color !=="black") {
//           card.querySelector(".news-title").style.color == "black";
//         }
//       });
//     }
//   }
  
//   window.onload = function() {
//     ensureDarkModeHoverTitle();
//   };
  
//   function ensureDarkModeHoverTitle() {
//     // Get all of the cards in the document
//     const cards = document.querySelectorAll(".card");
  
//     // Iterate over the cards and add an event listener to each card
//     for (const card of cards) {
//       card.addEventListener("mouseover", function() {
//         // If the card is in dark mode and the title color is not black, make the title color black
//         if (card.classList.contains("dark-mode") && card.querySelector(".news-title").style.color !== "black") {
//           card.querySelector(".news-title").style.color = "black";
//         }
//       });
//     }
//   }
//   window.onload = function() {
//     ensureDarkModeHoverTitle();
//   };
  
  
//   const darkModeButton = document.querySelector(".dark-mode-button");
// const mainNav = document.querySelector(".main-nav");

// darkModeButton.addEventListener("click", function() {
//   // Toggle the dark mode class on the main-nav element
//   mainNav.classList.toggle("dark-mode");
// });

// const darkModeButton = document.querySelector(".dark-mode-button");

// darkModeButton.addEventListener("click", function() {
//   // Toggle the dark-mode class on the body element
//   document.body.classList.toggle("dark-mode");

//   // Update the text of the dark mode button
//   if (document.body.classList.contains("dark-mode")) {
//     darkModeButton.textContent = "Toggle Dark Mode";
//   } else {
//     darkModeButton.textContent = "Toggle Light Mode";
//   }
// });

const darkModeButton = document.querySelector("#dark-mode-toggle");
const body = document.querySelector("body");

darkModeButton.addEventListener("click", function() {
  // Toggle the dark-mode class on the body element
  body.classList.toggle(".dark-mode");

  // Update the text of the dark mode button
//   darkModeButton.textContent = body.classList.contains("dark-mode") ? "Toggle Light Mode" : "Toggle Dark Mode";
});

// const darkModeButton = document.querySelector(".dark-mode-button");

// darkModeButton.addEventListener("click", function() {
//   this.classList.toggle("dark-mode");
// });




window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    if (newsImg) {
        newsImg.src = article.urlToImage;
    }
    
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
    const body = document.body;
    const darkModeEnabled = body.classList.contains("dark-mode");

    // Add or remove dark-mode class based on the current state
    if (darkModeEnabled) {
        cardClone.querySelector(".card").classList.add("dark-mode");
    } else {
        cardClone.querySelector(".card").classList.remove("dark-mode");
    }
    
}
let curSelected=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelected?.classList.remove('active');
    curSelected=navItem;
    curSelected.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelected?.classList.remove('active');
    curSelected=null;
});
