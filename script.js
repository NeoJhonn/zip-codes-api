const selectField = document.getElementById("country_field")
selectField.addEventListener("change", () => {
    
    getCountryInformation()
})

function getCountryInformation() {
    const url = `https://restcountries.com/v3.1/name/${selectField.value}?fullText=true`

    fetch(url)//promisse
        .then((resultRequest) => {
            return resultRequest.json()

        })
        .catch(erro => {
            alert("Falha na conexão com a API!")
          })
        .then((jsonRequest) => {
            
            document.getElementById("name").innerHTML = ("Name: "+jsonRequest[0].name.official)
            document.getElementById("capital").innerHTML = ("Capital: "+jsonRequest[0].capital)
            document.getElementById("continente").innerHTML = ("Continent: "+jsonRequest[0].continents)

            //percorre o json(que é um array), até encontrar o íncide da moeda
            for (key in jsonRequest[0].currencies) {
                indiceMoeda = key
            }
            document.getElementById("moeda").innerHTML = ("Currency: "+jsonRequest[0].currencies[indiceMoeda].name)

            //percorre o json(que é um array), até encontrar o íncide da língua
             for (key in jsonRequest[0].languages) {
                indiceIdioma = key
            }
            document.getElementById("idioma").innerHTML = ("Language: "+jsonRequest[0].languages[indiceIdioma])

            //imagem
            document.getElementById("imagem").src = jsonRequest[0].flags.png

             //Iframe google
             loadFrame(selectField.value)

        })
        .catch(erro => {
            alert("Não foi possível encontra todas as informações!")
          })
}

function loadFrame(country) {
    let iframe = document.getElementById("info")
    //document.getElementById("info").setAttribute("style", "display: block")
    //const url = `https://www.google.com/search?q=${country}&tbm=isch`
    //const url = `https://flagsapi.com/${country}/shiny/64.png`
    //const url = `http://www.geognos.com/api/en/countries/flag/${country}.png`
    const url = `https://www.pexels.com/search/${country}/`

    iframe.src = url
}



    


