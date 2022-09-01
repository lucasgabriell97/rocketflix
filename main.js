const $btnFind = document.querySelector('#btn-find')
const $content = document.querySelector('#content')

$btnFind.addEventListener('click', getMovieInfo)

function getMovieInfo(e) {
    e.preventDefault()

    let randomNumber = Math.floor(30000* Math.random() + 1) // Gerar números aleatórios de 1 a 30.000
    let apiURL = 'https://api.themoviedb.org/3/movie/'
    let apiKey = '?api_key=e6c67f8fc7b36fe10befd5aef4d0ee08'
    let imageError = 'https://thumbs.dreamstime.com/b/programador-do-homem-novo-que-trabalha-no-computador-com-c%C3%B3digo-na-tela-conceito-de-programa%C3%A7%C3%A3o-vetor-estudante-102846347.jpg'
    let language = 'language=pt-BR'

    axios.get(`${apiURL}${randomNumber}${apiKey}&${language}`)
    .then(res => {
        $content.innerHTML = ''
        
        if(res.data.overview === '') {
            aboutMovie(res.data.title, 'Ops, não encontramos a sinopse deste filme!')
        } else {
            aboutMovie(res.data.title, res.data.overview)
        }

        if(res.data.poster_path === null) {
            getPoster('https://cf.shopee.com.br/file/6043d9950110714e412e508a83be939a')
        } else {
            getPoster(`https://image.tmdb.org/t/p/w500${res.data.poster_path}`)
        }

    })
    .catch(error => {
        $content.innerHTML = ''
        console.error(error)

        errorMessage('Ops, hoje não é dia de assistir filme. Bora codar!🚀')
        getPoster(imageError)
    })
}

function aboutMovie(movieName, movieSynopsis) {
    var infoMovie = document.createElement('div')
    var title = document.createElement('h2')
    var synopsis = document.createElement('p')
    var getMovieName = document.createTextNode(movieName)
    var getMovieSynopsis = document.createTextNode(movieSynopsis)

    $content.appendChild(infoMovie)
    infoMovie.appendChild(title)
    infoMovie.appendChild(synopsis)
    title.appendChild(getMovieName)
    synopsis.appendChild(getMovieSynopsis)
}


function getPoster(url) {
    var poster = document.createElement('img')
    
    $content.appendChild(poster)
    poster.setAttribute('src', url)
    
}

function errorMessage(error) {
    var text = document.createElement('h2')
    var getErrorMessage = document.createTextNode(error)

    $content.appendChild(text)
    text.appendChild(getErrorMessage)
}