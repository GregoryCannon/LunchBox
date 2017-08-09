var controller = require('./poll.js');

// A ludicrously long test method to confirm that all the methods above work
const test = () => {
  controller.deleteAllPolls(function(err, val){
    console.log('\n\n =======DELETE ALL=======');
    if (err) console.log('delete err: ', err);
    else console.log('---delete val: ', val);

    const pollData = {
      pollName: 'test',
      options: [
        { optionName: 'abc' },
        { optionName: '123' }
      ],
      endTime: Date.now()
    };

    controller.createPoll(pollData, function(err, val){
      console.log('\n\n =======CREATE======');
      console.log('---create val: ', val);
      if (err) console.log('---create err: ', err);

      const pollId = val._id;
      const submitData = {
        voterName: 'greg',
        options: [
          { optionName: 'abc', vote: 'up' }
        ]
      }
      controller.submitVotes(pollId, submitData, function(err, val){
        console.log('\n\n =======SUBMIT 1======');
        console.log('---submit val: ', val);
        console.log('---abc voters: ', val.options[0].voters);
        console.log('---123 voters: ', val.options[1].voters);
        if (err) console.log('---submit err: ', err);

        const pollId = val._id;
        const submitData = {
          voterName: 'greg',
          options: [
            { optionName: '123', vote: 'down' }
          ]
        }
        controller.submitVotes(pollId, submitData, function(err, val){
          console.log('\n\n =======SUBMIT 2======');
          console.log('---submit val: ', val);
          console.log('---abc voters: ', val.options[0].voters);
          console.log('---123 voters: ', val.options[1].voters);
          console.log('---submit err: ', err);

          controller.closePoll(pollId, function(err, val){
            console.log('\n\n =======CLOSE=======');
            if (err) console.log('---close err: ', err);
            else console.log('---close val: ', val);

            controller.getPoll(pollId, function(err, val){
              console.log('\n\n =======GET=======');
              if (err) console.log('---get err: ', err);
              else console.log('---get val: ', val);

              controller.deletePoll(pollId, function(err, val){
                console.log('\n\n =======DELETE=======');
                if (err) console.log('---delete err: ', err);
                else console.log('---delete val: ', val);

                controller.getAllPolls(function(err, val){
                  console.log('\n\n =======GET ALL=======');
                  if (err) console.log('---getall err: ', err);
                  else console.log('---getall val: ', val);
                })
              })
            })
          })
        })
      })
    });
  })
}

module.exports = test;
