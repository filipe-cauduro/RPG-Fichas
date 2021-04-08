# Backend
* ## API Restful criada utilizando:

    * ### Node.JS
        * Express
        * TypeORM
        * JWT Authentication (JSON Web Token)
    * ### SQLite

## Iniciando a aplicação

1. Entre na pasta raíz do backend;
2. Renomeie o banco de dados (**`database.db-template`**) para **`database.db`**;
3. Renomeie o **`.env.template`** contendo as informações sensíveis para **`.env`**;
4. Altere o arquivo e substitua os valores que constam por palavras chave:
    * JWT_SECRET=**`PALAVRA_SEGREDO_SEM_ESPAÇOS`**
    * JWT_REFRESH_SECRET=**`PALAVRA_SEGREDO_SEM_ESPAÇOS`**
    * PASSWORD_HASH_ROUNDS=**`NUMERO_DE_VEZES_QUE_O_HASH_SERÁ_FEITO_(PADRÃO_10)`**
5. Abra seu terminal com permissões elevadas;
6. Execute um comando **`yarn install`** ou **`npm install`**;
7. Assim que finalizada a restauração de pacotes, execute um **`yarn start`** ou **`npm run start`**.

**Opcional**: É possível alterar a porta de entrada para o backend modificando o arquivo **`config.json`**.