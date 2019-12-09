
const jwt = require("jsonwebtoken");
const secret = require('../config/jwtConfig');
const bcrypt = require('bcrypt');

const signinCust = (req, res,kafka) => {

   const { email, pass, type } = req.body;

   kafka.make_request('signinCust',req.body, function(err,cust){
    if(err){
        res.send("error");
    }
    else{
        console.log('Here success, customer email matched!'+cust)
        if (cust.length > 0) {
            bcrypt.compare(pass, cust[0].cust_hash, function (err, status) {
                if (status) {
                    console.log('Login Success!')
                    // res.cookie('cust_id', String(cust[0]._id), { maxAge: 900000, httpOnly: false, path: '/' });
                    // res.cookie('cust_email', cust[0].cust_email, { maxAge: 900000, httpOnly: false, path: '/' });
                    // res.cookie('cust_fname', cust[0].cust_fname, { maxAge: 900000, httpOnly: false, path: '/' });
                    // res.cookie('cust_lname', cust[0].cust_lname, { maxAge: 900000, httpOnly: false, path: '/' });

                    console.log('Customer id value',typeof String(cust[0]._id))
                    const response = cust[0];

                    response.type = 'customer';
                    const payload = { ...response };
                    console.log('Response isdfdfdfd', response);
                    console.log('Secret isxfdfdfdfdf', secret.secret);
                    jwt.sign(
                        payload,
                        secret.secret,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            console.log('Token sdsds', token);
                            // res.end(JSON.stringify(response));
                            res.json({
                                success: true,
                                token: 'jwt '+token,
                                ...response
                            });
                        }
                    );



                }

                else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });

                    res.end(JSON.stringify({ status: "failure" }));
                }
            });


        }

        else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({ status: "failure" }));
        }
    }
})
   
}


module.exports = {
    signinCust: signinCust
};