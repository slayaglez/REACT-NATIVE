import { Button, StyleSheet, Text, View } from 'react-native';

type Props = {
  nombre: string;
  bg?: string;
  valorFlex: number;
  onMas: () => void;
  onMenos: () => void;
};

// Variante de Caja sin altura fija
export default function CajaFlex({ nombre, bg = 'green', valorFlex, onMas, onMenos }: Props) {
  return (
    <View style={[styles.caja, { backgroundColor: bg, flex: valorFlex }]}>
      <Text style={styles.texto}>
        {nombre} · flex: {valorFlex}
      </Text>
      <View style={styles.botones}>
        <Button title="flex + 1" onPress={onMas} />
        <Button title="flex - 1" onPress={onMenos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 2,
    borderWidth: 3,
    justifyContent: 'center',
    padding: 8,
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  botones: {
    flexDirection: 'row',
    gap: 8,
  },
});
