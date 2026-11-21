import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  texto: string;
  color: string;
  onPress: () => void;
  activo?: boolean;
};

// Botón personalizado con TouchableOpacity (prácticas 8 y 9)
export default function BotonControl({ texto, color, onPress, activo = false }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.boton, { backgroundColor: color }, activo && styles.activo]}>
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 8,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  activo: {
    borderColor: 'white',
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
  },
});
