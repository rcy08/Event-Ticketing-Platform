const googleUser = require('../models/googleuser');
const User = require('../models/user');

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

const googleUserSignin = async (req, res) => {

    const { userObject, token, clientid } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientid,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    console.log(userid);
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    if(!userid) return res.status(404).json({ error: 'Invalid user' });

    const user = await googleUser.findOne({ email: userObject.email });
    
    var dateWithTime = new Date().toLocaleString().replace(",", "");

    if(!user){
        return res.status(404).json({ error: 'Please signup with Google first' });
    }
    else{
        user.name = userObject.name;
        user.picture = userObject.picture;
        user.logs.push(dateWithTime);

        await user.save();
    }
    
    res.status(201).json({ 
        message : 'Signed In Successfully',
        user 
    });  
};

// googleUserSignin().catch(console.error);

const googleUserSignup = async (req, res) => {

    const { userObject, token, clientid } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientid,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    console.log(userid);
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    if(!userid) return res.status(404).json({ error: 'Invalid user' });

    const user = await googleUser.findOne({ email: userObject.email });

    if(user){
        return res.status(400).json({ error: 'This account is already registered. Please signin now' });
    }

    let username = userObject.name;

    const emailUser = await User.findOne({ email: userObject.email });

    if(emailUser) username = emailUser.username;

    console.log(username);
    
    await googleUser.create({ email: userObject.email, name : userObject.name, username, picture: userObject.picture, logs: [] });

    res.status(201).json({ 
        message : 'Signed Up Successfully' 
    });  
    
}

// googleUserSignup().catch(console.error);

module.exports = { googleUserSignin, googleUserSignup };