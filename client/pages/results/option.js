import React from 'react';
import OptionPrimary from './option_primary';
import OptionSecondary from './option_secondary';

const Option = (props) => {
  return (
    (props.rank === 1) ?
        <OptionPrimary {...props} />
      :
        <OptionSecondary {...props} />
  );
}

export default Option;
