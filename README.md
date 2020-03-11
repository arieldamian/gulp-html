# HTML minimizer for MELI Emails API

## Prerequisites

* Node (Developed and tested with v10 LTS)
* Gulp cli

```bash
npm i -g gulp-cli
```

## Setup

After cloning the repository, run the following command to install dependencies:

```bash
npm install
```

## Usage

1. Place the HTML files you want to prepare for sending via mail in the `src/email-template/` directory.
2. Run the following command:

```bash
gulp build
```

3. Use the files generated in the `dist/` directory.

## List of commands

* `gulp clean`: Removes all files in the `dist/` directory.
* `gulp minifyHtml`: Generates a minified version of any HTML file located in `./src/email-template/`
* `gulp prepMail`: Appends a backslash (`\`)character before any double quote (`"`) character in all HTML files located in the `dist/` directory
* `gulp build`: Runs all previous commands in order
