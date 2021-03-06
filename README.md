# pokemon Go social network server

### Table of Contents
**[Requirements](#requirements)**  
**[How to install](#how-to-install)**  
**[Api documentation](#api-documentation)**  
**[Development](#development)**  
**[Create pokemonGoNetwork Db Dump](#create-pokemongonetwork-db-dump)**  
**[Deploy pokemonGoNetwork Db Dump](#deploy-pokemongonetwork-db-dump)**  

## Requirements

Nodejs V5.8 and npm V3.7

use [NVM](https://github.com/creationix/nvm) for check and use any of NodeJS version easely


## How to install

```bash
$ git clone <repository_url>
$ npm run init_dev_project
```
## Api documentation

after `npm run init_dev_project` runned, a new folder will appear at project root path, called apiDoc.

if you want informations on availables url api open the `index.html` inside this folder

## Development
Start developping for the server or simply start it with this command:
```bash
$ npm run dev // for start the current nodejs server
```

## Create pokemonGoNetwork Db Dump

Your dump will be created and placed directly inside `./db` folder
Thus you will be able to save easy change that you've made and share it with others dev

```bash
$ npm run export_dump_db
$ git add ./db/pokemonGoNetwork.bak.sql// for versionning the new db dump
```

## Deploy pokemonGoNetwork db Dump

for import pokemonGoNetwork db we use `postgres` psql user with password `postgres`.

```bash
$ npm run import_dump_db
```
