function testAll() {
  // execute toutes les fonctions sontdas la liste des tests
  tests.forEach((f) => {
    f.call();
  });
}

function testStatement(statementString) {
  // statementString is expected to be true !
  if (!eval(statementString)) throw new Error(statementString + " IS FALSE !");
}

let tests = [];

function testtest() {
  console.log("test des test");
}
tests.push(testtest);

function test_userNbQuiz() {
  testStatement(`user.nbQuizAborted + user.nbQuizGameover + user.nbQuizFinished ==
    user.nbQuizStarted`);
}
tests.push(test_userNbQuiz);
