const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
  const username = req.body.username
  const password = req.body.password
  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred."});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    resolve(books)
    })

    myPromise.then((response) => {
        return res.status(300).json(JSON.stringify(response));
    })
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    const isbn = req.params.isbn;
    const book = books[isbn]
    resolve(book)
    })

    myPromise.then((response) => {
        return res.status(300).json(response);
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    const author = req.params.author;
    const bookKeys = Object.keys(books);
    const selectedBooks = [] ;
    bookKeys.forEach((key) => {
        if(books[key].author === author){
            selectedBooks.push(books[key])
        }
     
    })
    resolve(selectedBooks)
    })

    myPromise.then((response) => {
        return res.status(300).json(response);
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    const title = req.params.title;
    const bookKeys = Object.keys(books);
    const selectedBooks = [] ;
    bookKeys.forEach((key) => {
        if(books[key].title === title){
            selectedBooks.push(books[key])
        }
        
    })
    resolve(selectedBooks)
    })

    myPromise.then((response) => {
        return res.status(300).json(response);
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn]
  return res.status(300).json(book.reviews);
});

module.exports.general = public_users;
