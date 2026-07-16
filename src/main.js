import "./style.css";
import axios from "axios";

const form = document.querySelector("#searchForm");
const movieContainer = document.querySelector("#movieContainer");
const input=document.querySelector('input')

input.addEventListener("focus", () => {
  input.select()
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const config = { params: { apikey: "46e03e67", s: searchTerm } };

   movieContainer.innerHTML = "";        //clear screen first 

  try{
    const res = await axios.get(`https://www.omdbapi.com`, config);

    if (res.data.Search) {
    searchMovie(res.data.Search);
    console.log(res.data.Search)
  } else {
    movieContainer.innerHTML = "<p class='text-white'>No movies found.</p>";
  }

  }catch(e){
    movieContainer.innerHTML="<p class='text-white text-2xl'>Something went wrong. Please try again later.</p>"
    console.log("API error",e)
  }  
   

  // form.elements.query.value = "";
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
      movieContainer.append(card);
    }
  }
};
