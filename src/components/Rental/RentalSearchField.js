import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class RentalSearchField extends Component {
  constructor() {
    super();
    this.state = {
      searchField: '',
      searchField2: ''
    };
    this.searchField = React.createRef();
  }

  onChange = e => {
    this.setState({ searchField: e.target.value });
  };

  handleSearch = () => {
    const { history } = this.props;
    const city = this.searchField.current.value;
    // const { city } = this.state;

    city ? history.push(`/rentals/${city}/homes`) : history.push('/rentals');
  };

  onSearchChange = e => {
    this.setState({ searchfield2: e.target.value });
  };

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };
  render() {
    return (
      <div className="form-inline search-bar my-2 my-lg-0">
        <input
          ref={this.searchField}
          className="form-control mr-sm-2 navbar-search"
          type="search"
          placeholder="Try 'New York'"
          aria-label="Search"
          onKeyPress={e => this.onKeyPress(e)}
        />
        <button onClick={this.handleSearch} className="search__button">
          <i class="fas fa-search search__icon" />
        </button>
        {/* <button `onClick={this.handleSearch}` className="btn my-2 my-sm-0 btn-main-search" type="submit">
        //   Search
    // </button>{' '} */}
      </div>
    );
  }
}

export default withRouter(RentalSearchField);
