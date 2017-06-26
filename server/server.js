// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var R = require('ramda');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


let lions = []
let id = 0;

app.route('/lions')
  .get((req, res) => {
    res.json(lions);
  })
  .post((req, res) => {
    const lion = Object.assign({}, req.body, { id: R.toString(id) })
    lions = [ ...lions, lion ]
    id += 1;
    res.json(lion)
  })

app.route('/lions/:id')
  .get((req, res) => {
    const { id } = req.params
    res.json(R.find(R.propEq('id', id), lions));
  })
  .put((req, res) => {
    const { id } = req.params
    const lionToUpdateIndex = R.findIndex(R.propEq('id', id), lions);
    
    if (lionToUpdateIndex < 0) {
      res.send()
    } else {
      const lionToUpdate = R.find(R.propEq('id', id), lions)
      const updatedLion = R.merge(lionToUpdate, req.body)
      lions = [
        ...lions.slice(0, lionToUpdateIndex),
        ...lions.slice(lionToUpdateIndex + 1),
        updatedLion
      ]
      res.json(updatedLion);
    }
  })
  .delete((req, res) => {
    const { id } = req.params
    const lionToDelete = R.find(R.propEq('id', id), lions)
    lions = lions.filter( lion => R.toString(lion.id) !== R.toString(id) );
    res.json(lionToDelete)
  });

app.listen(3000);
console.log('on port 3000');
