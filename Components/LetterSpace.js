import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LetterSpace({ letraOriginal, letraEnviada, acertosLetras }) {
  const [letra, setLetra] = useState("_");

  useEffect(() => {
    if (acertosLetras.includes(letraOriginal.toUpperCase())) {
      setLetra(letraOriginal.toUpperCase());
    }
  }, [acertosLetras]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{letra}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 2 },
  text: { fontSize: 32, fontWeight: "bold" },
});
