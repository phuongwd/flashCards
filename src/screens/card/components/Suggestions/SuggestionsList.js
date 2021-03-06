import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Label from 'shared/components/Label';
import SuggestionsItem from './SuggestionsItem';

const SuggestionsList = ({ suggestions = [], onPress }) => {
  if (suggestions.length === 0) {
    return <Label>Empty</Label>;
  }

  return (
    <View style={styles.list}>
      {
        suggestions.map((suggestion, index) => (
          <React.Fragment>
            <SuggestionsItem
              key={suggestion}
              label={`${suggestion}${index === suggestions.length - 1 ? '' : ', '}`}
              index={index}
              onPress={onPress}
            />
          </React.Fragment>
        ))
      }
    </View>
  );
};

const styles = {
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
};

SuggestionsList.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func.isRequired,
};

export default SuggestionsList;
