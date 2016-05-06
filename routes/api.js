var config = require('../config');
var superagent = require('superagent');
var async = require('async');

module.exports = function (app) {
  
  app.get('/comic/search', function(req, res) {
    superagent
      .get(config.api.base + '/characters/')
      .query({api_key: config.api.key})
      .query({filter: "name:" + req.query.title })
      .query({format: "json"})
      .end(function(err, result) {
        if (err || result.statusCode !== 200) {
          res.send(err);
        }
        else {
          console.log('///// comics search');
          console.log(JSON.parse(result.text));
          res.json(JSON.parse(result.text));
        }
      });
  });

 
  app.get('/comic/details', function(req, res) {

    superagent
      .get(config.api.base + '/character/4005-' + req.query.id + '/')
      .query({api_key: config.api.key})
      .query({field_list: "id,name,origin,publisher,deck,image,character_enemies,character_friends,powers" })
      .query({format: "json"})
      .end(function(err, result) {

       // console.log(result);

       // console.log(config.api.base+'/character/' + req.query.id + '/');

        if (err || result.statusCode !== 200) {
          //console.log(JSON.parse(result.text));
          console.log(result);
          res.send(err);
        }
        else {
          console.log('// comics detail');
          console.log(result.text);
          res.json(JSON.parse(result.text));
        }
      });
  });

  app.get('/comic/versus', function(req, res) {

    async.parallel({
      mainDetail: function(next) {
        _comicDetails(req.query.main, next);
      },
      
      challengerDetail: function(next) {
        _comicDetails(req.query.challenger, next);
      }
      
    }, function done(err, results) {
      if (err) {
        res.json(err);
      }
      else {
        console.log(results);
        res.json(results);
      }
    });
  });

};

function _comicDetails(id, callback) {
  superagent
    .get(config.api.base + '/character/4005-' + id + '/')
    .query({api_key: config.api.key})
    .query({field_list: 'id,name,origin,publisher,deck,image,character_enemies,character_friends,powers,teams' })
    .query({format: 'json'})
    .end(function(err, result) {
      callback(err, JSON.parse(result.text));
  });
}