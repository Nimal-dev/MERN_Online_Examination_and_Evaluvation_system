// Importing required models
const authmodels = require('../Models/AuthModel');
const teachermodels = require('../Models/TeacherModel');
const usermodels = require('../Models/UserModel');
const studentmodels = require('../Models/StudentModel');


// Creating instances of models
const userModel = usermodels.user;
const teacherModel = teachermodels.teacher;
const authModel = authmodels.auth;
const studentModel = studentmodels.student;


// Importing bcrypt library for password encryption
const bcrypt = require('bcrypt');


// -------------------------------Authentication ------------------------------//

exports.SignUp = async (req, res) => {
  try {
    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Creating an auth object with email, hashed password, and usertype
    const authparam = {
      email: req.body.email,
      password: hashedPassword,
      usertype: req.body.usertype,
    };

    // Creating a new auth document in the database
    const auth = await authModel.create(authparam);

    // ----------------------------User----------------------------------//
    // Creating a user object with firstname, lastname, contact, address, and authid
    const teacherparam = {
      teacherName:req.body.teacherName,
      subject:req.body.subject,
      contact:req.body.contact,
      address:req.body.address,
      authid: auth._id,  // linking the user to the auth document
    };

    // Creating a new user document in the database
    await teacherModel.create(teacherparam);
    
    res.json('success');      // Sending a success response
  } catch (error) {
    // Catching and logging any errors that occur
    console.error("Error Occurred:", error);
    // Sending a 500 error response with an error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the auth document based on email
        const authenticate = await authModel.findOne({ email });

        if (authenticate) {
            // Check if password matches
            const isPasswordValid = await bcrypt.compare(password, authenticate.password);
            if (isPasswordValid) {
                let user;
                if (authenticate.usertype === 1) { // Teacher Authenticate
                    user = await teacherModel.findOne({ authid: authenticate._id }).populate('authid');
                } else if(authenticate.usertype === 2){    //Student Authenticate
                    user = await studentModel.findOne({ authid: authenticate._id }).populate('authid');
                }
                
                else {
                     // Admin user
                    user = await userModel.findOne({ authid: authenticate._id }).populate('authid');
                }

                if (user) {
                    // Set session with user details
                    req.session.user = user; 
                    // Return user
                    res.json(user);
                } else {
                    // User not found
                    res.status(404).json("User not found");
                }
            } else {
                // Invalid password
                res.status(401).json("Invalid password");
            }
        } else {
            // Invalid email
            res.status(404).json("Invalid email");
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


