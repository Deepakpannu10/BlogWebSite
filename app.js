//jshint esversion:6

const express = require("express");
// const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const DB = "mongodb+srv://blogDbAdmin:blogdbpassword@blogdb.5hje2.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(function (conn) {
    console.log("DB connected");
  });

const postSchema = {
  postTitle: String,
  postContent: String
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  // console.log( posts );
  Post.find({}, function (err, result) {
    if (err) {
      console.log("Some error occ");
    }
    else {
      res.render("home", { headingContent: homeStartingContent, posts: result });
    }
    // res.render('list', { listTitle: "Today", items: result });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { headingContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { headingContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {

  var currPost = new Post({
    postTitle: req.body.composeTitle,
    postContent: req.body.composeText
  });

  currPost.save();
  res.redirect("/");
});

app.get("/posts/:postID", function (req, res) {
  let requestedTitleID = "" + req.params.postID;
  // console.log(requestedTitleID);

  Post.find({ "_id": requestedTitleID }, function (err, result) {
    if (err || result.length === 0) {
      console.log(err);
      res.render("error");
    }else{
      // console.log(result);
      res.render("post", { post: result[0] });
    }
  });

});

// console.log( "A,,nc,amsd-".toLocaleLowerCase() );
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
