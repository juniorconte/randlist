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

Baixe o repositório localmente, execute `npm install` e `bower install` para baixar todas as dependências.

Execute `grunt build` para gerar o pacote e `grunt serve` para rodar um servidor localmente.

Execute `grunt test` para executar os testes unitários utilianzando o Karma.

Este projeto foi iniciado a partir do [yo angular generator](https://github.com/yeoman/generator-angular) versão 0.15.1.

### Prefixos de commit

**FIX**: O que foi corrigido

**ADD**: O que foi adicionado

**DEL**: O que foi removido

**CHG**: O que foi modificado

**RFC**: O que foi refatorado

**AMD**: Mensagem do commit original

**MRG**: Branch "mergido" ao branch do commit em questão

### Fluxo de desenvolvimento

Utilizamos o Trello para manter e gerenciar o fluxo de desenvolvimento, visite o Board para acompanhar a funcionalidades que estão no Road Map, Bug  fixes, Working in progress, Changelog, etc.

**[Confira nosso Board no Trello](https://trello.com/b/4GZ8SdTF/randlist-io)**
