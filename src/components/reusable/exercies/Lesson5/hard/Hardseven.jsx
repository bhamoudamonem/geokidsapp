import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import HardBalancer from "./HardBalancer";

const options = [
  "جميع البلدان تسجّل فائضًا تجاريًا",
  "أغلب البلدان تسجّل عجزًا تجاريًا",
  "لا توجد واردات في بلدان المغرب العربي",
];

const correctIndex = 1;

const Hardseven = () => {
  const [selected, setSelected] = useState(null);
  const [showCorrection, setShowCorrection] = useState(false);
  const [showNext, setShowNext] = useState(false);

  if (showNext) return <HardBalancer />;

  const handleSelect = (index) => {
    if (showCorrection) return;

    setSelected(index);
    setShowCorrection(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        أيّ عبارة تلخّص وضعية المبادلات التجارية ببلدان المغرب العربي؟
      </Text>

      {options.map((option, index) => {
        let bgColor = "#eee";

        if (showCorrection && index === correctIndex) {
          bgColor = "#c8e6c9"; // green
        } else if (
          showCorrection &&
          index === selected &&
          index !== correctIndex
        ) {
          bgColor = "#ffcdd2"; // red
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.optionBtn, { backgroundColor: bgColor }]}
            onPress={() => handleSelect(index)}
            disabled={showCorrection}
          >
            <Text style={styles.optionText}>
               {option}
            </Text>
          </TouchableOpacity>
        );
      })}

      {showCorrection && (
        <View style={styles.correctionBox}>
          <Text style={styles.correctionTitle}>✔ الإصلاح:</Text>
          <Text style={styles.correctionText}>
            ب. أغلب البلدان تسجّل عجزًا تجاريًا
          </Text>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => setShowNext(true)}
          >
            <Text style={styles.nextText}>التالي</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  question: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    lineHeight: 28,
  },
  optionBtn: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: {
      fontSize: 16,
      textAlign:'right'
  },
  correctionBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
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
    marginBottom: 12,
  },
  nextBtn: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Hardseven;
