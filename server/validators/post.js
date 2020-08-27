const{check,validationResult, validationErrors}= require('express-validator');
exports.createPostValidator = (req, res, next) => {
    // title
    let {title,body} = req.body
    check('title', 'Write a title').notEmpty();
    check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    });
    // body
    check('body', 'Write a body').notEmpty();
    check('body', 'Body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    });
    // check for errors

    const errors = validationResult(req);
    
    // if error show the first one as they happen
    
    if (!errors) {
        // console.log(errors);
         const firstError = errors.map(error => error.msg)[0];
        return res.json({ errors });
    }
    // proceed to next middleware
    next();
      
};

exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check('name', 'Name is required').notEmpty();
    // email is not null, valid and normalized
    req.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    // check for errors
    const errors = validationErrors(req);
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};


// exports.userSignupValidator = (req, res, next) => {
//     // name is not null and between 4-10 characters
//     check('name', 'Name is required').notEmpty();
//     // email is not null, valid and normalized
//     check('email', 'Email must be between 3 to 32 characters')
//         .matches(/.+\@.+\..+/)
//         .withMessage('Email must contain @')
//         .isLength({
//             min: 4,
//             max: 2000
//         });
//     // check for password
//     check('password', 'Password is required').notEmpty();
//     check('password')
//         .isLength({ min: 6 })
//         .withMessage('Password must contain at least 6 characters')
//         .matches(/\d/)
//         .withMessage('Password must contain a number');
//     // check for errors
//     const errors = check();
//     // if error show the first one as they happen
//     if (errors) {
//         const firstError = errors.map(error => error.msg)[0];
//         return res.status(400).json({ error: firstError });
//     }
//     //proceed to next middleware
//     next();
// };



exports.userSigninValidator = (request, response, next) => {
    request
        .check('email', 'Email must be between 3 to 32 characters')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('Please type your valid email address')
        .isLength({
            min: 4,
            max: 32
        });
    request.check('password', 'Invalid Social Login Token!').notEmpty();
    request
        .check('password')
        .isLength({ min: 6 })
        .withMessage('Your social login token is invalid!');
    const errors = validationErrors(request);
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check('newPassword', 'Password is required').notEmpty();
    req.check('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 chars long')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('must contain a number')
        .withMessage('Password must contain a number');

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};





// exports.createPostValidator = (req, res, next) => {


//     //title
//     req.check("title","write title").notempty();
//     req.check("title",'title must be between 4 and 150 characters').islength({
//         min:4,
//         max:150
//     });

    
//     //body
//     req.check("body","write body").notempty();
//     req.check("body","body must be between 4 and 2000 characters").islength({
//         min:4,
//         max:2000
//     });

//     //validation
//     const errors = req.validationErrors()

//     //if the first error happen show it as it is
//     if(errors){
//     const firstError = errors.map((error) => error.msg)[0]
//     return res.status(400).json({error: firstError})
//     }

//     //proceed to next middleware
//     next();
// };