// Import all required modules
const { env } = require("./utils/envconfig.js");

const express = require("express");

const session = require("express-session");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const JWT_SECRET = env.JWT_SECRET;
const demographics = require("./demographics.js");
const questionaire = require("./Questionnare.js");
const Personality = require("./Personality.js");

// EMAIL CREDENTIALS
const EMAIL_USER = env.EMAIL_USER || "nobita9699@gmail.com";
const EMAIL_PASS = env.EMAIL_PASS || "dmkaqzjwoqnxjfcs";
const EMAIL_SERVICE = env.EMAIL_SERVICE || "gmail";

// SESSION SECRET
const SESSION_SECRET = env.SESSION_SECRET;

const allowedOrigins = [
  "http://174.138.124.162",
  "http://your-other-domain.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Initialize Express app
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  console.log("Request Type:", req.method);
  console.log("Request Headers:", req.headers);
  next();
});

app.get("/demographics/:email", async (req, res) => {
  try {
    const udemo = await demographics
      .findOne({ email: req.params.email })
      .sort({ _id: -1 })
      .limit(1);

    if (!udemo) {
      return res
        .status(404)
        .json({ message: "No demo data found for this email" });
    }

    res.status(200).json(udemo);
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error });
  }
});

app.get("/Personality/:email", async (req, res) => {
  try {
    const uPersonality = await Personality.findOne({ email: req.params.email })
      .sort({ _id: -1 })
      .limit(1);

    if (!uPersonality) {
      return res
        .status(404)
        .json({ message: "No personality data found for this email" });
    }

    res.status(200).json(uPersonality);
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error });
  }
});

// Import the Demographics schema at the top of the server code

app.post("/change-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.json({
        status: "error",
        message: "Old password is incorrect",
      });
    }

    if (newPassword === oldPassword) {
      return res.json({
        status: "error",
        message: "New password must be different from old password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({ status: "ok", message: "Password changed successfully" });
  } catch (error) {
    res.json({ status: "error", error: "An error occurred" });
  }
});

app.get("/questionaire/:email", async (req, res) => {
  try {
    const userQuestionnaire = await questionaire
      .findOne({ email: req.params.email })
      .sort({ _id: -1 })
      .limit(1);

    if (!userQuestionnaire) {
      return res
        .status(404)
        .json({ message: "No questionnaire data found for this email" });
    }

    res.status(200).json(userQuestionnaire);
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error });
  }
});

app.post("/demographics", async (req, res) => {
  const {
    email,
    fullName,
    international_student,
    age_range,
    transferred_from,
    gender,
    first_gen_student,
    ethnicity,
  } = req.body;

  try {
    await demographics.findOneAndUpdate(
      { email }, // Search for the document with the specified email
      {
        email,
        fullName,
        international_student,
        age_range,
        transferred_from,
        gender,
        first_gen_student,
        ethnicity,
      },
      { upsert: true } // Create a new document if it doesn't exist
    );

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", error });
  }
});

app.post("/Personality", async (req, res) => {
  const { personalityScore, email, fullName } = req.body;

  try {
    await Personality.findOneAndUpdate(
      { email }, // Search for the document with the specified email
      {
        personalityScore,
        email,
        fullName,
      },
      { upsert: true } // Create a new document if it doesn't exist
    );

    res.send({ status: "ok" });
    console.log(req.body);
  } catch (error) {
    res.send({ status: "error", error });
  }
});

app.post("/questionaire", async (req, res) => {
  const {
    email,
    fullName,
    gpa,
    credits,
    satScore,
    course,
    career,
    interest,
    experience,
    familyGuide,
    personalityScore,
    scholarship,
    income,
    proximity,
    workStatus,
  } = req.body;

  try {
    await questionaire.findOneAndUpdate(
      { email }, // Search for the document with the specified email
      {
        email,
        fullName,
        gpa,
        credits,
        satScore,
        course,
        career,
        interest,
        experience,
        familyGuide,
        personalityScore,
        scholarship,
        income,
        proximity,
        workStatus,
      },
      { upsert: true } // Create a new document if it doesn't exist
    );

    res.send({ status: "ok" });
    console.log(req.body);
  } catch (error) {
    res.send({ status: "error", error });
  }
});

const mongoUrl =
  env.MONGO_URL ||
  "mongodb+srv://nobita9699:xgFi1COLriKTuji7@cluster0.uh0srwc.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connected to database at ${mongoUrl}`);
  })
  .catch((e) => console.log(e));

require("./userDetails.js");
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./modelinfo.js");

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./modelresponses.js");

const User = mongoose.model("UserInfo");
// const ModelsInfo = mongoose.model("ModelInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// const YourModel = mongoose.model('ModelInfo', modelhistoryScehma);
const Models = mongoose.model("ModelInfo");
app.post("/modelhistory", async (req, res) => {
  try {
    const { mname, dt } = req.body;
    const newEntry = new Models({ mname, dt });
    await newEntry.save();
    res.status(201).send("Data inserted successfully");
  } catch (error) {
    res.status(500).send("Error inserting data");
  }
});

const Models1 = mongoose.model("ModelResponses");
// app.post('/modelResponses', async (req, res) => {
//     try {
//         const { email, mresult } = req.body;
//         const newEntry = new Models1({ email, mresult});
//         await newEntry.save();
//         res.status(201).send('Data inserted successfully');
//       } catch (error) {
//         res.status(500).send('Error inserting data');
//       }
//     });

app.post("/modelResponses", async (req, res) => {
  try {
    const { email, mresult } = req.body;

    // Check if the email already exists in the database
    const existingEntry = await Models1.findOne({ email });

    if (existingEntry) {
      // If the email exists, update the existing record
      await Models1.updateOne({ email }, { mresult });
      res.status(200).send("Data updated successfully");
    } else {
      // If the email does not exist, create a new entry
      const newEntry = new Models1({ email, mresult });
      await newEntry.save();
      res.status(201).send("Data inserted successfully");
    }
  } catch (error) {
    res.status(500).send("Error inserting/updating data");
  }
});

app.get("/modelResponses/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // Find the entry in the database based on the provided email
    const entry = await Models1.findOne({ email });

    if (entry) {
      // If the entry is found, return the mresult
      res.status(200).json({ mresult: entry.mresult });
    } else {
      // If the email is not found, return a 404 status
      res.status(404).json({ error: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// app.get('/all-emails', async (req, res) => {
//     try {
//         const users = await User.find({}, 'email'); // Fetch only the email field for all users
//         const emails = users.map(user => user.email);
//         res.status(200).json(emails);
//     } catch (error) {
//         res.status(500).json({ message: "Error occurred", error });
//     }
// });

app.get("/user-emails", async (req, res) => {
  try {
    const users = await User.find({ userType: "User" }, "email"); // Fetch only the email field for users with userType 'User'
    const emails = users.map((user) => user.email);
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: "Error occurred", error });
  }
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
// TODO PORT and IP
const PORT = env.PORT || 5000;
const HOST = env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

app.post("/ForgotPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: env.JWT_EXPIRE,
    });
    const link = `${env.BASE_URL}/reset-password/${oldUser._id}/${token}`;
    let transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "ACOSUS Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    //console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    //res.json({status:"Passowrd Updated"});
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.post("/Page1", async (req, res) => {
  const { token, fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

// Login endpoint
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "User Not Found Please Register" });
    }

    if (await bcrypt.compare(password, user.password)) {
      req.session.user = { email: user.email };

      const token = jwt.sign({ email: user.email }, JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      }); // Expires in 1 day
      res.cookie("userEmail", user.email, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("userRole", user.userType, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({ status: "ok", data: { token, user } });
    }

    res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    res.json({ status: "error", error: "An error occurred" });
  }
});

// Logout endpoint
app.post("/logout", (req, res) => {
  // Destroy the entire session, including the user property
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "error", error: "Failed to destroy session" });
    }

    res.cookie("token", "", { expires: new Date(0) });
    res.cookie("userEmail", "", { expires: new Date(0) });
    res.cookie("userRole", "", { expires: new Date(0) });

    // console.log('User session destroyed (Logged out)');
    res.json({ status: "ok", message: "Logout successful" });
  });
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({ userType: "User" });
    // const allUser = await User.find({});
    console.log(allUser);
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.get("/AllUser", async (req, res) => {
  try {
    // const allUser = await User.find({ userType: 'User' });
    const allUser = await User.find({});
    console.log(allUser);
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.get("/getModelHistory", async (req, res) => {
  try {
    const modeldata = await Models.find({});
    console.log(modeldata);
    res.send({ status: "ok", data: modeldata });
  } catch (error) {
    console.log(error);
  }
});

// app.post("/deleteUser", async (req, res) => {
//     const { userid } = req.body;
//     try {
//         User.deleteOne({ _id: userid }, function ( res) {
//             console.log(res);
//         });
//         res.send({ status: "Ok", data: "Deleted" });
//     } catch (error) {
//         console.log(error);
//     }
// });

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    await User.deleteOne({ _id: userid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", data: "Failed to delete" });
  }
});
app.post("/deleteModel", async (req, res) => {
  const { mname } = req.body;
  try {
    await Models.deleteOne({ _id: mname });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", data: "Failed to delete" });
  }
});

// root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the ACOSUS server");
});
