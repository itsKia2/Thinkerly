import { Image, StyleSheet, Platform, View, Text } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>This is the Thinkerly App!!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
