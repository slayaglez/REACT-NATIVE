import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import BotonControl from '@/components/BotonControl';

const imagenes = [
  { nombre: 'Pedro', source: require('../../assets/images/portavoces/sanchez.jpeg') },
  { nombre: 'anotop at', source: require('../../assets/images/portavoces/feijoo.jpeg') },
  { nombre: 'Santi', source: require('../../assets/images/portavoces/santi.jpeg') },
  { nombre: 'Ada', source: require('../../assets/images/portavoces/ada.jpg') },
];

export default function Practica91() {
  const [indice, setIndice] = useState(0);

  const elegirAleatoria = () => {
    setIndice(Math.floor(Math.random() * imagenes.length));
  };

  const actual = imagenes[indice];

  return (
    <View style={styles.contenedorPrincipal}>
      <Image source={actual.source} style={styles.imagen} />
      <Text style={styles.estado}>
        {actual.nombre} ({indice + 1}/{imagenes.length})
      </Text>
      <BotonControl texto="Imagen aleatoria" color="seagreen" onPress={elegirAleatoria} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    alignItems: 'center',
    backgroundColor: 'rgb(170, 170, 170)',
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 20,
  },
  estado: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagen: {
    borderRadius: 12,
    height: 250,
    resizeMode: 'cover',
    width: 250,
  },
});
