import { registerComponent, Components, Utils } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'meteor/vulcan:i18n';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { withRouter, Link } from 'react-router'

const Input = FRC.Input;

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

class SearchForm extends Component{

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      pathname: props.router.location.pathname,
      search: props.router.location.query.query || ''
    }
  }

  // note: why do we need this?
  componentWillReceiveProps(nextProps) {
    this.setState({
      search: this.props.router.location.query.query || ''
    });
  }

  search(data) {

    const router = this.props.router;
    const routerQuery = _.clone(router.location.query);
    delete routerQuery.query;

    const query = data.searchQuery === '' ? routerQuery : {...routerQuery, query: data.searchQuery};

    delay(() => {
      // only update the route if the path hasn't changed in the meantime
      if (this.state.pathname === router.location.pathname) {
        router.push({pathname: Utils.getRoutePath('posts.list'), query: query});
      }
    }, 700 );

  }

  render() {

    const resetQuery = _.clone(this.props.location.query);
    delete resetQuery.query;

    return (
      <div className="search-form">
        <Formsy.Form onChange={this.search}>
          <Input
            name="searchQuery"
            value={this.state.search}
            placeholder="Search a stock"
            type="text"
            layout="elementOnly"
          />
          {this.state.search !== '' ? <Link className="search-form-reset" to={{pathname: '/', query: resetQuery}}><Components.Icon name="close" /></Link> : null}
        </Formsy.Form>
      </div>
    )
  }
}

SearchForm.contextTypes = {
  intl: intlShape
};

registerComponent('SearchForm', SearchForm, withRouter);