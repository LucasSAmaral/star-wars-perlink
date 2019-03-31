<h1 align="center">Star Wars Perlink</h1>

<h2 align="center"><img src="https://www.mysoti.com/img/user/angold01/product/web/1447319/1447319_show_default.png" width="500" alt="Millenium Falcon"></img></h2>

## Descrição

Este é um desafio proposto pela Perlink, que consiste em realizar uma busca em uma API. Passando um filme da franquia Star Wars como parâmetro, a busca deve retornar o filme que atende ao parâmetro escolhido. Caso se passe o nome de um personagem da franquia, a busca deve retornar os filmes em que esse personagem aparece.

Ao clicar no nome do filme, algumas informações sobre ele são apresentadas, como o nome do filme, o diretor, o número do episódio e o ano de lançamento.

## Instalação

Clone o repositório.

``` bash
git clone https://github.com/LucasSAmaral/star-wars-perlink.git
```
Após o repositório ser baixado, entre na pasta:

``` bash
cd star-wars-perlink
```

Instale todas as dependências:

``` bash
npm install
```

E por fim, execute a aplicação localmente.

``` bash
npm start
```

Acesse o endereço http://localhost:3000 para rodar a aplicação.

Caso prefira acessar a aplicação online, acesse o endereço https://star-wars-perlink.netlify.com/

## Testes unitários

Para realizar os testes digite:

``` bash
npm test
```

### Como foi feito?

Para desenvolver a aplicação, utilizei as seguintes tecnologias:

* React para criar os componentes e fazer a navegação por rotas.

* Axios para fazer a requisição à API.

* SASS.

* Netlify para hospedar a aplicação.