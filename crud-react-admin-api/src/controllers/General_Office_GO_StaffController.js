const General_Office_GO_Staff = require("../models/General_Office_GO_Staff");
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
        var general_office_go_staff_id = req.params.general_office_go_staff_id;

        if(general_office_go_staff_id && isNaN(general_office_go_staff_id) == false) {
            try{
                var general_office_go_staff = await General_Office_GO_Staff.findByPk(general_office_go_staff_id);
                if(general_office_go_staff == null) {
                    return res.status(404).json({error:"Could not find general_office_go_staff"})
                }
                return res.status(200).json({general_office_go_staff});

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
            var general_office_go_staffs = await General_Office_GO_Staff.findAll();
            return res.status(200).json({general_office_go_staffs});

        } catch(err){
            console.log(err);          
            return res.status(500).json({error: "Could not fetch general_office_go_staffs"});
        }
    },
    update: async (req, res) => {
        var general_office_go_staff_id = req.params.general_office_go_staff_id;
        var { email, username, password } = req.body;
        // try{
        //     _hash.decrypt()
        //     return res.status(500).json({error: "success"}); 
        // } catch(err) {
        //     console.log(err.errors);          
        //     return res.status(500).json({error: "CANnnot decrpt"});  
        // }
        password = _hash.encrypt(password);

        if(general_office_go_staff_id && isNaN(general_office_go_staff_id) == false) {
            if(email && username && password){
                try{
                    var general_office_go_staff = await General_Office_GO_Staff.findByPk(general_office_go_staff_id);
                    if(general_office_go_staff == null) {
                        return res.status(404).json({error:"Could not find general_office_go_staff"})
                    }
                    
                    // var searchUsername = await General_Office_GO_Staffs.findOne({where: {username}});
                    // if(searchUsername !== null){
                    //     if(searchUsername.id != general_office_go_staff_id){
                    //         return res.status(406).json({error:"Username already exists"});
                    //     }
                    // }

                    const update = await General_Office_GO_Staffs.update({email, username, password}, {where: {general_office_go_staff_id}});
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
        var general_office_go_staff_id = req.params.general_office_go_staff_id;

        if(general_office_go_staff_id && isNaN(general_office_go_staff_id) == false) {
            try{
                var general_office_go_staffExists = await General_Office_GO_Staffs.findByPk(general_office_go_staff_id)
                if(general_office_go_staffExists === null){
                    return res.status(404).json({error: "Could not find general_office_go_staffs"});
                }
                    
                await General_Office_GO_Staffs.destroy({ where: {general_office_go_staff_id}});
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