# Component Library

This project is a [storybook](https://storybook.js.org/) collection of React components that I'm using to build my website.

All components are available as [npm package](https://github.com/marcomontalbano/marcomontalbano.github.io/packages/79405) using [GitHub Packages](https://github.com/features/packages).

The storybook site is hosted by [Netlify](https://www.netlify.com/) and available at http://component-library.marcomontalbano.com. The build is triggered by a [GitHub Action](https://github.com/features/actions) every time a new package version is published.


## Development Notes

`npm start` - http://localhost:9009

### index.ts

The file `./src/index.ts` imports and exports all components so that you can easily import them on your website:

```js
import { Header } from '@marcomontalbano/component-library';
```

:warning: **the order** in which you import the components into `index.ts` **is relevant** for `styled-components`

> *We guarantee CSS ordering by injecting CSS in the order that the components are defined.*
> https://github.com/styled-components/styled-components/issues/382#issuecomment-273330002
