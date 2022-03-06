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
yarn dev:start up
```

- If you need to install module you could use the next command to use yarn inside Docker container:

```sh
yarn x yarn add <module>
```
