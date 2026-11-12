import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const [contador, setContador] = useState(0);
  return (
    <View style={styles.pantalla}>
      <Text style={styles.texto}>¡Hola mundo! Soy el papi</Text>
      <Text style={styles.texto}>Contador: {contador}</Text>
      <Button title="Incrementar" onPress={() => setContador(n => n + 1)} />
    </View>
  );
}


const styles = StyleSheet.create({
  pantalla: {
    alignItems: 'center',
    backgroundColor: 'navy',
    flex: 1,
    justifyContent: 'center',
  },
  texto: {
    color: 'white'
  },
  caja: { alignItems: 'center', borderWidth: 2, padding: 20 },
});




