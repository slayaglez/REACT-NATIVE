import { StyleSheet, Text, View } from 'react-native';

import Caja from '@/components/Caja';

export default function PrincipalScreen() {
  return (
    <View style={styles.contenedorPrincipal}>
      <Text style={styles.texto}>Contenedor Principal</Text>
      <View style={styles.escenario}>
        <Caja nombre="Caja 1" bg="red" />
        <Caja nombre="Caja 2" bg="royalblue" />
        <Caja nombre="Caja 3" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    alignItems: 'center',
    backgroundColor: 'rgb(170, 170, 170)',
    flex: 1,
    padding: 10,
  },
  escenario: {
    width: 300,
    backgroundColor: 'rgb(219, 219, 219)',
    flex: 1,
    gap: 10,
    padding: 20,
  },
  texto: {
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
