import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utils/colors';
import { sizes } from '../utils/sizes';

export const FocusHistory = ({ history }) => {
  if (!history || !history.length) return <Text style={[styles.title, styles.text]}>We haven't focused on anything yet...</Text>;

  const renderItem = ({ item }) => <Text style={styles.text}>- {item}</Text>;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>Things we've focused on:</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    color: colors.white,
    fontSize: sizes.med,
    paddingTop: sizes.med,
  },
});
