'use strict';

const base64 = require('base-64');
const { users } = require('../../models-connections');

module.exports = async (req, res, next) => {
  // console.log("hhhhhhhhh");
  console.log("ddddddddddd",req.headers.authorization);
   if (!req.headers.authorization) {
    // console.log("hhhhhhhhh");
    next()
     return "mm";
     }

  let basic = req.headers.authorization.split(' ').pop();
  // console.log({basic});
  // let encodedBasic=basic.pop();
  // console.log({encodedBasic});
  // let decodedValue = base64.decode(encodedBasic);
  // console.log({decodedValue});
  let [displayName, pass] =base64.decode(basic).split(':');
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',displayName,pass);
  try {
    // if(req.header===null){
    //   next('no usernama and password');
    // }
    // req.user = await users.authenticateBasic(displayName, pass).then((x)=>{
      // console.log({x});

    req.user=await users.authenticateBasic(displayName, pass);
      // console.log('????????????',req.user);
      next();
    // })
    // .catch((e) => {
    //   // console.error(e);
    //   res.status(403).send('Invalid Login');
    // });

  } catch (e) {
    // console.error(e);
    res.status(403).send('Invalid Login');
    // next('Invalid Login')
  }

}

