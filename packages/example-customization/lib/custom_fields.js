import { Posts } from 'meteor/example-forum';

/*
Let's assign a color to each post (why? cause we want to, that's why).
We'll do that by adding a custom field to the Posts collection.
Note that this requires our custom package to depend on vulcan:posts and vulcan:users.
*/

Posts.addField(
  {
    fieldName: 'color',
    fieldSchema: {
      type: String,
      control: "select", // use a select form control
      optional: true, // this field is not required
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
    }
  }
);
