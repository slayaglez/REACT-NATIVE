import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CajaFlex from '@/components/CajaFlexAlert';

export default function Practica5() {
  // Un estado independiente por caja.
  const [flex1, setFlex1] = useState(1);
  const [flex2, setFlex2] = useState(1);
  const [flex3, setFlex3] = useState(1);

  return (
    <View style={styles.contenedorPrincipal}>
      <Text style={styles.texto}>Contenedor Principal</Text>
      <View style={styles.escenario}>
        <CajaFlex
          nombre="Caja 1"
          bg="red"
          valorFlex={flex1}
          onMas={() => setFlex1((n) => n + 1)}
          onMenos={() => setFlex1((n) => Math.max(0, n - 1))}
        />
        <CajaFlex
          nombre="Caja 2"
          bg="royalblue"
          valorFlex={flex2}
          onMas={() => setFlex2((n) => n + 1)}
          onMenos={() => setFlex2((n) => Math.max(0, n - 1))}
        />
        <CajaFlex
          nombre="Caja 3"
          valorFlex={flex3}
          onMas={() => setFlex3((n) => n + 1)}
          onMenos={() => setFlex3((n) => Math.max(0, n - 1))}
        />
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
