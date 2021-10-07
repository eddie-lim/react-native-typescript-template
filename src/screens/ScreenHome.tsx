import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withScreenBase } from '@screens/withScreenBase';

const ScreenHome: React.FC = (props) => {

  return (
    <View style={styles.body}>
      <Text>Home!</Text>
    </View>
  );
}
export default withScreenBase(ScreenHome);

var styles:common.StylesInterface = StyleSheet.create({
  body:{ flex: 1, justifyContent: 'center', alignItems: 'center' },
});
