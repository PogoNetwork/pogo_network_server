# pokemon Go social network server

##  How to install?

```bash
$ git clone <repository_url>
$ npm run init_dev_project
```

## Requirements

Nodejs V5.8 and npm V3.7

use [NVM](https://github.com/creationix/nvm) for check and use any of NodeJS version easely

## Development

```bash
$ npm run dev // for start the current nodejs server
```

## create pokemonGoNetwork Db Dump

Your dump will be created and placed directly inside `./db` folder
Thus you will be able to save easy change that you've made and share it with others dev

```bash
$ npm run export_dump_db
$ git add ./db/pokemonGoNetwork.bak.sql// for versionning the new db dump
```

## deploy pokemonGoNetwork db Dump

for import pokemonGoNetwork db we use `postgres` psql user with password `postgres`.

```bash
$ npm run import_dump_db
```
