const users = require("../models/usersSchema");
const moment = require("moment");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

// register user
exports.userpost = async (req, res) => {
    const { fullname, email, mobile, hobbies } = req.body;

    if (!fullname || !email || !mobile || !hobbies) {
        res.status(401).json("All Inputs is required")
    }

    try {
        const preuser = await users.findOne({ email: email });

        if (preuser) {
            res.status(401).json("This user already exist in our databse")
        } else {

            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const userData = new users({
                fullname, email, mobile, hobbies, datecreated
            });
            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error")
    }
};

// router.route("/profile")
//     .get(checkLoggedIn, grantAccess('readOwn', 'profile'), async (req, res) => {
//         try {
//             const permission = res.locals.permission;
//             const user = await User.findById(req.user._id);
//             if (!user) return res.status(400).json({ message: 'User not found' });

//             res.status(200).json(permission.filter(user._doc));
//         } catch (error) {
//             return res.status(400).send(error);
//         }
//     })




exports.userget = async (req, res) => {

    const search = req.query.search || ""
    const sort = req.query.sort || ""
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 4;


    const query = {
        fullname: { $regex: search, $options: "i" }
    }

    if (hobbies !== "All") {
        query.hobbies = hobbies
    }


    try {

        const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 4 = 4

        const count = await users.countDocuments(query);

        const usersdata = await users.find(query)
            .sort({ datecreated: sort == "new" ? -1 : 1 })
            .limit(ITEM_PER_PAGE)
            .skip(skip);

        const pageCount = Math.ceil(count / ITEM_PER_PAGE);  // 8 /4 = 2

        res.status(200).json({
            Pagination: {
                count, pageCount
            },
            usersdata
        })
    } catch (error) {
        res.status(401).json(error)
    }
}

// single user get
exports.singleuserget = async (req, res) => {

    const { id } = req.params;

    try {
        const userdata = await users.findOne({ _id: id });
        res.status(200).json(userdata)
    } catch (error) {
        res.status(401).json(error)
    }
}

// user edit
exports.useredit = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, mobile, hobbies } = req.body;
    const file = req.file ? req.file.filename : user_profile

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            fullname, email, mobile, hobbies, dateUpdated
        }, {
            new: true
        });

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete user
exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletuser = await users.findByIdAndDelete({ _id: id });
        res.status(200).json(deletuser);
    } catch (error) {
        res.status(401).json(error)
    }
}
