import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withScreenBase } from '@screens/withScreenBase';

const ScreenRegister: React.FC = (props) => {

  return (
    <View style={styles.body}>
      <Text>Register!</Text>
    </View>
  );
}
export default withScreenBase(ScreenRegister);

var styles:common.StylesInterface = StyleSheet.create({
  body:{ flex: 1, justifyContent: 'center', alignItems: 'center' },
});
