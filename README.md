# Installation

The site uses Middleman a ruby based static site generator with a Webpack build system.

The Middlman docs are located [here](https://middlemanapp.com)

## Install Middleman on macos
xcode-select --install
gem install middleman

## Install Middleman on linux
sudo apt-get install ruby-dev build-essential make g++ libxml2 zlib1g-dev
sudo gem install middleman

## Install bundler
sudo gem install bundler

## Install nvm
Follow the nvm install [guide](https://github.com/nvm-sh/nvm#installation-and-update)

## Install nodejs with nvm
nvm install 8.11
nvm use 8.11

## Install npm dependencies
npm install

## Install middleman dependencies
npm run middleman:install

## Start dev server
npm run middleman:start

## Build production
npm run middleman:build

# Docker
To install all the dependencies and build the project run the following command:
docker run -v "$PWD":/app nielsvdoorn/middleman bundle install && middleman build
