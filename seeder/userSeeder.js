const bcrypt = require("bcryptjs");
const Users = require("../src/models/user");

module.exports = async () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);

    const userCount = await Users.countDocuments({ is_admin: true });

    if (userCount === 0) {
        const userData = {
            user_name: "Admin",
            email: "admin@admin.com",
            profile_image: "admin.jpg",
            is_admin: true,
            password: await bcrypt.hash("123456", 10),
        };

        const user = await new Users(userData).save();
    }
};
