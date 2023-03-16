const inputEl = document.getElementById('input')
const infoTextEl = document.getElementById('info-text')
const meaningContainerEl = document.getElementById('meaning-container')
const titleEl = document.getElementById('title')
const meaningEl = document.getElementById('meaning')
const exampleEl = document.getElementById('example')
const audioEl = document.getElementById('audio')

async function fetchAPI(word) {

    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching the meaning of "${word}"`;

        console.log(word);
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((res) => res.json());

        if (result.title) {
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = "N/A";
            exampleEl.innerText = "N/A";
            audioEl.style.display = "none";
        } else {
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            audioEl.style.display = "inline-flex"
            titleEl.innerText = result[0].word;


            let arr = result[0].meanings[0].definitions;
            console.log(arr);
            let map1 = arr.map(
                (e) => {
                    return (e.definition);
                }
            )
            console.log(map1);





            meaningEl.innerText = map1[0];
            exampleEl.innerText = result[0].meanings[0].definitions[0].example;
            audioEl.src = result[0].phonetics[0].audio;
        }



    } catch (error) {
        console.log(error);
        infoTextEl.innerText = `an error occurred. Please try again later.`;
    }



}

inputEl.addEventListener("keyup", (e) => {
    // console.log(e.target.value);
    if (e.target.value && e.key === 'Enter') {
        fetchAPI(e.target.value)
    }
})