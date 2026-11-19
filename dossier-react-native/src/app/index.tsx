import { Href, Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const apartados: { titulo: string; practicas: [string, string][] }[] = [
  { titulo: 'Primeros pasos', practicas: [['01', 'Hola mundo']] },
  {
    titulo: 'Componentes básicos y layout',
    practicas: [
      ['02', 'Contador con dos botones'],
      ['03', 'InicioScreen y estilos separados'],
      ['04', 'Tres cajas'],
      ['05', 'Modificar flex dinámicamente'],
      ['06', 'Sustituir los botones'],
      ['07', 'Nombre y estilos personalizados'],
      ['08', 'Círculos dinámicos'],
      ['09', 'Distribución, alineación e imágenes'],
      ['09_1', 'Imagen aleatoria'],
      ['10', 'Calculadora'],
    ],
  },
  { titulo: 'Estructura de carpetas', practicas: [['11', 'Hook personalizado para la calculadora']] },
  {
    titulo: 'Formularios, Switch, Alert/Prompt',
    practicas: [
      ['12', 'Color aleatorio con confirmación'],
      ['13', 'Introducir el color'],
      ['14', 'Borde activado por Switch'],
      ['15', 'Completar el formulario'],
    ],
  },
  {
    titulo: 'Listas',
    practicas: [
      ['16', 'Lista de productos'],
      ['17', 'Tarjetas para calcular el IMC'],
    ],
  },
  {
    titulo: 'Iconos',
    practicas: [
      ['18', 'Diario de emociones'],
      ['19', 'Insertar emoticonos en el texto'],
    ],
  },
  {
    titulo: 'Navegación (Stack, Context, Drawer y Tabs)',
    practicas: [
      ['20', 'Primer Stack'],
      ['21', 'Stack con tres pantallas'],
      ['22', 'Personalizar la cabecera'],
      ['23', 'Lista de tareas'],
      ['24', 'Drawer con tareas y «About»'],
      ['25', 'Personalización y orientación del Drawer'],
      ['26', 'Aplicación de mascotas'],
      ['27', 'Tabs combinadas con Stack'],
    ],
  },
  { titulo: 'Accediendo a APIs', practicas: [['28', 'Aplicación Pokémon']] },
  { titulo: 'Permisos', practicas: [['29', 'Localización del dispositivo']] },
  {
    titulo: 'Async Storage y WebView',
    practicas: [
      ['30', 'Historial de ubicaciones'],
      ['31', 'Contenido web y noticias'],
    ],
  },
  {
    titulo: 'Bases de datos: SQLite y relaciones',
    practicas: [
      ['32', 'Guardar personas'],
      ['33', 'Recuperar personas'],
      ['34', 'Tienda de productos'],
      ['35', 'Crear categorías'],
      ['36', 'Asignar categorías a productos'],
      ['37', 'Mostrar las categorías'],
      ['38', 'Propietarios y casas'],
      ['39', 'Eliminar asociaciones'],
    ],
  },
  { titulo: 'Transacciones', practicas: [['40', 'Guardado transaccional']] },
];

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Prácticas de React Native con Expo</Text>
      {apartados.map(({ titulo, practicas }) => (
        <View key={titulo} style={styles.apartado}>
          <Text style={styles.subtitulo}>{titulo}</Text>
          {practicas.map(([id, nombre]) => (
            <Link key={id} href={`/practica${id}` as Href} style={styles.enlace}>
              Práctica {id.replace(/^0/, '').replace('_', '.')}. {nombre}
            </Link>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: 20, gap: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold' },
  apartado: { gap: 8 },
  subtitulo: { fontSize: 18, fontWeight: '600' },
  enlace: { color: 'royalblue', fontSize: 16 },
});
