// DEFINE THE  URL FOR DICTIONARY API
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// GET REFERENCES RO THE HTML ELEMENTS we'll NEED
const input = document.getElementById('input');
const btnSearch = document.getElementById('btn-search');
const result = document.getElementById('under-box');
const sound = document.getElementById('sound');
// DEFINE THE SEARCH FUNCTION 
function search() {
  
    let word = input.value;

    // Fetch the data from the dictionary API
    fetch(`${url}${word}`)
        .then((response) => {
           
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json();
        })
        .then((data) => {
            // IF DATA  HAS THE EXPECTED STRUCTURE
            if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
              
                console.log(data);
                //UPDATE THE RESULTS WITH THE DATA
                result.innerHTML = 
                `<div class="result">
                    <h3>${word}</h3>
                    <button id = 'speaker' >
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ' example not found in dictionary'}
                </p>`;

            // DEFINE  THE AUDIO URL
      let audioUrl = data[0].phonetics[0].audio || data[0].phonetics[1].audio;

        // SET THE AUDIO SOURCE
        sound.setAttribute('src', audioUrl);

    
   setTimeout(function() {

      let playBtn = document.getElementById('speaker')
      function playSound(){
      sound.play()
    }

playBtn.addEventListener('click', playSound )

},0)

            } else {
                // IF THE DATA NOT HAVE THE EXPECTED STRUCTURE, ALERT/LOG AN ERROR

                console.error(object);('Unexpected API response', data)
            }
        })
        .catch((error) => {
            // IF THERE WAS  AN ERROR WITH THE FETCH OPERATION, ALERT/LOG IT
            
            console.error('There has been a problem with your fetch operation:', error);
            result.innerHTML = '<h3> word not found</h3>';
            
        });
    }

btnSearch.addEventListener('click', search);

