import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Easysix from "./Easysix";
import useSound from "../../../../../hooks/useSound";

const exerciesQuizz = [
  {
    question: "تصدّر بلدان المغرب العربي منتجات فلاحية.",
    answer: true,
  },
  {
    question: "تتكوّن الصادرات من مواد غذائية فقط.",
    answer: false,
  },
  {
    question: "الميزان التجاري يتكوّن من الصادرات والواردات.",
    answer: true,
  },
  {
    question: "موريتانيا تسجّل عجزًا تجاريًا.",
    answer: false,
  },
];

const EasyFive = () => {
  const { correctAnswerSound, wrongAnswerSound, winSound } = useSound();

  // user answers: true / false / null
  const [answers, setAnswers] = useState(exerciesQuizz.map(() => null));

  const [showResult, setShowResult] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  // when all answered
  useEffect(() => {
    if (answers.every((a) => a !== null)) {
      setShowResult(true);

      let allCorrect = true;

      answers.forEach((ans, i) => {
        if (ans === exerciesQuizz[i].answer) {
          correctAnswerSound();
        } else {
          wrongAnswerSound();
          allCorrect = false;
        }
      });


      setTimeout(() => setShowNext(true), 4000);
    }
  }, [answers]);

  if (showNext) return <Easysix />;

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        ضع علامة ✅ أمام العبارة الصحيحة وعلامة ❌ أمام العبارة الخاطئة
      </Text>
     <ScrollView>
      {exerciesQuizz.map((item, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === item.answer;

        return (
          <View key={index} style={styles.questionCard}>
            <Text style={styles.questionText}>{item.question}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[
                  styles.choiceBtn,
                  userAnswer === true && styles.selected,
                ]}
                onPress={() => handleAnswer(index, true)}
                disabled={showResult}
              >
                <Text style={styles.choiceText}>✅</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.choiceBtn,
                  userAnswer === false && styles.selected,
                ]}
                onPress={() => handleAnswer(index, false)}
                disabled={showResult}
              >
                <Text style={styles.choiceText}>❌</Text>
              </TouchableOpacity>
            </View>

            {showResult && (
              <Text
                style={[
                  styles.resultText,
                  { color: isCorrect ? "#4CAF50" : "#F44336" },
                ]}
              >
                {isCorrect ? "✔ إجابة صحيحة" : "✘ إجابة خاطئة"}
              </Text>
            )}
          </View>
        );
      })}
              </ScrollView>
    </View>
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
    fontSize: 16,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  choiceBtn: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  selected: {
    backgroundColor: "#c8e6c9",
  },
  choiceText: {
    fontSize: 24,
  },
  resultText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EasyFive;
