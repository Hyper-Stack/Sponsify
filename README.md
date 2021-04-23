# Sponsify
A website that connects the event organizers looking for sponsors and companies/organizations interested in giving sponsorship. 



## Description
On Sponsify, there is a manager section where event managers will register themselves and will keep on updating the events they are looking sponsorship for. These details will be visible to the registered sponsors. In the sponsor section, sponsors can find nearby Events registered by event managers on our website. In order to register as a sponsor, you'll need to first tell us about your company and product. If any sponsor wants to provide sponsorship in a particular event, they can contact that event's manager directly from the website, or can save that event in cart for future. In case an event is saved in the cart of any sponsor, that event's manager would be able to see that company in the list of "Interested Companies" next to each of the events. Respective sponsors can be contacted from that list.

### Tech Stacks used:
    Node.js
    Express
    MongoDB
    Bootstrap


## Requirements and installation
The project is based on Express- a Node.js web application framework. 

[Node.js](https://nodejs.org/en/) module is available through the [npm registry](https://www.npmjs.com/). Make sure to download the installer and install them if not already.

Install express using [```npm install``` commmand](https://docs.npmjs.com/downloading-and-installing-packages-locally):

    $ npm install express
    
If the installation was successful, you should be able to run the following commands.

    $ node --version
    v14.16.0
    
    $ npm --version
    6.14.11


``` package.json ``` has been already included in the repo.



## To run this project on a localhost:
```
$ git clone https://github.com/aashishchachan/sponsify.git
```
You will need to create a ```.env``` file and assign your database key to a variable ```"dbURL"```
```   
$ npm i
$ node index.js
```
Go to the address ```localhost:3000``` on your web browser.
You are all set and good to go!


### To get Emails
If you want to receive emails whenever user contacts you through forms. Type ```API_KEY``` and ```DOMAIN``` in ```.env``` file:

```
api_key: process.env.API_KEY ||  //TODO: Replace with your mailgun API KEY
domain: process.env.DOMAIN   //TODO: Replace with your mailgun DOMAIN
```

### To Upload Images

Get the api keys of [Cloudinary](https://cloudinary.com/). and set them into your ```.env``` file:

```
CLOUDINARY_CLOUD_NAME ="Cloudinary cloud name"
CLOUDINARY_KEY = "Cloudinary Key"
CLOUDINARY_SECRET = "Cloudinary Secret Key"
```
## Future Goals
To add search filter algorithms so that we are able to provide the sponsors with only the kind of events they want to see.


#### Feel free to mail us at sponsify07@gmail.com in case of any query.




