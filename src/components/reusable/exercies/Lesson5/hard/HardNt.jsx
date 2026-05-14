import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Hardtn from "./Hardtn";

const HardNt = () => {
  const [compositionAnswer, setCompositionAnswer] = useState("");
  const [tradeType, setTradeType] = useState(null); // "surplus" | "deficit"
  const [showCorrection, setShowCorrection] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (isCompleted) return <Hardtn />;

  const handleCheck = () => {
    setShowCorrection(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>أجب بجملة قصيرة.</Text>

      <Text style={styles.subtitle}>
        علّل ارتفاع الصادرات في بعض بلدان المغرب العربي.
      </Text>

      {/* Answer 1 */}
      <TextInput
        style={styles.input}
        placeholder="اكتب إجابتك هنا..."
        multiline
        value={compositionAnswer}
        onChangeText={setCompositionAnswer}
        editable={!showCorrection}
      />    

  

      {!showCorrection && (
        <TouchableOpacity style={styles.checkBtn} onPress={handleCheck}>
          <Text style={styles.checkText}>تحقّق</Text>
        </TouchableOpacity>
      )}

      {/* Correction */}
      {showCorrection && (
        <View style={styles.correctionBox}>
          <Text style={styles.correctionTitle}>✔ الإصلاح:</Text>
          <Text style={styles.correctionText}>
            يرجع ارتفاع الصادرات إلى ارتفاع الإنتاج.
          </Text>
          

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => setIsCompleted(true)}
          >
            <Text style={styles.checkText}>التالي</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 12,
    color: "#555",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 20,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  choiceBtn: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  selected: {
    backgroundColor: "#c8e6c9",
  },
  choiceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  checkBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  nextBtn: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  checkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  correctionBox: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
  },
  correctionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#4CAF50",
  },
  correctionText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
});

export default HardNt;
