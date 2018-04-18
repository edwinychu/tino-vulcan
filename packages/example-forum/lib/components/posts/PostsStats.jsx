import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const PostsStats = ({post}) => {
  return (
    <div className="posts-stats">
    </div>
  )
}

PostsStats.displayName = "PostsStats";

registerComponent('PostsStats', PostsStats);