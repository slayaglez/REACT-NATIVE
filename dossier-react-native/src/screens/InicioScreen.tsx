import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function InicioScreen() {
  const [contador, setContador] = useState(0);
  return (
    <View style={styles.pantalla}>
      <View style={styles.caja}>
        <Text style={styles.texto}>Contador: {contador}</Text>
        <View style={styles.botones}>
          <Button title="Decrementar" color="crimson" onPress={() => setContador(n => n - 1)} />
          <Button title="Incrementar" color="seagreen" onPress={() => setContador(n => n + 1)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  caja: {
    alignItems: 'center',
    backgroundColor: 'rgb(155, 183, 226)',
    borderColor: 'navy',
    borderRadius: 20,
    borderWidth: 3,
    gap: 16,
    padding: 20,
  },
  texto: {
    color: 'navy',
    fontSize: 20,
    fontWeight: 'bold',
  },
  botones: {
    flexDirection: 'row',
    gap: 12,
  },
});
