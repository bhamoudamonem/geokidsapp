import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Hardseven from "./Hardseven";

const Hardtn = () => {
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [showNext, setShowNext] = useState(false);

  if (showNext) return <Hardseven />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>7- أكمل بما يناسب</Text>

      <Text style={styles.subtitle}>
        التعليمات: أكمل الجمل التالية بالكلمة المناسبة.
      </Text>

      {/* Sentence 1 */}
      <View style={styles.sentenceRow}>
        <Text style={styles.sentenceText}>
          عندما تكون قيمة الصادرات أكبر من قيمة الواردات نسمّي ذلك
        </Text>

        <TextInput
          style={styles.input}
          value={a1}
          onChangeText={setA1}
          editable={!showCorrection}
        />

        <Text style={styles.sentenceText}>تجاريًا.</Text>
      </View>

      {/* Sentence 2 */}
      <View style={styles.sentenceRow}>
        <Text style={styles.sentenceText}>
          عندما تكون قيمة الواردات أكبر من قيمة الصادرات نسمّي ذلك
        </Text>

        <TextInput
          style={styles.input}
          value={a2}
          onChangeText={setA2}
          editable={!showCorrection}
        />

        <Text style={styles.sentenceText}>تجاريًا.</Text>
      </View>

      {/* Sentence 3 */}
      <View style={styles.sentenceRow}>
        <Text style={styles.sentenceText}>
          البلد المغاربي الوحيد الذي يسجّل فائضًا تجاريًا هو
        </Text>

        <TextInput
          style={styles.input}
          value={a3}
          onChangeText={setA3}
          editable={!showCorrection}
        />
      </View>

      {!showCorrection && (
        <TouchableOpacity
          style={styles.checkBtn}
          onPress={() => setShowCorrection(true)}
        >
          <Text style={styles.btnText}>تحقّق</Text>
        </TouchableOpacity>
      )}

      {showCorrection && (
        <View style={styles.correctionBox}>
          <Text style={styles.correctionTitle}>✔ الإصلاح:</Text>
          <Text style={styles.correctionText}>فائضًا</Text>
          <Text style={styles.correctionText}>عجزًا</Text>
          <Text style={styles.correctionText}>موريتانيا</Text>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => setShowNext(true)}
          >
            <Text style={styles.btnText}>التالي</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },

  sentenceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 18,
  },
  sentenceText: {
    fontSize: 17,
    lineHeight: 28,
    color: "#333",
  },
  input: {
    minWidth: 90,
    height: 36,
    borderBottomWidth: 2,
    borderColor: "#4CAF50",
    fontSize: 17,
    marginHorizontal: 6,
    paddingVertical: 0,
    textAlign: "center",
  },

  checkBtn: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  nextBtn: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  correctionBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
  },
  correctionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 6,
  },
  correctionText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Hardtn;
