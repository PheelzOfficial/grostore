const {v4: uuidv4} = require('uuid');
const accountmodel = require("../models/account");
const crypto = require("crypto");

const generateOrderId = async () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    const generateRandomId = () => {
      let orderId = "";
      for (let i = 0; i < 6; i++) {
        orderId += characters[Math.floor(Math.random() * characters.length)];
      }
      return orderId;
    };
  
    let orderId;
    let exists = true;
  
    while (exists) {
      orderId = `GRO-${generateRandomId()}`;
      exists = await accountmodel.findOne({ sku: orderId });
    }
  
    return orderId;
  };




const uniqueImageName = (name) =>{
    const imgExt = name.split('.').pop();
    const newName = `${uuidv4()}.${imgExt}`;
    return newName;
}

module.exports = {uniqueImageName, generateOrderId};