# Desktop Documentation

The `desktop/` directory contains the Electron app.

## Get Started

Ensure you have Node.js and npm LTS versions installed on your local machine:

```sh
node -v
npm -v
```

Install npm packages:

```sh
npm i
```

In `desktop/`, copy `.env.example` to `.env.local`.

Ensure that `.env.example.local` contains the following line of code:

```dotenv
IS_DEV_MODE=true
```

Run a development server:

```sh
npm run dev
```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Server Response Shape

```ts
interface ServerRespone {
    number_of_questions: number;
    models_pulled: boolean;
    analyses: {
        analyses_0: {
            question: string;
            tp_response: string;
            ai_analysis: string;
            tp_confidence_score: number;
            ai_confidence_score: number;
        };
        analysis_1: {
            question: string;
            tp_response: string;
            ai_analysis: string;
            tp_confidence_score: number;
            ai_confidence_score: number;
        }
        ...
    };
}
```

I.e.

```ts
interface Analysis {
    question: string;
    tp_response: string;
    ai_analysis: string;
    tp_confidence_score: number;
    ai_confidence_score: number;
}

interface ServerRespone {
    number_of_questions: number;
    models_pulled: boolean;
    analyses: {
        analysis_0: Analysis;
        analysis_1: Analysis;
        ...
    };
}
```
