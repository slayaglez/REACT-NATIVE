import { Alert, TouchableOpacity, TouchableHighlight, Button, StyleSheet, Text, View } from 'react-native';

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
                {nombre} - flex: {valorFlex}
            </Text>
            <View style={styles.botones}>

                <TouchableHighlight
                    underlayColor="#bebebe"
                    onPress={() => {
                        Alert.alert('Flex', `Creció ${nombre}`)
                        onMas();
                    }}
                    style={styles.cajitaBotones}>
                    <Text style={styles.texto}>FLEX +1</Text>
                </TouchableHighlight>


                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={onMenos}
                    style={styles.cajitaBotones}>

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
    cajitaBotones: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        backgroundColor: 'navy',
        borderColor: 'black',
        borderWidth: 3,
        padding: 10,
    }
});
