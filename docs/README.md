# Press-Play

<!-- A README is often the first item a visitor will see when visiting your repository. README files typically include information on:

What the project does
Why the project is useful
How users can get started with the project
Where users can get help with your project
Who maintains and contributes to the project

If you put your README file in your repository's hidden .github, root, or docs directory, GitHub will recognize and automatically surface your README to repository visitors. -->

## About

This is a spotify clone.

## Dev environment

I am using Next.js for a full stack development experience, which is wrapped React framework (`next`, `react` & `react-dom`) for building the app.

## Getting started

## Fork this GitHub repository to your own account.

https://github.com/yoyoyojoe/press-play

<img src='./assets/images/fork_it.png' width=500px height=auto/>

## Git clone 

Run the following command in your terminal to clone this repo into your local environment & preferred directory.

```
git clone https://github.com/yoyoyojoe/press-play.git
```

## Install all dependencies

Make sure you're within the root directory `calculator` (run `cd calculator`) in your terminal, run the following commands to get started.

```
npm install
```

## Start application 

### in development mode

Start the application in development mode. 

```
npm start
```
Parcel’s builtin dev server is automatically started when you run the default `parcel` command, which is a shortcut for `parcel serve`. By default, it starts a server at http://localhost:1234. If port 1234 is already in use, then a fallback port will be used. After Parcel starts, the location where the dev server is listening will be printed to the terminal.

### in production mode

Optionally, you can build the application for production. We will also remove all files within `dist` first.

```
npm run build
```

Then start application the same way (but now in production mode).

```
npm start
```

Generally speaking, building production code for your project has many benefits ([here](https://parceljs.org/features/production/) for more details), but for this project it should not make much, if any, difference between the development build and the production build.

After you build the application, if you want to go back to development mode, delete all files in your `dist` folder to run your application in development mode again with `npm start`. If the files (specifically `dist/index.html`) are/is not deleted, `parcel` will still use the same cached `index.html` file that references the same cached production-ready JavaScript files in `dist` and run in production mode even if you want to run the app in development mode.

# Developer's Notes

## Data model



# Notes

Stumbled upon `math.js` (https://mathjs.org/) and would be super cool to implement for future iterations or other projects.

Definitely more functions and features can be done to make this calculator even better!