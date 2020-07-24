const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'ohpuqtl1fn21',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'ghectpBdY69Xrcv6PWGc72jIEhuikLISVwHoiAF83Q0'
});
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
client
  .getEntry('5mzkNRiXaPjcN1S7TyXK7J')
  .then(entry => getFieldData(entry.fields))
  .catch(err => console.log(err));

function getFieldData(val) {
  console.log(val.title);
  setTimeout(function() {
    document.getElementsByClassName('title').innerHtml = val.title;
  }, 3000);
}
