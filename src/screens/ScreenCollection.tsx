import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withScreenBase } from '@screens/withScreenBase';

const ScreenCollection: React.FC = (props) => {

  return (
    <View style={styles.body}>
      <Text>Collection!</Text>
    </View>
  );
}
export default withScreenBase(ScreenCollection);

var styles:common.StylesInterface = StyleSheet.create({
  body:{ flex: 1, justifyContent: 'center', alignItems: 'center' },
});
