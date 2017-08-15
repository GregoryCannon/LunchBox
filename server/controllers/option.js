var yelp = require('yelp-fusion');

exports.getOptions = (req, res) => {
  const token = process.env.YELP_ACCESS_TOKEN
  const searchRequest = {
    term: req.params.keyword ? req.params.keyword :'restaurants',
    location: decodeURIComponent(req.params.location),
    sort_by: req.params.sortBy,
    radius: 3000
  };
  const client = yelp.client(token);

  client.search(searchRequest).then(response => {
    return res.json(response.jsonBody.businesses);
  }).catch(err => {
    console.log('err', err)
    return res.send(err);
  });
}
