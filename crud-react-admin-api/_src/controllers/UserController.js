const User = require("../models/User");

module.exports = {
    create: async (req, res) => {   
        let { name, phone, email, password } = req.body;     

        if(name && phone && email && password){
            try{
                const [user, created] = await User.findOrCreate({ where: {email}, defaults: {name, phone, email, password}});
                if(created){
                    return res.status(200).json({message:"User created"});
                } else{
                    return res.status(406).json({error:"Email already exists"});
                }
            } catch(err) {
                console.log(err.errors);          
                return res.status(500).json({error: "Could not create user"});  
            }

        } else{
            return res.status(400).json({error:"invalid params"});
        }
        
    },
    fetchOne: async (req, res) => {
        var id = req.params.id;

        if(id && isNaN(id) == false) {
            try{
                var user = await User.findByPk(id);
                if(user == null) {
                    return res.status(404).json({error:"Could not find user"})
                }
                return res.status(200).json({user});

            } catch(err){
                console.log(err);          
                return res.status(500).json({error: "Could not fetch user"});
            }

        } else{
            return res.status(400).json({error:"invalid params"});
        }
    },
    fetchAll: async (req, res) => {
        try{
            var users = await User.findAll();
            return res.status(200).json({users});

        } catch(err){
            console.log(err);          
            return res.status(500).json({error: "Could not fetch users"});
        }
    },
    update: async (req, res) => {
        var id = req.params.id;
        var { name, phone, email, password } = req.body; 

        if(id && isNaN(id) == false) {
            if(name && phone && email && password){
                try{
                    var user = await User.findByPk(id);
                    if(user == null) {
                        return res.status(404).json({error:"Could not find user"})
                    }
                    
                    var searchEmail = await User.findOne({where: {email}});
                    if(searchEmail !== null){
                        if(searchEmail.id != id){
                            return res.status(406).json({error:"Email already exists"});
                        }
                    }

                    const update = await User.update({name, phone, email, password}, {where: {id}});
                    if(update.length > 0 && update[0] == 1){
                        return res.status(200).json({message: "User details updated"});
                    } else{
                        return res.status(500).json({error: "Could not update user"});
                    }
                } catch(err) {
                    console.log(err.errors);          
                    return res.status(500).json({error: "Could not update user"});  
                }
    
            } else{
                return res.status(400).json({error:"invalid params"});
            }

        } else{
            return res.status(400).json({error:"invalid params"});
        }
    },
    delete: async (req, res) => {
        var id = req.params.id;

        if(id && isNaN(id) == false) {
            try{
                var userExists = await User.findByPk(id)
                if(userExists === null){
                    return res.status(404).json({error: "Could not find user"});
                }
                    
                await User.destroy({ where: {id}});
                return res.status(200).json({message: "User deleted"});

            } catch(err){
                console.log(err);          
                return res.status(500).json({error: "Could not delete user"});
            }
        } else{
            return res.status(400).json({error:"invalid params"});
        }
    }
}