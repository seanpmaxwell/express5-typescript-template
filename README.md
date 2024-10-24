# 🚀 Express5 Typescript Template
- Demo the latest version of ExpressJS (v5) with Typescript and the new "flat" configuration for ESlint.
- Note the there are git two branches of this:
  - `master`: uses nodemon, dotenv, swc, and ts-node
  - `setup_using_tsx`: replace all the above with tsx


## 📁 Background
- Express and eslint have undergone some major updates recently so I want to do demo showing them together. Eslint follows a new file/format for configuring settings (which took me a while to setup) and express now comes packaged with typescript and "async error handling".
- This project follow Typscript Best Practices listed <a href="https://github.com/seanpmaxwell/Typescript-Best-Practices">here</a>.


## 🛠️ Tools
- Server: Express5
- Linting: ESLint
- Testing: Jamine + Supertest
- Running typescript files: Ts-node
- Hot Reloading: Nodemon, Swc/core
- Environment Variables: Dotenv
- Logging: JetLogger
- Schema handling: Zod for schema validation
- Dates: DayJs
- Some front-end stuff: handlebars and bootstrap


## ✅ Available Commands
- Run development server: `npm run dev`
- Ren development server with hot-reloading: `npm run dev:hot`
- Run all unit-tests: `npm test` or `npm run test:hot`
- Run a single unit-test: `npm test -- "name of test file" (i.e. users).`
- Run linter: `npm run lint -- ./src` and `npm run lint -- ./src`
- Check for type errors (tsx does not do this): `npm run type-check`.
- Transpile production code: `npm run build`
- Start production server: `npm start`

🎉 Happy web deving!
