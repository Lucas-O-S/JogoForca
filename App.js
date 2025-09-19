import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import LetterSpace from "./Components/LetterSpace";

// Imagens da forca
const imagensForca = [
  require("./assets/forca0.png"),
  require("./assets/forca1.png"),
  require("./assets/forca2.png"),
  require("./assets/forca3.png"),
  require("./assets/forca4.png"),
  require("./assets/forca5.png"),
];

// Lista de palavras possíveis
const palavras = [
  "banana", "computador", "javascript", "internet", "desenvolvimento",
  "carro", "abacaxi", "foguete", "programador", "celular"
];

export default function App() {
  const [palavra, setPalavra] = useState("");
  const [letraTemporaria, setLetraTemporaria] = useState("");
  const [letraEnviada, setLetraEnviada] = useState("");
  const [pontuacao, setPontuacao] = useState(0);
  const [forca, setForca] = useState(0);
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [acertosLetras, setAcertoLetras] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  const letras = palavra.toUpperCase().split("");

  // Escolhe palavra no início do jogo
  useEffect(() => {
    escolherNovaPalavra();
  }, []);

  // Escolhe palavra aleatória da lista
  function escolherNovaPalavra() {
    const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavra(novaPalavra);
  }

  // Verifica a letra chutada
  function VerificarResultado() {
    const letra = letraTemporaria.toUpperCase();

    if (!letra || finalizado || letrasUsadas.includes(letra)) return;

    setLetrasUsadas(prev => [...prev, letra]);

    if (palavra.toUpperCase().includes(letra)) {
      const ocorrencias = letras.filter(l => l === letra).length;
      setPontuacao(prev => {
        const novaPontuacao = prev + ocorrencias;
        if (novaPontuacao === letras.filter(l => l !== " ").length) {
          FinalizarJogo(true);
        }
        return novaPontuacao;
      });

      setAcertoLetras(prev => [...prev, letra]);
    } else {
      setForca(prev => {
        const novoErro = prev + 1;
        if (novoErro >= imagensForca.length - 1) {
          FinalizarJogo(false);
        }
        return novoErro;
      });
    }

    setLetraEnviada(letra);
    setLetraTemporaria("");
  }

  // Exibe mensagem de vitória ou derrota
  function FinalizarJogo(vitoria) {
    setFinalizado(true);
    if (vitoria) {
      Alert.alert("🎉 Vitória!", "Parabéns! Você acertou a palavra.");
    } else {
      Alert.alert("😢 Derrota", `Você perdeu! A palavra era: ${palavra.toUpperCase()}`);
    }
  }

  // Reinicia todos os estados e escolhe nova palavra
  function ReiniciarJogo() {
    setLetraEnviada("");
    setLetraTemporaria("");
    setPontuacao(0);
    setForca(0);
    setLetrasUsadas([]);
    setAcertoLetras([]);
    setFinalizado(false);
    escolherNovaPalavra();
  }

  return (
    <View style={styles.container}>
      <Image
        source={imagensForca[forca]}
        style={styles.imagem}
        resizeMode="contain"
      />


      {/* Espaços da palavra */}
      <View style={styles.letrasContainer}>
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

      {/* Campo de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Digite uma letra"
        maxLength={1}
        onChangeText={setLetraTemporaria}
        value={letraTemporaria}
        editable={!finalizado}
      />

      {/* Letras usadas */}
      {letrasUsadas.length > 0 && (
        <View style={styles.letrasUsadasContainer}>
          <Text style={styles.letrasUsadasTitulo}>Letras usadas:</Text>
          <Text style={styles.letrasUsadasTexto}>
            {letrasUsadas.join(" ").toUpperCase()}
          </Text>
        </View>
      )}

      {/* Botões */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botao, finalizado && styles.botaoDesabilitado]}
          onPress={VerificarResultado}
          disabled={finalizado}
        >
          <Text style={styles.textoBotao}>Chutar letra</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoReiniciar} onPress={ReiniciarJogo}>
          <Text style={styles.textoBotao}>🔄 Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  imagem: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  pontuacao: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  erros: {
    fontSize: 16,
    color: "red",
    marginBottom: 20
  },
  letrasContainer: {
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap",
    justifyContent: "center"
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 60,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    borderRadius: 8
  },
  letrasUsadasContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  letrasUsadasTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  letrasUsadasTexto: {
    fontSize: 18,
    marginTop: 4,
    letterSpacing: 2,
    color: "#555",
  },
  botoesContainer: {
    flexDirection: "row",
    gap: 10
  },
  botao: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8
  },
  botaoDesabilitado: {
    backgroundColor: "#95a5a6"
  },
  botaoReiniciar: {
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 8
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold"
  }
});
