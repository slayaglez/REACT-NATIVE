import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

import BotonControl from '@/components/BotonControl';

// Tipos unión con los valores admitidos, sacados del propio tipo de estilos

const imagenes = [
  {nombre: 'sanchez', source: require('../../assets/images/portavoces/sanchez.jpeg')},
  {nombre: 'feijoo', source: require('../../assets/images/portavoces/feijoo.jpeg')},
  {nombre: 'santi', source: require('../../assets/images/portavoces/santi.jpeg')},
  {nombre: 'ada', source: require('../../assets/images/portavoces/ada.jpg')},
];


export default function Practica91() {
  

  //TODO
  const cambiarImagen = (imagenes[]: ) => {
    setTexto(valor);
    const limpio = valor.trim().toLowerCase();

    setImages(valor);
  };

  const textoValido = esJustificacion(texto.trim().toLowerCase());

  return (
    <View style={styles.contenedorPrincipal}>
      <TextInput
        style={[styles.input, !textoValido && styles.inputError]}
        placeholder="center, space-around..."
        value={texto}
        onChangeText={cambiarTexto}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.ayuda}>Válidos: {JUSTIFICACIONES.join(', ')}</Text>

      {/* Contenedor anidado en fila dentro de la columna principal */}
      <View style={styles.filaBotones}>
        {ALINEACIONES.map((a) => (
          <BotonControl
            key={a}
            texto={a}
            color="seagreen"
            activo={a === align}
            onPress={() => setAlign(a)}
          />
        ))}
      </View>

      <Text style={styles.estado}>
        justifyContent: {justify} · alignItems: {align}
      </Text>

      <View style={[styles.escenario, { justifyContent: justify, alignItems: align }]}>
        {/* Local con require (ruta estática) */}
        <Image source={require('../../assets/images/icon.png')} style={styles.imagen} />
        <Image source={require('../../assets/images/react-logo.png')} style={styles.imagen} />
        {/* Remota con uri */}
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.imagen}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    backgroundColor: 'rgb(170, 170, 170)',
    flex: 1,
    gap: 8,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'seagreen',
    borderRadius: 8,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inputError: {
    borderColor: 'firebrick',
  },
  ayuda: {
    color: '#333',
    fontSize: 12,
  },
  filaBotones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  estado: {
    fontWeight: 'bold',
  },
  escenario: {
    backgroundColor: 'rgb(219, 219, 219)',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: 10,
  },
  // minWidth (no width) para que con alignItems: 'stretch' se vea cómo se estira
  imagen: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 80,
    minWidth: 80,
    resizeMode: 'contain',
  },
});
