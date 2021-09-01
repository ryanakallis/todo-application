# README

This ReadME tried to elaborate on getting this app running on Ubuntu/Debian

 > denotes a line to be executed in the terminal.

Rails app generated using: (just FYI, no need to run this)
 > rails new todo-application -d=postgresql --webpacker=react

 ---------------------------------------------------

* System dependencies
Ruby, Rails, Postgres, NodeJS, Git, (linux: RVM / RBENV, Mac: Homebrew)

MacOS
HomeBrew: https://wpbeaches.com/installing-homebrew-on-macos-big-sur-11-2-package-manager-for-linux-apps/

NVM: https://github.com/nvm-sh/nvm#installing-and-updating



* Rails Version
 > rails -v
Rails 6.1.4.1



* Ruby version 
 > ruby -v
ruby 3.0.1p64 (2021-04-05 revision 0fb782ee38) [x86_64-linux]

MacOS (https://stackify.com/install-ruby-on-your-mac-everything-you-need-to-get-going/)
 > /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
 > brew install ruby 
installs latest ruby version
 > brew install ruby 3.0.1
installs ruby version 3.0.1

Ubuntu/Debian (https://gorails.com/setup/windows/10#comments)
 > sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
 > gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
 > curl -sSL https://get.rvm.io | bash -s stable
 > source ~/.rvm/scripts/rvm
 > rvm install 3.0.1
 > rvm use 3.0.1 --default
 > ruby -v
ruby 3.0.1p64 (2021-04-05 revision 0fb782ee38) [x86_64-linux]



Node version
 > Node -v
v16.8.0

MacOS (Install Node using either NVM / HomeBrew below)
NVM : https://ourcodeworld.com/articles/read/1429/how-to-install-nodejs-in-macos-bigsur
HomeBrew : https://wpbeaches.com/installing-node-js-on-macos-big-sur-and-earlier-macos-versions/

Ubuntu/Debian
 > curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
 > curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
 > echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
 > sudo apt update
 > sudo apt-get install -y nodejs yarn



* Configuration
Database file(config/database.yml)
uses postgres, update username & password as required



* Database creation
> rails db:create
