# 💰 Money Manager
Este repositório contêm o *backend* e o *frontend* da aplicação construída na [Semana Fullstack Masterclass do Dr. Waka](http://doutorwaka.tech/semana-fullstack-masterclass). 

## Sobre o projeto
Este projeto é um gerenciador de fluxo de caixa onde o usuário pode inserir e remover movimentações financeiras. A aplicação irá sempre manter o balanço final de acordo com as entradas e saídas de dinheiro.

Além disso, o usuário deve efetuar o **login** para conseguir acessar a **dashboard** da aplicação.

A senha e o usuário são:
```
doutorwaka@gmail.com
doutorwaka
```

## Backend
O *backend* do sistema foi construído utilizando `JAVA` e `Spring Framework`. Para gerenciar os pacotes da aplicação foi utilizado o `Gradle`.

Uma ***API Rest*** com *endpoints* para autenticação, validação de token e **CRUD** de atividades de fluxo de caixa foi desenvolvida. Abaixo são listadas todos os endpoints da **API**.

1. **POST /auth/login** - Faz o login e recebe um token JWT
    ```
    {
      "email":"doutorwaka@gmail.com",
      "password":"doutorwaka"
    }
    ```
2. **POST /auth/validate** - Valida um token JWT
   ```
    {
      "token":"valid_token"
    }
    ```
3. **POST /activities** - Insere uma nova atividade - *Protegido*
   ```
    {
      "date":"2023-08-02T01:25:05.013+00:00",
      "description":"Uma nova atividade de fluxo",
      "type":"revenue",
      "value":109.90
    }
    ```
4. **GET /activities** - Lista todas as atividades - *Protegido*
5. **DELETE /activities/{id}** - Remove a atividade com **{id}** se existir - *Protegido*
6. **GET /activities/balance** - Retorna o balanço total de todas as atividades - *Protegido*

## Frontend
O *frontend* foi desenvolvido utilizando `HTML`, `Tailwind`, `React` e `NextJS` com `Typescript`. Para a construção da interface, foi utilizado ainda `Shadcn-ui` como biblioteca.

O *frontend* conta com uma API que faz o papel de *backend for frontend*. Ela é responsável por receber os *requests* do usuário para então repassar ao *backend*.

A proteção das rotas foi feita utilizando o `middleware` do `NextJS` juntamente com token `JWT` e `cookies`. 

## Para mais informações
Se quiser mais informações sobre o projeto, por favor me contate em [https://www.doutorwaka.com/contact](https://www.doutorwaka.com/contact).
