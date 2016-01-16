# Project-词表
[I guess] It's a web app that creates a frequency list of Chinese characters on a web page you provide.

### How to import the dictionary and run the app
Dictionary is formatted in json and is stored in the file name dict.json. In order to upload the data to MongoDB, do the following:
  - Install MongoDB on your machine. (I know it comes with Meteor, but we need it installed on our machine to use the Mongo Shell)
  - Run the main app by just using "meteor" command
  - Open another tab in your terminal and run "meteor mongo"
  - Open /private folder where the dictionary is and run this "mongoimport -h localhost:3001 --db meteor --collection chindict --type json --file dict.json --jsonArray". Btw, make sure the port number for localhost matches the one provided when you run "meteor mongo".
  - Now it should all work :)

### How to debug the backend
- Just run "meteor debug" and follow the very simple instructions