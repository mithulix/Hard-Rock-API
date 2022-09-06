//with fetch//
// const searchSong = () => {
//     const searchText = document.getElementById("input").value;
//     fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
//     .then(res => res.json())
//     .then(data => displaySong(data.data))
//     .catch(error => displayError("No song found. please, search again properly!"))
//     ;
// }


// get song
const searchSong = async() => {
    const searchText = document.getElementById("input").value;
    const res = await fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
    toggleSpinner()
    try {
        const data =await  res.json()
        displaySong(data.data)
    } catch (error) {
        displayError("No song found. please, search again properly!")
    }
}


const displaySong = songs => {
    const songContainer = document.getElementById("content");
    songContainer.innerHTML = "";
    songs.forEach(song  => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result single_result_show row align-items-center my-3 p-3";
        songDiv.innerHTML = `
                <div class="col-md-9 ">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    <audio controls><source src="${song.preview}"></audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>                
                </div>
                `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    })
}



//search box
document.getElementById("input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {document.getElementById("search-btn").click()}
});



// get lyrics

// with fetch//
// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics));
// }


const getLyric = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
   const res = await fetch(url)
    const data = await res.json()
    displayLyrics(data.lyrics)
}

const displayLyrics = lyrics => {
    const lyricDiv = document.getElementById("song_lyrics");
    lyricDiv.innerText = lyrics;
}


// error handeling
const displayError = error => {
    const errorTag = document.getElementById("error_message");
    errorTag.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById("spinner");
    const songs = document.getElementById("content-area");
    spinner.classList.toggle("d-none");
}