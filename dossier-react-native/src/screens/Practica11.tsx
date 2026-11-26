import { StyleSheet, Text, View } from 'react-native';

// Práctica 11. Hook personalizado para la calculadora
export default function Practica11() {
  return (
    <View style={styles.contenedor}>
      <Text>Práctica 11: Hook personalizado para la calculadora</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
  },
});
