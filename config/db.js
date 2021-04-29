let localURI = "mongodb://localhost/blog";
let remoteURI =
  "mongodb+srv://altons:Toronto4@cluster0.hl2tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let sessionSecret = "secret";

module.exports = {
  Path: remoteURI,
  Secret: sessionSecret,
};
