const General_Office_GO_Staff = require("../models/General_Office_GO_Staffv1");
let _hash = require("./bcrypt");

module.exports = {
    create: async (req, res) => {   
        let { email, username, password } = req.body;
        
        password = _hash.encrypt(password);

        if(email && username && password){
            try{
                const [general_office_go_staff, created] = await General_Office_GO_Staff.findOrCreate({ where: {username}, defaults: {email, username, password}});
                if(created){
                    return res.status(200).json({message:"General_Office_GO_Staff created"});
                } else{
                    return res.status(406).json({error:"Username already exists"});
                }
            } catch(err) {
                console.log(err.errors);          
                return res.status(500).json({error: "Could not create general_office_go_staff"});  
            }

        } else{
            return res.status(400).json({error:"invalid params"});
        }
        
    },
    fetchOne: async (req, res) => {
        var id = req.params.id;

        if(id && isNaN(id) == false) {
            try{
                var general_office_go_staff = await General_Office_GO_Staff.findByPk(id);
                if(general_office_go_staff == null) {
                    return res.status(404).json({error:"Could not find general_office_go_staff"})
                }
                return res.status(200).json(general_office_go_staff);

            } catch(err){
                console.log(err);          
                return res.status(500).json({error: "Could not fetch general_office_go_staff"});
            }

        } else{
            return res.status(400).json({error:"invalid params"});
        }
    },
    fetchAll: async (req, res) => {
        try{
            //var general_office_go_staffs = await General_Office_GO_Staff.findAll();
            //return res.status(200).json({general_office_go_staffs});
            return res.status(200).json(await General_Office_GO_Staff.findAll());

        } catch(err){
            console.log(err);          
            return res.status(500).json({error: "Could not fetch general_office_go_staffs"});
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
                    var general_office_go_staff = await General_Office_GO_Staff.findByPk(id);
                    if(general_office_go_staff == null) {
                        return res.status(404).json({error:"Could not find general_office_go_staff"})
                    }
                    
                    // var searchUsername = await General_Office_GO_Staffs.findOne({where: {username}});
                    // if(searchUsername !== null){
                    //     if(searchUsername.id != general_office_go_staff_id){
                    //         return res.status(406).json({error:"Username already exists"});
                    //     }
                    // }

                    const update = await General_Office_GO_Staffs.update({email, username, password}, {where: {id}});
                    if(update.length > 0 && update[0] == 1){
                        return res.status(200).json({message: "General_Office_GO_Staffs details updated"});
                    } else{
                        return res.status(500).json({error: "Could not update general_office_go_staff"});
                    }
                } catch(err) {
                    console.log(err.errors);          
                    return res.status(500).json({error: "Could not update general_office_go_staff"});  
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
                var general_office_go_staffExists = await General_Office_GO_Staffs.findByPk(id)
                if(general_office_go_staffExists === null){
                    return res.status(404).json({error: "Could not find general_office_go_staffs"});
                }
                    
                await General_Office_GO_Staffs.destroy({ where: {id}});
                return res.status(200).json({message: "General_Office_GO_Staffs deleted"});

            } catch(err){
                console.log(err);          
                return res.status(500).json({error: "Could not delete general_office_go_staff"});
            }
        } else{
            return res.status(400).json({error:"invalid params"});
        }
    }
}