import "./style.css";
import axios from "axios";
import "./style.css";

const form = document.querySelector("#searchForm");
const div2 = document.querySelector("#div2");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const config = { params: { apikey: "46e03e67", s: searchTerm } };
  const res = await axios.get(`https://www.omdbapi.com`, config);
   div2.innerHTML = "";

  if (res.data.Search) {
    searchMovie(res.data.Search);
    console.log(res.data.Search)
  } else {
    div2.innerHTML = "<p class='text-white'>No movies found.</p>";
  }
  form.elements.query.value = "";
});

const searchMovie = async (movies) => {
  for (let movie of movies) {
    if (movie.Poster !== "N/A") {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-xl shadow-md p-3 flex flex-col justify-between items-center w-full h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl";

      const img = document.createElement("img");
      img.src = movie.Poster;
      img.className = "w-full `aspect-2/3` object-cover rounded-md";

      img.onerror = function() {
        // Swaps to a placeholder image if the OMDB link is dead
        this.src = "https://placehold.co/400x600/1e293b/white?text=No+Poster+Found";
      };
      const title=document.createElement('b')

      title.innerText=movie.Title
      title.className=" text-black text-xs text-center mt-auto pt-3"

      card.append(img);
      card.appendChild(title)
      div2.append(card);
    }
  }
};
