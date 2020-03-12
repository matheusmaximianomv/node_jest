const User = require('../models/User');

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email
            }
        });

        if(!user) {
            return res.status(401).json({ error: 'Email or password invalid.' });
        }

        if(! (await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Email or password invalid.' });
        }

        return res.status(200).json({ user, token: user.generateToken() });
    }
}

module.exports = new SessionController();