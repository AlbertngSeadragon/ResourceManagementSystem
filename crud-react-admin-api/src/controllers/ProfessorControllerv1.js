const Professor = require("../models/Professorv1");
let _hash = require("./bcrypt");

module.exports = {
    create: async (req, res) => {   
        let { email, username, password } = req.body;
        
        password = _hash.encrypt(password);

        if(email && username && password){
            try{
                const [professor, created] = await Professor.findOrCreate({ where: {username}, defaults: {email, username, password}});
                if(created){
                    return res.status(200).json({message:"Professor created"});
                } else{
                    return res.status(406).json({error:"Username already exists"});
                }
            } catch(err) {
                console.log(err.errors);          
                return res.status(500).json({error: "Could not create professor"});  
            }

        } else{
            return res.status(400).json({error:"invalid params"});
        }
        
    },
    fetchOne: async (req, res) => {
        var id = req.params.id;

        if(id && isNaN(id) == false) {
            try{
                var professor = await Professor.findByPk(id);
                if(professor == null) {
                    return res.status(404).json({error:"Could not find professor"})
                }
                return res.status(200).json(professor);

            } catch(err){
                console.log(err);          
                return res.status(500).json({error: "Could not fetch professor"});
            }

        } else{
            return res.status(400).json({error:"invalid params"});
        }
    },
    fetchAll: async (req, res) => {
        try{
            var professors = await Professor.findAll();
            return res.status(200).json(professors);

        } catch(err){
            console.log(err);          
            return res.status(500).json({error: "Could not fetch professors"});
        }
    },
    update: async (req, res) => {
        var id = req.params.id;
        var { email, username, password } = req.body;
        // try{
        //     _hash.decrypt()
        //     return res.status(500).json({error: "success"}); 
        // } catch(err) {
        //     console.log(err.errors);          
        //     return res.status(500).json({error: "CANnnot decrpt"});  
        // }
        password = _hash.encrypt(password);

        if(id && isNaN(id) == false) {
            if(email && username && password){
                try{
                    var professor = await Professor.findByPk(id);
                    if(professor == null) {
                        return res.status(404).json({error:"Could not find professor"})
                    }
                    
                    // var searchUsername = await Professor.findOne({where: {username}});
                    // if(searchUsername !== null){
                    //     if(searchUsername.id != id){
                    //         return res.status(406).json({error:"Username already exists"});
                    //     }
                    // }

                    const update = await Professor.update({email, username, password}, {where: {id}});
                    if(update.length > 0 && update[0] == 1){
                        return res.status(200).json({message: "Professor details updated"});
                    } else{
                        return res.status(500).json({error: "Could not update professor"});
                    }
                } catch(err) {
                    console.log(err.errors);          
                    return res.status(500).json({error: "Could not update professor"});  
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
                var professorExists = await Professor.findByPk(id)
                if(professorExists === null){
                    return res.status(404).json({error: "Could not find professor"});
                }
                    
                await Professor.destroy({ where: {id}});
                return res.status(200).json({message: "Professor deleted"});

            } catch(err){
                console.log(err);          
                return res.status(500).json({error: "Could not delete professor"});
            }
        } else{
            return res.status(400).json({error:"invalid params"});
        }
    }
}