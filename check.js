var git = require("nodegit");

var curses = ["shit", "ass", "template"];
var path = "/mnt/c/devel/cms";
var branch = "master";
var reCurse = new RegExp("\\b(?:" + curses.join("|") + ")\\b", "gi");

// Default path is `.git`.
if (process.argv.length < 3) {
  console.log("No path passed as argument, defaulting to .git.");
}
// Otherwise defaults.
else {
  path = process.argv[2];

  // Set repo branch
  if (process.argv.length < 4) {
    console.log("No branch passed as argument, defaulting to master.");
  }
  else {
    branch = process.argv[3];
  }
}

// Open repository.
git.Repository.open(path)
.then(function(repo) {
  // Open branch, default to master.
  return repo.getBranchCommit(branch);
}).then(function(firstCommit) {
  // Iterate history
  var history = firstCommit.history();

  // Iterate over every commit message and test for words.
  history.on("commit", function(commit) {
    var message = commit.message();

    if (reCurse.test(message)) {
      console.log("Curse detected in commit", commit.sha());
      console.log("=> ", message);
      return;
    }
  });

  // Start history iteration.
  history.start();
});