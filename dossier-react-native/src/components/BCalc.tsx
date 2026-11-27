import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

type Props = { 
  nombre: string; 
  bg?: string; 
  length?: number;
  operation?: string;
  value?: number;
  onPress?: () => void};

export default function BCalc({ nombre, bg = '#3b3b3b', length = 70, onPress}: Props) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={[styles.circulo, { backgroundColor: bg , width: length}]}>
          <Text style={styles.texto}>{nombre}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circulo: {
    alignItems: 'center',
    borderRadius: 100,
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30
  },
});
