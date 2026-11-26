import { StyleSheet, Text, View } from 'react-native';

// Práctica 13. Introducir el color
export default function Practica13() {
  return (
    <View style={styles.contenedor}>
      <Text>Práctica 13: Introducir el color</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
  },
});
