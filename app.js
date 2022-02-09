const form = document.getElementById('form');
const search = document.getElementById('search');
const output = document.getElementById('output');

const apiURL = "https://api.lyrics.ovh";

//adding event listener
form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue = search.value.trim();

    //checking if search value is not empty
    if (!searchValue) {
        alert("There is nothing to search");
    } else {
        searchSong(searchValue);
    }
});

//search song
async function searchSong(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}/`);
    const data = await searchResult.json();

    showData(data);
}

//Updating DOM
function showData(data) {
    output.innerHTML = `
    <ul class="song-list">
      ${data.data.map(song => `<li>
                                <div>
                                    <strong>
                                    ${song.artist.name}
                                    </strong> - ${song.title}
                                </div>
                                <span data-artist="${song.artist.name}" data-songtitle="${song.title}">
                                    get lyrics
                                </span>
                             </li>    
                   `).join('')
        }   
    </ul>
    `
}

//event listener in get lyrics button
output.addEventListener('click', e => {
    const clickedElement = e.target;

    //checking if clicked element is button or not
    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
})


//get lyrics
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    
    output.innerHTML =` <h2 class="output-name"><strong>
                              ${artist}
                            </strong> - ${songTitle}
                        </h2>
                        <p class="lyrics"> ${lyrics} </p>
                      ` 
}


//scroll to output
const searchBtn = document.getElementById("search-btn");

function scrollIntoView(output) {
    output.scrollIntoView();
}