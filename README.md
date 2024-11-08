![JSMarket](./apps/web/public/logo.png)

# JSMarket

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![WTFPL](https://img.shields.io/badge/license-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)

![React](https://img.shields.io/badge/-React-20232a?logo=react&style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwind-css&style=for-the-badge)
![Graphql](https://img.shields.io/badge/-Graphql-df0397?logo=graphql&style=for-the-badge)
![Apollo](https://img.shields.io/badge/-Apollo-1572B6?logo=apollo&style=for-the-badge)
![NodeJS](https://img.shields.io/badge/-Node.js-20232a?logo=node.js&style=for-the-badge)
![Typescript](https://img.shields.io/badge/-Typescript-1572B6?logo=typescript&style=for-the-badge)
![NestJS](https://img.shields.io/badge/-NestJS-ea2845?logo=nestjs&style=for-the-badge)
![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest&style=for-the-badge)
![Nx](https://img.shields.io/badge/-Nx-000000?logo=nx&style=for-the-badge)

## Description
A modern e-commerce web application built with NestJS and React, using an Nx monorepo architecture.

## 🚀 Key Features
- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart
- 👤 User authentication
- 📦 Order management with state machine
- 💳 Checkout process
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure GraphQL API

## 🛠️ Tech Stack
- **Frontend**: React, Apollo Client, TailwindCSS
- **Backend**: NestJS, TypeORM, GraphQL
- **Testing**: Jest
- **Database**: SQLite

## Local Development

### 📋 Prerequisites
- Node.js v20 or higher
- npm v9 or higher

### 🔧 Setup Instructions

1. Clone the repository
2. Install dependencies
```bash
  npm install
```
4. Start the development servers

### 🚀 Running the app

```bash
  npx nx run dev
```

Go to [http://localhost:4200](http://localhost:4200) to see the app.

### 🐳 Running with Docker

```bash
  docker-compose -f docker-compose.prod.yml up --build
```

### 👥 Available Users

You can use any of these users to test the application:

#### Administrator
- Email: admin@jsmarket.com
- Password: admin123
- Role: Admin

#### Regular User
- Email: john@wick.com
- Password: andy
- Role: Regular user


## State machine

>**[More about: Order state machine](./libs/state-machines/src/lib/order/order-machine.ts)**

![Order State Machine](./apps/web/public/state.png)



## 👻 LICENCE

[WTFPL](http://www.wtfpl.net/about/)



