# Gulp json to twig generator

A simple static webpage generator using gulp, twig and json files

## Content

You'll find all text content in `source/content/*.json`


## Build

`npm i`, `gulp` puts everything necessary into `public` and starts the watchers.


## Development

Use `gulp` (after installing dependencies via npm and bower) and start your local server using the folder `public`

### Technologies


#### Gulp

To compile all files and assets, [GULP](https://gulpjs.com/) is used in this project. You'll find the configuration in `gulpfile.js`.

#### SASS

[SCSS/SASS](http://sass-lang.com/) is used as pre-compiler for the final css.

#### Twig

This prototype is using [TWIG](https://twig.symfony.com/) as a template engine to construct the final html.

Warning: This project is using [twig.js](https://github.com/twigjs/twig.js) to compile the twig templates. There might be some differences to the original php-version.


## Architecture

This is component thinking.

Every element on the page can be a single component which gets its logic from `components/[component-name]` and its content via a `json`-file inside `data`. You can see how the components are iterated in `pages/index.twig`.


### JS & SCSS

The goal is to use only one CSS- and one JS-File. To achieve that, everytime a new component is created, its concurring js- and scss-files have to be imported into `styles.scss` / `app.js`.
