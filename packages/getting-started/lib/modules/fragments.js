import { registerFragment } from 'meteor/vulcan:core';

registerFragment(/* GraphQL */`
  fragment MoviesFragment on Movie {
    _id
    createdAt
    name
    user{
      displayName
    }
  }
`);