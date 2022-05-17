const input = document.querySelector("#letter")
const button = document.querySelector("button")
const charactersSection = document.querySelector(".characters")
const footer = document.querySelector("footer")




button.addEventListener('click', () => {
    cleanData()
    showData()    
})

function showData(){
    const letter = input.value
    const publicKey = '455be5f711c950be9cf9029c9169f5bf'
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=timestamp&nameStartsWith=${letter}&offset=30&limit=60&apikey=${publicKey}&hash=19f9406dff6a6d45c74d1ffecfcbe3bf`
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
        
        for(let i = 0; i < data.data.results.length; i++) {
            
            if(data.data.results[i].thumbnail.path != "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
                const name = data.data.results[i].name;
                const thumbSrc = data.data.results[i].thumbnail.path + '.' + data.data.results[i].thumbnail.extension
                const card = `
                <div class="card">
                    <div class="img-container">
                        <img src="${thumbSrc}" alt="">
                    </div>
                    <h3>${name}</h3>
                </div>
                `
    
                charactersSection.innerHTML += card
            }

        }
    })
}

function cleanData(){
    let cards = Array.from(document.querySelectorAll(".card"))

    cards.forEach(card => {
        card.remove()
    })
}


