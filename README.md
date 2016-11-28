# Randlist

Webapp para realização de sorteios com listas, filtros e blacklist

**[Live demo](https://randlist.aerobatic.io)**

## Recursos

- Importação de lista a partir de arquivos .csv
- Criação de sorteios com balcklist (impede que um registro seja sorteado 2x)
- Utilização de expressões JS para criar filtros durante os sorteios
- Dispensa autenticação por utilizar LocalStorage

## Contribua com o projeto

Baixe o repositório localmente, execute `npm install` e `bower install` para baixar todas as dependências.

Execute `grunt build` para gerar o pacote e `grunt serve` para rodar um servidor localmente.

Execute `grunt test` para executar os testes unitários utilianzando o Karma.

Este projeto foi iniciado a partir do [yo angular generator](https://github.com/yeoman/generator-angular) versão 0.15.1.

## Roadmap

- Realizar cobertura de testes
- Suportar .csv com dados tabulados e separados por ;
- Implementar form de cadastro de registros avulsos
- Criar filtro para selecionar as colunas do .csv que devem ser utilizadas na lista
- Criar manifesto "PWA" e configurar worker para funcionamento off-line
- Criar camada de persistencia online com Firebase
