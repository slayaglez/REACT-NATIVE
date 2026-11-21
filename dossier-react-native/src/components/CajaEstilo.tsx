import {
  Alert,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  nombre: string;
  bg?: string;
  valorFlex: number;
  onMas: () => void;
  onMenos: () => void;
  // Estilo opcional enviado desde la pantalla que usa la caja
  style?: StyleProp<ViewStyle>;
};

// Igual que CajaFlexAlert, pero acepta un `style` que se combina con el de por defecto.
// El orden importa: lo que venga en `style` sobrescribe lo repetido de `styles.caja`.
export default function CajaEstilo({ nombre, bg = 'green', valorFlex, onMas, onMenos, style }: Props) {
  return (
    <View style={[styles.caja, { backgroundColor: bg, flex: valorFlex }, style]}>
      <Text style={styles.texto}>
        {nombre} - flex: {valorFlex}
      </Text>
      <View style={styles.botones}>
        <TouchableHighlight
          underlayColor="#bebebe"
          onPress={() => {
            Alert.alert('Flex', `Creció ${nombre}`);
            onMas();
          }}
          style={styles.boton}>
          <Text style={styles.texto}>FLEX +1</Text>
        </TouchableHighlight>

        <TouchableOpacity activeOpacity={0.5} onPress={onMenos} style={styles.boton}>
          <Text style={styles.texto}>FLEX -1</Text>
        </TouchableOpacity>
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
  boton: {
    alignItems: 'center',
    backgroundColor: 'navy',
    borderColor: 'black',
    borderWidth: 3,
    justifyContent: 'center',
    padding: 10,
    width: 100,
  },
});
