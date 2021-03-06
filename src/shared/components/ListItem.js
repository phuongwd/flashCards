import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TouchableHighlight,
} from 'react-native';
import { SEPARATOR_COLOR } from '../styles';
import MenuButton from './MenuButton';

const ListItem = ({ children, onPress, actions }) => (
  <TouchableHighlight onPress={(onPress)}>
    <View style={styles.container}>
      {children}
      {
        actions && (
          <View style={styles.actions}>
            <MenuButton
              items={actions}
              icon={require('../icons/menu.png')}
            />
          </View>
        )
      }
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: SEPARATOR_COLOR,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  actions: {
    alignSelf: 'center',
    paddingLeft: 20,
  },
});

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ListItem;
