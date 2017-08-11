
const validateSubmitData = (data) => {
  if (!data.voterName){
    return { message: 'missing voter name' };
  }
  if (typeof data.voterName !== 'string'){
    return { message: 'invalid voter name'};
  }
  if (!data.options){
    return { message: 'missing options array' };
  }
  if (!Array.isArray(data.options)){
    return { message: 'invalid options array' };
  }
  if (data.options !== [] && typeof data.options[0] !== 'object'){
    return { message: 'invalid options contents' };
  }
  if (typeof data.options[0].name !== 'string'){
    return { message: 'invalid name type'}
  }
  if (!['up', 'down', 'veto'].includes(data.options[0].vote)){
    return { message: 'invalid vote'}
  }
  return null;
}

module.exports = validateSubmitData;
