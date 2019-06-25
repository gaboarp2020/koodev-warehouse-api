# Koodev Warehouse App

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Koodev Warehouse App es una aplicación para la gestión de inventario, desarrollada para la asignatura de Complementaria I de la Universidad Nueva Esparta por:

  - Christopher Chirino
  - Gabriel Ron 
  - Juan Paiva
  
En este repositorio se encuentra la API de la aplicación

### Installation

Koodev Warehouse App - API requiere de [Node.js](https://nodejs.org/) v8+ para correr.

1er paso: instalar las dependencias

```sh
$ cd koodev-warehouse-api
$ npm install
#or
$ yarn install
```

2do paso: instalar sequelize-cli de forma global

```sh
$ npm install -g sequelize-cli
#or
$ yarn add -g sequelize-cli
```

3er paso: copiar el archivo .env.example y renombrarlo a .env

```sh
$ cp .env.example .env
```

**Nota: en el archivo .env se deben colocar las variables de entorno**

4to paso: una vez creada la base de datos y colocado las credenciales en el archivo .env, se realiza la migración a la base de datos usando Sequelize

```sh
$ sequelize db:migrate
```

5to paso: iniciar el servidor del API

```sh
$ yarn serve
#or
$ node server
```

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
