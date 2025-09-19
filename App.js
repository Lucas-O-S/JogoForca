import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import LetterSpace from './Components/LetterSpace';

// Imagens PNG
const Forca0 = require('./assets/forca0.png');
const Forca1 = require('./assets/forca1.png');
const Forca2 = require('./assets/forca2.png');
const Forca3 = require('./assets/forca3.png');
const Forca4 = require('./assets/forca4.png');
const Forca5 = require('./assets/forca5.png');

export default function App() {
  const [palavra, setPalavra] = useState("banana");
  const [letraEnviada, setLetraEnviada] = useState("");
  const [letraTemporaria, setLetraTemporaria] = useState("");
  const [pontuacao, setPontuacao] = useState(0);
  const [forca, setForca] = useState(0);
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [acertosLetras, setAcertoLetras] = useState([]);

  const letras = palavra.split("");

  const imagensForca = [Forca0, Forca1, Forca2, Forca3, Forca4, Forca5];

  function VerificarResultado() {
    const letra = letraTemporaria.toUpperCase();

    if (!letrasUsadas.includes(letra)) {
      setLetrasUsadas(prev => [...prev, letra]);

      if (palavra.toUpperCase().includes(letra)) {
        setPontuacao(prev => prev + 1);
        setAcertoLetras(prev => [...prev, letra]);
      } else {
        setForca(prev => Math.min(prev + 1, imagensForca.length - 1));
      }

      setLetraEnviada(letra);
      setLetraTemporaria("");
    }
  }

  return (
    <View style={styles.container}>

      {/* Renderizando a imagem correta */}
      <Image
        source={imagensForca[forca]}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />

      <Text>Pontuação: {pontuacao}</Text>
      <Text>Erros: {forca}</Text>

      <View style={{ flexDirection: "row" }}>
        {letras.map((letra, index) =>
          letra !== " " ? (
            <LetterSpace
              key={index}
              letraOriginal={letra}
              letraEnviada={letraEnviada}
              acertosLetras={acertosLetras}
            />
          ) : (
            <View key={index} style={{ width: 10 }} />
          )
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Digite uma letra"
        maxLength={1}
        onChangeText={setLetraTemporaria}
        value={letraTemporaria}
      />

      <Button title="Chutar letra" onPress={VerificarResultado} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    width: 50,
    textAlign: "center",
    marginTop: 20,
  },
});
