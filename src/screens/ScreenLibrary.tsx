import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withScreenBase } from '@screens/withScreenBase';

const ScreenLibrary: React.FC = (props) => {

  return (
    <View style={styles.body}>
      <Text>Library!</Text>
    </View>
  );
}
export default withScreenBase(ScreenLibrary);

var styles:common.StylesInterface = StyleSheet.create({
  body:{ flex: 1, justifyContent: 'center', alignItems: 'center' },
});
