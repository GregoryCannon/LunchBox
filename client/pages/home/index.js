var React = require('react');

class Homepage extends React.Component{
  render() {
    return (
      <center>
        <div>
          <center><h3>You are joining Sigas Lunch Poll Dude</h3></center>
          <img src="app/images/check.ico" width="50px"/>
          <form>
            <input placeholder="enter your name"/>
            <button>Join</button>
            <p><font color="red">This name is already used, please enter a different name</font></p>
            <button>That was me, I want to edit my votes</button>
          </form>
        </div>
      </center>
      );
  }
}

module.exports = Homepage;
