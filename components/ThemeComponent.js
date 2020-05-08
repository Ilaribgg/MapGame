import React from 'react';
import { Text } from 'react-native';
import { withTheme } from 'react-native-elements';

function ThemeComponent(props) {
  const { theme, updateTheme, replaceTheme } = props;
  return <Text style={{ color: theme.colors.primary }}>Yo!</Text>;
}

export default withTheme(ThemeComponent);