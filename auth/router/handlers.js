'use strict';

const {
  users
} = require('../../models-connections');
console.log("Ddddddddddd", users)
const {
  signupUsers
} = require('../../models-connections');
const {
  verifySignUp
} = require('../../models-connections');
const {
  signInUsers
} = require('../../models-connections');
const {
  v4: uuidv4
} = require('uuid');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const random = require('random')
const passport = require("passport");

// console.log(random.float((min = 0), (max = 1)));
async function handleSignup(req, res, next) {
  console.log("hhh");
  // empty displayName/pssword 400
  // displayName already used 409
  try {
    const user = req.body
    if (Object.keys(user).length === 0) {}
    let x = user.displayName;
    // console.log({
    //   x
    // });
    if (x.length === 0) {
      res.status(403).send('no data entered')
    }
    let UuCode = uuidv4();
    console.log({
      UuCode
    });
    var hashed = await users.beforeCreate(user);
    let userRecord = await users.create({
      displayName: req.body.displayName,
      email: req.body.email,
      password: hashed,
      role: req.body.role,
      uuCode: UuCode
    });

    let mailed = await users.sendEmail(user);
    const output = {
      displayName: userRecord.displayName,
      email: userRecord.email,
      isVerify: userRecord.isVerify,
      role: userRecord.role,
      createdAt: userRecord.createdAt,
      updatedAt: userRecord.updatedAt
    };
    if (output) {
      let logs = await signupUsers.create({
        title: `user ${output.displayName} signup`,
        name: output.displayName,
        date: new Date().toJSON()
      })
      // console.log({logs})
    }

    console.log(output.displayName);
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
const CLIENT_URL = "https://salehziad-projects.netlify.app/";
async function handleSignin(req, res, next) {
  // console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuu',req.user);
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    let x = req.user.isVerify;
    if (x === true) {
      // console.log("yesssssss");
      // res.redirect('http://localhost:5000/auth/login/success'+user)
      // passport.authenticate("google", {
      //   successRedirect: CLIENT_URL,
      //   failureRedirect: "/login/failed",
      // })
      
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        let logs = await signInUsers.create({
          title: `user ${user.user.displayName} logged in `,
          name: user.user.displayName,
          email:user.user.email,
          role:user.user.role,
          date: new Date().toJSON()
        })
        console.log({logs})
      res.status(200).json(user);
    } else {
      res.send('email did not verified please check your email')
    }

  } catch (e) {
    // console.error(e);
    next(e);
  }
}


async function handleDeleteAccount(req, res, next) {
  try {
    let id = req.params.id - '';
    console.log({
      id
    });
    let tokenId = req.user.id
    if (tokenId === id) {
      let deletedUser = await users.destroy({
        where: {
          id: id
        }
      });
      // let x=await users.findAll();
      res.send('account deleted')
      next();
    } else {
      next('you have entered valid id')
    }
  } catch (e) {
    console.log(e);
  }
}
async function handleDeleteAnyUser(req, res, next) {
  try {
    let id = req.params.id - ''; // params id
    console.log({
      id
    });
    let deletedUser = await users.destroy({
      where: {
        id: id
      }
    });
    // let x=await users.findAll();
    res.send('account deleted')
    next();
  } catch (e) {
    console.log(e);
  }
}

async function verifyCode(req, res, next) {
  console.log("verify.................");
  try {
    let code = req.body.code;
    // console.log('verify',code);
    let user = await users.findOne({
      where: {
        uuCode: code
      }
    });
    console.log({
      user
    });
    let y = user.isVerify;
    console.log({
      y
    });
    let usercode = user.uuCode;
    // console.log(usercode);
    if (code === usercode) {
      console.log('ggggggggggggggggggg');
      // user.isVerify=true;
      let newUser = await user.update({
        isVerify: true
      })
      let h = newUser.displayName
      // console.log({h})
      if (newUser) {
        let logs = await verifySignUp.create({
          title: `user ${newUser.displayName} veified`,
          name: newUser.displayName,
          date: new Date().toJSON()
        })
        // console.log({logs});
        res.send(newUser)
        // res.redirect('http://localhost:5000/auth/login/success')
        next();
      }
    }
  } catch (e) {
    console.log(e);
  }

}
async function editAccount(req, res, next) {

  let tokenId = req.user.id
  // console.log("tokenId iiiiiii",tokenId);
  try {
    let ID = parseInt(req.params.id);

    // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiii",ID);
    const displayName = req.body.displayName;
    const found = await users.findOne({
      where: {
        id: ID
      }
    })


    if (found) {

      if (tokenId === ID) { // To change the displayName
        let updates = await found.update({
          displayName: displayName
        })
        res.status(201).send({
          "status": 'Update displayName successfully!',
          "displayName updated to": updates.displayName
        })
        next()


      } else if (req.body.password) { // to change the password
        const password = await bcrypt.hash(req.body.password, 10);
        let updates = await found.update({
          password: password
        })
        res.status(201).send({
          "status": 'Update password successfully!'
        })

        next()
      }
    } else {
      res.status(500).send('Please enter your id !')
    }
  } catch (e) {
    res.status(500).send("error update")
  }

}
// 7b3a21de-121a-44e1-83f4-8e89e530b09e
// 7b3a21de-121a-44e1-83f4-8e89e530b09e
module.exports = {
  handleSignup,
  handleSignin,
  // handleGetUsers,
  handleDeleteAccount,
  handleDeleteAnyUser,
  verifyCode,
  editAccount
}