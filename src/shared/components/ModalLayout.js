import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const ModalLayout = ({ onCancel, onApply, children, title }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>

      {children}

      <View style={styles.footer} >
        <Button onPress={onCancel} color="#888" title="Cancel" />
        <Button onPress={onApply} title="Apply" />
      </View>
    </View>
  </View>
);

const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    margin: 20,
    minWidth: '80%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default ModalLayout;