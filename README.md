# Randlist

Webapp para realização de sorteios com listas, filtros e blacklist

**[Versão de produção (randlist.io)](https://randlist.io)**

**[Versão de desenvolvimento (randlist.aerobatic.io)](https://randlist.aerobatic.io)**

## Recursos

- Importação de lista a partir de arquivos .csv
- Criação de sorteios com balcklist (impede que um registro seja sorteado 2x)
- Utilização de expressões JS para criar filtros durante os sorteios
- Dispensa autenticação por utilizar LocalStorage

## Contribua com o projeto

**[Confira nosso Board no Trello](https://trello.com/b/4GZ8SdTF/randlist-io)**

Baixe o repositório localmente, execute `npm install` e `bower install` para baixar todas as dependências.

Execute `grunt build` para gerar o pacote e `grunt serve` para rodar um servidor localmente.

Execute `grunt test` para executar os testes unitários utilianzando o Karma.

Este projeto foi iniciado a partir do [yo angular generator](https://github.com/yeoman/generator-angular) versão 0.15.1.
