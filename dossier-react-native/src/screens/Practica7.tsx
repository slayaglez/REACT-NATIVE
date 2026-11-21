import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CajaEstilo from '@/components/CajaEstilo';

export default function Practica7() {
  const [flexA, setFlexA] = useState(1);
  const [flexB, setFlexB] = useState(1);
  const [flexC, setFlexC] = useState(1);

  return (
    <View style={styles.contenedorPrincipal}>
      <Text style={styles.texto}>Contenedor Principal</Text>
      <View style={styles.escenario}>
        {/* Sin `style`: usa el aspecto por defecto */}
        <CajaEstilo
          nombre="Caja A"
          bg="red"
          valorFlex={flexA}
          onMas={() => setFlexA((n) => n + 1)}
          onMenos={() => setFlexA((n) => Math.max(0, n - 1))}
        />
        {/* Esquinas redondeadas y borde más grueso y de otro color */}
        <CajaEstilo
          nombre="Caja B"
          bg="royalblue"
          valorFlex={flexB}
          onMas={() => setFlexB((n) => n + 1)}
          onMenos={() => setFlexB((n) => Math.max(0, n - 1))}
          style={styles.cajaB}
        />
        {/* Borde discontinuo */}
        <CajaEstilo
          nombre="Caja C"
          valorFlex={flexC}
          onMas={() => setFlexC((n) => n + 1)}
          onMenos={() => setFlexC((n) => Math.max(0, n - 1))}
          style={styles.cajaC}
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
    backgroundColor: 'rgb(219, 219, 219)',
    flex: 1,
    gap: 10,
    padding: 20,
    width: 300,
  },
  texto: {
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cajaB: {
    borderColor: 'gold',
    borderRadius: 20,
    borderWidth: 7,
  },
  cajaC: {
    borderColor: 'white',
    borderRadius: 40,
    borderStyle: 'dashed',
    borderWidth: 4,
  },
});
