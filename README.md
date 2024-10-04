# 🚀 Express5 Typescript Template
- Demo the latest version of ExpressJS (v5) with Typescript and the new "flat" configuration for ESlint.


## 📁 Background
- Express and eslint have undergone some major updates recently so I want to do demo showing them together. Eslint follows a new file/format for configuring settings (which took me a while to setup) and express now comes packaged with typescript and "async error handling".
- This project follow Typscript Best Practices listed <a href="https://github.com/seanpmaxwell/Typescript-Best-Practices">here</a>.


## 🛠️ Tools
- Server: Express5
- Linting: ESLint
- Testing: Jamine + Supertest
- Environment files: Dotenvx
- Logging: JetLogger
- Schema handling: Model-Initializer (zod's too complex and typia doesn't work with ts-node)
- Dates: DayJs
- Hot Reloading: Nodemon
- Some front-end stuff: handlebars and bootstrap


## ✅ Available Commands
- Run development server: `npm run dev` or `npm run dev:hot`
- Run all unit-tests: `npm test` or `npm run test:hot`
- Run a single unit-test: `npm test -- "name of test file" (i.e. users).`
- Run linter: `npm run lint` and `npm run lint:tests`
- Transpile production code: `npm run build`
- Start production server: `npm start`


## 📃Some notes about the .env files
- Just to point out I know that the `env/.env.keys` file is not supposed to be committed, but because this is just a demo I decided to include it show how `dotenvx` works.
- When using `dotenvx` in production, you shouldn't use the `.env.keys` file and instead load the key through the command-line:
  - `DOTENV_PRIVATE_KEY_PRODUCTION="ed41c2bdbd4030812eca49efef2f0b42be2d983c01571c0751767e75d5885084" npm run start`
- See the `dotenvx` docs about encryption: `https://dotenvx.com/docs/quickstart/encryption`.
<br/>

🎉 Happy web deving!
