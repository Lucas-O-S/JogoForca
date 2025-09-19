import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LetterSpace({ letraOriginal, letraEnviada, acertosLetras }) {
  const mostrarLetra = acertosLetras.includes(letraOriginal.toUpperCase());

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{mostrarLetra ? letraOriginal.toUpperCase() : "_"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 2 },
  text: { fontSize: 32, fontWeight: "bold" },
});
