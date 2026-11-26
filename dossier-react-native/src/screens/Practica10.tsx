import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// Calculadora
export default function Practica10() {

  return (
    <View style={styles.contenedor}>
      <Text>Práctica 10: Calculadora</Text>
      <View>0</View>
      <View style={styles.fila}>
        <Button title='AC'></Button>
        <Button title='+-'></Button>
        <Button title='%'></Button>
        <Button title='/'></Button>
        <Button title='7'></Button>
        <Button title='8'></Button>
        <Button title='9'></Button>
        <Button title='X'></Button>
        <Button title='4'></Button>
        <Button title='5'></Button>
        <Button title='6'></Button>
        <Button title='-'></Button>
        <Button title='1'></Button>
        <Button title='2'></Button>
        <Button title='3'></Button>
        <Button title='+'></Button>
        <Button title='0'></Button>
        <Button title='.'></Button>
        <Button title='='></Button>
      </View>
    </View>
  );
}

// TODO dividir por filas en lugar de tratar de hacer un grid

const styles = StyleSheet.create({
  fila:{
    display: 'flex',
    flexDirection: 'row',

  },
  contenedor: {
    flex: 1,
    padding: 20,
  },
});
