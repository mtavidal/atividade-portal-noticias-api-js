const BASE_URL = "https://newsapi.org/v2/top-headlines";
const ACCESS_KEY = "6368f421218c431ca6f19c72b94e723a";

async function getTopHeadlines(tema,pageNumber = 1) {
    let url = `${BASE_URL}?country=us&category=${tema}&page=${pageNumber}&apiKey=${ACCESS_KEY}`;
    try {
        let res = await fetch(url);
        let data = await res.json();
        console.log(data.articles);
        carregarNoticias(data.articles);
    } catch (error) {
        console.log(error);
    }
}

let currentPage = 1;

const linkNoticias = document.getElementById("navNoticias");
linkNoticias.onclick = () => {
    document.querySelector(".active").classList.remove("active");
    linkNoticias.parentNode.classList.add("active");
    document.getElementById("listaDeNoticias").innerHTML = "";
    getTopHeadlines("general");
    let botao = document.getElementById("btnNoticias");
    currentPage = 1;
    botao.onclick = () => {
        getTopHeadlines("general", ++currentPage);
    }
};

const linkTec = document.getElementById("navTec");
linkTec.onclick = () => {
    document.querySelector(".active").classList.remove("active");
    linkTec.parentNode.classList.add("active");
    document.getElementById("listaDeNoticias").innerHTML = "";
    getTopHeadlines("technology");
    let botao = document.getElementById("btnNoticias");
    currentPage = 1;
    botao.onclick = () => {
        getTopHeadlines("technology", ++currentPage);
    }
};

const linkPes = document.getElementById("navPes");
linkPes.onclick = () => {
    document.querySelector(".active").classList.remove("active");
    linkPes.parentNode.classList.add("active");
    document.getElementById("listaDeNoticias").innerHTML = "";
    getTopHeadlines("science");
    let botao = document.getElementById("btnNoticias");
    currentPage = 1;
    botao.onclick = () => {
        getTopHeadlines("science", ++currentPage);
    }
};

getTopHeadlines("general", 1);
let botao = document.getElementById("btnNoticias");
botao.onclick = () => {
    getTopHeadlines("general", ++currentPage);
}


let noticias = "";

function carregarNoticias(articles) {
    articles.forEach(article => {
        if (article.title === null || article.url === null) {
            return;
        }

        noticias = `      <article class="col-6">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">  
            <img 
                src="${article.urlToImage === null ? "./indisponivel.png" : article.urlToImage}"
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                 ${article.title}
                </h5>
                <p class="card-text">
                ${article.description === null ? "Texto descritivo indisponível" : article.description}
                </p>
                <a
                  href="${article.url}"
                  class="btn btn-primary"
                  >Ir para noticia</a
                >
              </div>
            </div>
          </div>
        </div>
      </article> 
      `;
    


        let cardNoticias = document.getElementById("listaDeNoticias");
        cardNoticias.innerHTML += noticias;
        if (articles.length <20){
            botao.style.display = "none";
        } else {
            botao.style.display = "block";
        }

    });


}
