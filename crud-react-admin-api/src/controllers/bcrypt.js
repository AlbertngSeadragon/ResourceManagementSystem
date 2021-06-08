const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    encrypt: function(myPassword){
        const hash = bcrypt.hashSync(myPassword, saltRounds);
        return hash
    },
    decrypt: function(myPassword, myHash){
        const result = bcrypt.compareSync(myPassword, myHash);
        return result
    },
};
