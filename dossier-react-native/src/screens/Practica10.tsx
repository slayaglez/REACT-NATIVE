import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BCalc from '@/components/BCalc';

// Calculadora
export default function Practica10() {
  const [pantalla, setPantalla] = useState('0');
  const [anterior, setAnterior] = useState<number | null>(null);
  const [operador, setOperador] = useState<string | null>(null);
  const [nuevo, setNuevo] = useState(true);

  const formatear = (n: number) => (isFinite(n) ? String(parseFloat(n.toPrecision(12))) : 'Error');

  const calcular = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case 'X': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const pulsarNumero = (n: string) => {
    if (nuevo || pantalla === 'Error') {
      setPantalla(n === '.' ? '0.' : n);
      setNuevo(false);
    } else if (n === '.' && pantalla.includes('.')) {
      return;
    } else {
      setPantalla(pantalla === '0' && n !== '.' ? n : pantalla + n);
    }
  };

  const pulsarOperador = (op: string) => {
    const actual = parseFloat(pantalla);
    if (anterior !== null && operador && !nuevo) {
      const resultado = calcular(anterior, actual, operador);
      setPantalla(formatear(resultado));
      setAnterior(resultado);
    } else {
      setAnterior(actual);
    }
    setOperador(op);
    setNuevo(true);
  };

  const pulsarIgual = () => {
    if (anterior === null || !operador) return;
    setPantalla(formatear(calcular(anterior, parseFloat(pantalla), operador)));
    setAnterior(null);
    setOperador(null);
    setNuevo(true);
  };

  const limpiar = () => {
    setPantalla('0');
    setAnterior(null);
    setOperador(null);
    setNuevo(true);
  };

  const cambiarSigno = () => setPantalla(formatear(-parseFloat(pantalla)));

  const porcentaje = () => setPantalla(formatear(parseFloat(pantalla) / 100));

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Práctica 10: Calculadora</Text>
      <View style={styles.pantalla}>
        <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>{pantalla}</Text>
      </View>
      <View style={styles.fila}>
        <BCalc nombre='AC' onPress={limpiar} bg='gray'></BCalc>
        <BCalc nombre='+-' onPress={cambiarSigno} bg='gray'></BCalc>
        <BCalc nombre='%' onPress={porcentaje} bg='gray'></BCalc>
        <BCalc nombre='/' onPress={() => pulsarOperador('/')} bg='orange'></BCalc>
      </View>
      <View style={styles.fila}>
        <BCalc nombre='7' onPress={() => pulsarNumero('7')}></BCalc>
        <BCalc nombre='8' onPress={() => pulsarNumero('8')}></BCalc>
        <BCalc nombre='9' onPress={() => pulsarNumero('9')}></BCalc>
        <BCalc nombre='X' onPress={() => pulsarOperador('X')} bg='orange'></BCalc>
      </View>
      <View style={styles.fila}>
        <BCalc nombre='4' onPress={() => pulsarNumero('4')}></BCalc>
        <BCalc nombre='5' onPress={() => pulsarNumero('5')}></BCalc>
        <BCalc nombre='6' onPress={() => pulsarNumero('6')}></BCalc>
        <BCalc nombre='-' onPress={() => pulsarOperador('-')} bg='orange'></BCalc>
      </View>
      <View style={styles.fila}>
        <BCalc nombre='1' onPress={() => pulsarNumero('1')}></BCalc>
        <BCalc nombre='2' onPress={() => pulsarNumero('2')}></BCalc>
        <BCalc nombre='3' onPress={() => pulsarNumero('3')}></BCalc>
        <BCalc nombre='+' onPress={() => pulsarOperador('+')} bg='orange'></BCalc>
      </View>
      <View style={styles.fila}>
        <BCalc nombre='0' onPress={() => pulsarNumero('0')} length={150}></BCalc>
        <BCalc nombre='.' onPress={() => pulsarNumero('.')}></BCalc>
        <BCalc nombre='=' onPress={pulsarIgual} bg='orange'></BCalc>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  BCalc: {
    borderRadius: 100,
  },
  fila:{
    display: 'flex',
    flexDirection: 'row',
    columnGap: '10'
  },
  pantalla: {
    width: 310,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  titulo: {
    color: 'white',
  },
  resultado: {
    color: 'white',
    fontSize: 60,
  },
  contenedor: {
    flex: 1,
    rowGap: '10',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'black',
  },
});
