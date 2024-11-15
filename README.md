## Introduce

This is searching top 100 free app from itune and recommend top 10 for user.
### Desktop:
<img src="https://github.com/chung-shih-jou/shoalter-frontend-test/blob/test-readme-image/readme-image1.png" width="50%"/>

### Mobile:
![image](https://github.com/chung-shih-jou/shoalter-frontend-test/blob/test-readme-image/readme-image3.png)

## Technology

- Typescript
- React, NextJs, Redux, Context, hooks, Docker
- Eslint, Tailwind, Antd
- PWA, lazy loading, RWD
- useDebounce/ useThrottle for scrolling fetch api
- use cache for api and expire in 2 minutes
- the pwa display offline screen of last time user screen
- the search bar of keyword by paths ("im:name.label", "summary.label", "title.label"), these path includes the keyword will display top 5 substring in origin column, however no keywords in other columns will display origin string.
  ex: ![image](https://github.com/chung-shih-jou/shoalter-frontend-test/blob/test-readme-image/readme-image2.png)

## Getting Started

First, run the development server:

```local
- yarn build
- yarn start

also does npm
```

```docker
- yarn docker-build
- yarn docker-start

```
