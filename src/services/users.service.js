const UsersModel = require('../models/User');

class UsersService{

    async getUsers() {
        try {
          const users = await UsersModel.find();
          return users;
        } catch (err) {
          console.error(err);
          throw new Error("Error in getUsers Service");
        }
      }

      async postUser(user) {
        try {

          let isUserRegistered = await UsersModel.findOne({email:user.email});
          if(isUserRegistered){
            throw new Error("User already registered");
          }
          else{
            await UsersModel.create(user);
            return user;
        }
        } catch (err) {
          console.error(err);
          throw new Error("Error in createUser Service");
        }
      }
}

module.exports = new UsersService();