module.exports = function (app) {

  app.get('/', function(req, res) {
    res.render('search');
  });

  app.get('/:title', function(req, res) {
    res.render('search');
  });

  app.get('/comics/:id', function(req, res) {
    res.render('detail');
  });

  app.get('/comics/:main/versus/:challenger', function(req, res) {
    res.render('versus');
  });


};