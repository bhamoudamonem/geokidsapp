import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import MeduimNs from "./MeduimNs";

const tradeExercies = [
  {
    commodity: "قمح",
    answer: "import",
  },
  {
    commodity: "تمر",
    answer: "export",
  },
  {
    commodity: "فسفاط",
    answer: "export",
  },
  {
    commodity: "سيارة",
    answer: "import",
  },
];

const MeduimN = () => {
  const [answers, setAnswers] = useState(tradeExercies.map(() => null));
  const [showResult, setShowResult] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleAnswer = (index, value) => {
    if (showResult) return;

    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  useEffect(() => {
    if (answers.every((a) => a !== null)) {
      setShowResult(true);

      setTimeout(() => {
        setShowNext(true);
      }, 3000);
    }
  }, [answers]);

  if (showNext) return <MeduimNs />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>ضع كل سلعة في المكان المناسب</Text>

      {tradeExercies.map((item, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === item.answer;

        return (
          <View key={index} style={styles.questionCard}>
            <Text style={styles.questionText}>{item.commodity}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[
                  styles.choiceBtn,
                  userAnswer === "import" && styles.selected,
                ]}
                onPress={() => handleAnswer(index, "import")}
                disabled={showResult}
              >
                <Text style={styles.choiceText}>واردات</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.choiceBtn,
                  userAnswer === "export" && styles.selected,
                ]}
                onPress={() => handleAnswer(index, "export")}
                disabled={showResult}
              >
                <Text style={styles.choiceText}>صادرات</Text>
              </TouchableOpacity>
            </View>

            {showResult && (
              <Text
                style={[
                  styles.resultText,
                  { color: isCorrect ? "#4CAF50" : "#F44336" },
                ]}
              >
                {isCorrect
                  ? "✔ اختيار صحيح"
                  : `✘ الإجابة الصحيحة: ${
                      item.answer === "import" ? "واردات" : "صادرات"
                    }`}
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    color: "#555",
  },
  questionCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  choiceBtn: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  selected: {
    backgroundColor: "#c8e6c9",
  },
  choiceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MeduimN;
