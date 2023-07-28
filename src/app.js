const express = require("express");
const fs = require("fs");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();

app.use(cors());

const PORT = 5001;
//connection string
const mongodbURI = "mongodb://localhost:27017/lec";
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  fullname: String,
  title: String,
  skills: [{ type: String }],
  address: String,
  job_type: String,
  id: Number,
  is_active: Boolean,
  follower: [{ type: String }],
  following: [{ type: String }],
});

const User = mongoose.model("user", userSchema);

User.createCollection()
  .then((col) => {
    console.log("Collection", col, "created");
  })

  .catch((err) => {
    console.log(err);
  });

User.create({
  email: "test@test.com",
  username: "sarad",
  fullname: "Sarad Shrestha",
  title: "Software Developer",
  skills: ["JS", "PHP", "JAVA"],
  address: "Kathmandu,Nepal",
  job_type: "Full Time",
  id: 1,
  is_active: true,
  follower: ["username123", "usernamme234", "username543", "user555"],
  following: ["username123", "usernamme234", "username543", "user555"],
}).then(() => {
  console.log("User created");
});

//for post
const mongodbURIposts = "mongodb://localhost:27017/lec";
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const userSchemaposts = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  job_type: String,
  pay_rate_per_hr_dollar: Number,
  skills: [{ type: String }],
  liked_by: [{ type: String }],
  viewed_by: [{ type: String }],
  id: Number,
  user_id: Number,
  post_by_username: String,
  post_by_fullname: String,
  post_date: Number,
  comments: [{ type: String }],
});

const posts = mongoose.model("posts", userSchema);

User.createCollection()
  .then((col) => {
    console.log("Collection", col, "created");
  })

  .catch((err) => {
    console.log(err);
  });

User.create(
  {
    title: "PHP Developer Required",
    description: "For a client project PHP Developer is required",
    location: "Kathmandu",
    job_type: "Full Time",
    pay_rate_per_hr_dollar: 10.0,
    skills: ["PHP", "JS", "HTML"],
    liked_by: ["test111", "test1", "test123"],
    viewed_by: ["test111", "test1", "test123"],
    id: 2,
    user_id: 1,
    post_by_username: "test123",
    post_by_fullname: "Test User",
    post_date: "2023-06-10T09:24:07.659034",
    comments: [],
  },
  {
    title: "Js Developer Required",
    description: "For a client project PHP Developer is required",
    location: "Lalitpur",
    job_type: "Full Time",
    pay_rate_per_hr_dollar: 10.0,
    skills: ["PHP", "JS", "HTML"],
    liked_by: ["test111", "test1", "test123"],
    viewed_by: ["test111", "test1", "test123"],
    id: 3,
    user_id: 2,
    post_by_username: "test321",
    post_by_fullname: "Test User2",
    post_date: "2023-06-10T21:51:10.643105",
    comments: [],
  },
  {
    title: "Wordpress Developer Required",
    description: "For a client project PHP Developer is required",
    location: "Bhaktapur",
    job_type: "Full Time",
    pay_rate_per_hr_dollar: 10.0,
    skills: ["PHP", "JS", "HTML"],
    liked_by: ["test111", "test1", "test123"],
    viewed_by: ["test111", "test1", "test123"],
    id: 4,
    user_id: 3,
    post_by_username: "test111",
    post_by_fullname: "Test User2",
    post_date: "2023-06-10T21:53:40.698655",
    comments: [],
  }
).then(() => {
  console.log("User created");
});

//http://localhost:5000 or  http://localhost:5000/
app.get("/", (req, res) => {
  res.status(200).send("This is response from BE");
});
//read file and send content pf file as response
app.get("/api/v1/posts", (req, res) => {
  const posts = fs.readFileSync("./data/posts.json", "utf-8").toString();
  res.status(200).send(posts);
});
//send and read data of user.json
app.get("/api/v1/user", (req, res) => {
  const user = fs.readFileSync("./data/user.json", "utf-8").toString();
  res.status(200).send(user);
});

app.listen(PORT, () => {
  console.log("App is running on port" + PORT);
});
