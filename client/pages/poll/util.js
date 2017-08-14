exports.getValues = function (objects) {
  return Object.keys(objects).map(function(key){
    return objects[key];
  });
}