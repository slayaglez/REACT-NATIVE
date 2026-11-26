import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  texto: string;
  onPress: () => void;
};

// Tecla reutilizable de la calculadora (prácticas 10 y 11)
export default function TeclaCalculadora({ texto, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.tecla} onPress={onPress}>
      <Text>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tecla: {},
});
