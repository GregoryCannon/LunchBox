import geolib from 'geolib'
import fetch from 'isomorphic-fetch';
import moment from 'moment'

async function makeApiCall(endpoint) {
  const apiUrl = `${window.location.protocol}//${window.location.host}/api`
  const response = await fetch(
    `${apiUrl}/${endpoint}`,
    {headers: {'content-type': 'application/json' }},
    'get'
  );
  const responseText = await response.text();
  if (!response.ok) {
    const error = new Error(`api call error: ${response.statusText}\n${responseText}`);
    error.statusCode = response.status;
    throw error;
  }
  try {
    return JSON.parse(responseText);
  } catch (e) {
    return responseText;
  }
}

exports.getOptions = async function (keyword, location, sortBy) {
  var endpoint = '/options/'+encodeURIComponent(location)+'/'+sortBy
  endpoint = keyword ? endpoint + '/' + keyword: endpoint
  var response = await makeApiCall(endpoint);
  if (response.statusCode) return []
  var options = response.reduce((options, optionData) => {
    options[optionData.id] = {
      yelpId: optionData.id,
      name: optionData.name,
      imgUrl: optionData.image_url,
      price: optionData.price,
      rating: optionData.rating,
      distance: geolib.convertUnit('mi', optionData.distance, 1)+'mi',
      categories: optionData.categories.map((category) => {
        return category.title
      }).join(', '),
      yelpUrl: optionData.url,
      selected: false,
    }
    return options
  }, {})
  return options
}

exports.getValues = function (objects) {
  return Object.keys(objects).map(function(key){
    return objects[key];
  });
}

exports.getTime = function (seconds) {
  var now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(seconds);
  return now
}

exports.getStartTimeString = function () {
  const now = new Date()
  const startTime = moment(now).add(15, 'm')
  return startTime.hours() + ':' + (Math.round(startTime.minutes()/15) * 15) % 60
}

exports.getEndTimeString = function() {
  const now = new Date()
  const endTime = moment(now).add(15 + 2 * 60, 'm');
  return endTime.hours() + ':' + (Math.round(endTime.minutes()/15) * 15) % 60
}
