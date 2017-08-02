var React = require('react');

class Poll extends React.Component{
  render() {
    return (
      <div>
        <form>
        <input placeholder="location"></input>
        </form>
        <span>Sort by</span>
        <select>
          <option value="">Highest Rating</option>
          <option value="">Distance</option>
          <option value="">Price</option>
          <option value="">New</option>
        </select>
        <div>
          <span>Tender Greens</span>
          <span>American</span>
        </div>
      </div>
    );
  }
}

module.exports = Poll;
