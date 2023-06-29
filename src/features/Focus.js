import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { colors } from '../utils/colors';
import { sizes } from '../utils/sizes';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="What would you like to focus on?"
          style={styles.textInput}
          onChangeText={setSubject}
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={sizes.xxl} 
          onPress={() => addSubject(subject)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  inputContainer: {
    paddingTop: sizes.lrg,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginRight: sizes.sml,
  },
  button: {
    justifyContent: 'center',
  },
});
