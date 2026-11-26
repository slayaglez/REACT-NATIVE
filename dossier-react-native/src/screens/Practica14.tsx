import { StyleSheet, Text, View } from 'react-native';

// Práctica 14. Borde activado por Switch
export default function Practica14() {
  return (
    <View style={styles.contenedor}>
      <Text>Práctica 14: Borde activado por Switch</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
  },
});
