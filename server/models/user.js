const utils = require('../lib/hashUtils');
const Model = require('./model');
const crypto = require('crypto');
// Write you user database model methods here


class Users extends Model {
  constructor() {
    super('users');
    // this.rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  }

  // getUrlTitle(url) {
  //   return request(url).spread((response, html) => {
  //     let tag = /<title>(.*)<\/title>/;
  //     let match = response.body.match(tag);
  //     let title = match ? match[1] : url;
  //     return title;
  //   }); 
  // }

  // isValidUrl(url) {
  //   return url.match(this.rValidUrl);
  // }
  
  create(user) {
    let shasum = crypto.createHash('sha256');
    shasum.update(user.password);
    user.password = shasum.digest('hex');

    return super.create.call(this, user);
  }
  
  validate(user) {
    let shasum = crypto.createHash('sha256');
    shasum.update(user.password);
    let password = shasum.digest('hex');

    
    return super.get.call(this, user.password) === password;

  }
  
}

module.exports = new Users();