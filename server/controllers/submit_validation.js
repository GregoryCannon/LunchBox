/*
  DESIRED FORMAT:
  {
    voterName: 'Tessa',
    votes: {
      123: 'veto',
      abc: 'up'
    }
  }
*/

const validateSubmitData = (data) => {
  const _err = (msg) => { return { message: msg }};

  // Check the two top level properties, .voterName and .vote
  if (!data.voterName){
    _err('missing voter name');
  }
  if (typeof data.voterName !== 'string'){
    _err('invalid voter name');
  }
  if (!data.votes){
    _err('missing votes object')
  }
  if (typeof data.votes !== 'object'){
    _err('invalid votes object')
  }

  // Check the individual votes
  const keys = Object.keys(data.votes);
  if (!keys || keys.length == 0){
    _err('votes object has no keys')
  }
  keys.forEach((key) => {
    if (!['up', 'down', 'veto'].includes(data.votes[key])){
      _err(`invalid vote for yelpId ${key}`)
    }
  });

  return null;
}

module.exports = validateSubmitData;
