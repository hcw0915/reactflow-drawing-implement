# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



### Tasks

1. 整理程式碼
2. 解決型別問題
3. Modal 製作
4. dnd圖標製作
5. sideBar 製作


- [X] feat: add i18n with en/zh version (11/24) #3
- [X] feat: add SubRoad Component with three size (11/22) #2
- [X] feat: create new React-flow Project first commit (11/21) #1
> consulting meeting with RD friends in DC-sheep 11/20
- [ ] feat: add MainRoad Component (11/19) 
- [X] feat: add zustand as State Management (11/18) 
- [X] feat: first flow POC & API testing (11/15) 
- [X] Two weeks survey react-flow possibility  