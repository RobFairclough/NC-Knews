import React, { Component } from 'react';
import '../css//QueryBar.css';
class QueryBar extends Component {
  state = {
    limit: 10,
    sort_by: 'created_at',
    order: 'desc',
    p: this.props.p
  };
  handleSetLimit = ({ target: { value } }) => {
    if (
      !value.match(/[a-z]/gi) &&
      ((value >= 0 && value <= 1000) || value === '')
    )
      this.setState({ limit: value });
  };
  handleSetQuery = ({ target: { value } }, criteria) => {
    this.setState({ [criteria]: value });
  };

  sendQueries = () => {
    const { applyQueries } = this.props;
    const { limit, sort_by, order } = this.state;
    const { p } = this.props;
    const validQueries = Object.entries({ limit, sort_by, order, p })
      .filter(query => query[1])
      .map(query => query.join('='));
    console.log(validQueries);
    applyQueries(validQueries);
  };
  render() {
    const { limit } = this.state;
    return (
      <div className="query-container">
        <div>
          <label>Limit: </label>
          <input type="number" onChange={this.handleSetLimit} value={limit} />
        </div>
        <div>
          <label>Sort by</label>
          <select onChange={e => this.handleSetQuery(e, 'sort_by')}>
            <option>title</option>
            <option>votes</option>
            <option>username</option>
            <option value="created_at">date</option>
          </select>
        </div>
        <div>
          <label>Ascending</label>
          <input
            onClick={e => this.handleSetQuery(e, 'order')}
            type="radio"
            name="order"
            value="asc"
          />
          <label>Descending</label>
          <input
            onClick={e => this.handleSetQuery(e, 'order')}
            type="radio"
            name="order"
            value="desc"
          />
        </div>
        <button onClick={this.sendQueries}>Apply queries</button>
      </div>
    );
  }
}

export default QueryBar;
