# Installation

### Requirements

|                |            |
| -------------- | ---------- |
| Docker         | ~v20.20.12 |
| Docker Compose | ~1.29.2    |
| Mongodb        | ~4.0.0     |
| NodeJS         | ~14.0.0    |
| NestJS         | ~8.0.0     |

1. Clone the repo and install modules.
2. Create a .env in root folder and set the properly values.
3. If you use a different database to make testings, create a .env.test with the key=value to override.
4. Run the following command to launch in docker compose.

```sh
yarn dev:start
```

- If you need to install module you could use the next command to use yarn inside Docker container:

```sh
yarn x yarn add <module>
```

- You could run commands inside Docker container using x command like the following example:

```sh
yarn x ls
```

### Sandbox

|         |                                      |
| ------- | ------------------------------------ |
| API Key | 311SXD9-47T4XC9-JB5XZ88-82WCWWW      |
| API     | https://guros-dna.herokuapp.com      |
| API DOC | https://guros-dna.herokuapp.com/docs |

```sh
curl --request POST \
  --url http://localhost:3000/v1/dna/mutations \
  --header 'Authorization: Api-Key 311SXD9-47T4XC9-JB5XZ88-82WCWWW' \
  --header 'Content-Type: application/json' \
  --data '{
	"dna": [
		"ATGTGA",
		"CATTGC",
		"TTATGT",
		"TGAAGG",
		"CCCCTA",
		"TCACTG"
	]
}'
```

### Import and export dotenv files

Export dotenvs

```sh
yarn env zip guros.zip
```

Import dotends

```sh
yarn env unzip guros.zip
```
