const Admin = require("../models/Adminv1");
let _hash = require("./bcrypt");
const express = require("express");

module.exports = {
    create: async (req, res) => {
        let { email, username, password } = req.body;

        password = _hash.encrypt(password);

        if (email && username && password) {
            try {
                const [admin, created] = await Admin.findOrCreate({ where: { username }, defaults: { email, username, password } });
                if (created) {
                    return res.status(200).json({ message: "Admin created" });
                } else {
                    return res.status(406).json({ error: "Username already exists" });
                }
            } catch (err) {
                console.log(err.errors);
                return res.status(500).json({ error: "Could not create admin" });
            }

        } else {
            return res.status(400).json({ error: "invalid params" });
        }

    },
    fetchOne: async (req, res) => {
        var id = req.params.id;

        if (id && isNaN(id) == false) {
            try {
                var admin = await Admin.findByPk(id);
                if (admin == null) {
                    return res.status(404).json({ error: "Could not find admin" })
                }
                return res.status(200).json(admin);

            } catch (err) {
                console.log(err);
                return res.status(500).json({ error: "Could not fetch admin" });
            }

        } else {
            return res.status(400).json({ error: "invalid params" });
        }
    },
    fetchAll: async (req, res) => {
        try {
            //var admins = await Admin.findAll();
            //return res.status(200).json({admins});
            //res.set('Content-Range', 'posts 0-25/100');
            // function renameKey(obj, oldKey, newKey) {
            //     obj[newKey] = obj[oldKey];
            //     delete obj[oldKey];
            // }
            
            // const arr = (await Admin.findAll());
            // arr.forEach(obj => renameKey(obj, 'admin_id', 'id'));
            // //const updatedJson = (arr);
            // console.log("arr", arr)
            // return res.status(200).json(arr);
            return res.status(200).json(await Admin.findAll());

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: "Could not fetch admins" });
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

        if (id && isNaN(id) == false) {
            if (email && username && password) {
                try {
                    var admin = await Admin.findByPk(id);
                    if (admin == null) {
                        return res.status(404).json({ error: "Could not find admin" })
                    }

                    // var searchUsername = await Admin.findOne({where: {username}});
                    // if(searchUsername !== null){
                    //     if(searchUsername.id != admin_id){
                    //         return res.status(406).json({error:"Username already exists"});
                    //     }
                    // }

                    const update = await Admin.update({ email, username, password }, { where: { id } });
                    if (update.length > 0 && update[0] == 1) {
                        return res.status(200).json({ message: "Admin details updated" });
                    } else {
                        return res.status(500).json({ error: "Could not update admin" });
                    }
                } catch (err) {
                    console.log(err.errors);
                    return res.status(500).json({ error: "Could not update admin" });
                }

            } else {
                return res.status(400).json({ error: "invalid params" });
            }

        } else {
            return res.status(400).json({ error: "invalid params" });
        }
    },
    delete: async (req, res) => {
        var id = req.params.id;

        if (id && isNaN(id) == false) {
            try {
                var adminExists = await Admin.findByPk(id)
                if (adminExists === null) {
                    return res.status(404).json({ error: "Could not find admin" });
                }

                await Admin.destroy({ where: { id } });
                return res.status(200).json({ message: "Admin deleted" });

            } catch (err) {
                console.log(err);
                return res.status(500).json({ error: "Could not delete admin" });
            }
        } else {
            return res.status(400).json({ error: "invalid params" });
        }
    }
}