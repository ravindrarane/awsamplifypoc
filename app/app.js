var express = require('express');
var nunjucks = require('nunjucks');
var contentful = require('contentful');
var doctohtml = require('@contentful/rich-text-html-renderer');

var app = express();
var PATH_TO_TEMPLATES = '.';
nunjucks.configure(PATH_TO_TEMPLATES, {
  autoescape: true,
  express: app
});
let title,
  description = null;
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: 'ohpuqtl1fn21',
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: 'ghectpBdY69Xrcv6PWGc72jIEhuikLISVwHoiAF83Q0'
});
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
client
  .getEntry('5mzkNRiXaPjcN1S7TyXK7J')
  .then(entry => {
    title = entry.fields.title;
    const rawRichTextField = entry.fields.description;
    return doctohtml.documentToHtmlString(rawRichTextField);
  })
  .then(renderedHtml => {
    // do something with html, like write to a file
    console.log(renderedHtml);
    description = renderedHtml;
  })
  .catch(err => console.log(err));

app.get('/home.html', function(req, res) {
  return res.render('index.html');
});
app.get('/about.html', function(req, res) {
  return res.render('about.html');
});
app.get('/contactus.html', function(req, res) {
  return res.render('contact.html');
});
app.get('/data.html', function(req, res) {
  var data = {
    title: title,
    description: description
  };
  return res.render('data.njk', data);
});
app.listen(3000);
