import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BotonControl from '@/components/BotonControl';

type Circulo = { id: number; color: string };

// Color que varía con cada círculo. Math.min evita que un canal pase de 255.
function colorPara(n: number) {
  const r = Math.min(255, 120 + ((n * 37) % 136));
  const g = Math.min(255, 150 + ((n * 53) % 106));
  const b = Math.min(255, 130 + ((n * 71) % 126));
  return `rgb(${r}, ${g}, ${b})`;
}

export default function Practica8() {
  const [circulos, setCirculos] = useState<Circulo[]>([]);
  const [envolver, setEnvolver] = useState(true);
  const [enFila, setEnFila] = useState(true);

  const agregarCirculo = () => {
    setCirculos((lista) => {
      const id = lista.length + 1;
      return [...lista, { id, color: colorPara(id) }];
    });
  };

  return (
    <View style={styles.contenedorPrincipal}>
      <View style={styles.controles}>
        <BotonControl texto="AGREGAR CÍRCULO" color="dodgerblue" onPress={agregarCirculo} />
        <BotonControl
          texto={`${envolver ? 'wrap' : 'nowrap'}. Pulse para cambiar`}
          color="firebrick"
          onPress={() => setEnvolver((v) => !v)}
        />
        <BotonControl
          texto={`${enFila ? 'row' : 'column'}. Pulse para cambiar`}
          color="orange"
          onPress={() => setEnFila((v) => !v)}
        />
      </View>

      <View
        style={[
          styles.escenario,
          {
            flexDirection: enFila ? 'row' : 'column',
            flexWrap: envolver ? 'wrap' : 'nowrap',
          },
        ]}>
        {circulos.map((c) => (
          // `key` estable: el id del círculo, no el índice
          <View key={c.id} style={[styles.circulo, { backgroundColor: c.color }]}>
            <Text style={styles.textoCirculo}>C {c.id}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    backgroundColor: 'rgb(170, 170, 170)',
    flex: 1,
    gap: 10,
    padding: 20,
  },
  controles: {
    gap: 6,
  },
  escenario: {
    backgroundColor: 'rgb(219, 219, 219)',
    flex: 1,
    gap: 8,
    padding: 10,
  },
  circulo: {
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 40,
    borderWidth: 2,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  textoCirculo: {
    color: '#444',
  },
});
