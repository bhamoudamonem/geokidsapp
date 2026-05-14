import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

const quiz = [
  {
    question: "أيّ من هذه السلع يُعدّ من الصادرات؟",
    options: ["القمح", "السكر", "زيت الزيتون"],
    correctIndex: 2,
  },
  {
    question: "أيّ ممّا يلي يُعدّ من الواردات؟",
    options: ["الفسفاط", "السيارات", "التمور"],
    correctIndex: 1,
  },
  {
    question: "الميزان التجاري يُحسب خلال:",
    options: ["سنة", "أسبوع", "شهر"],
    correctIndex: 0,
  },
];

const Easysix = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz[currentIndex];

  const handleAnswer = (index) => {
    if (showResult) return;

    setSelected(index);
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelected(null);
      setCurrentIndex((prev) => prev + 1);
    }, 2200);
  };

  if (currentIndex >= quiz.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>🎉 أحسنت! لقد أنهيت التمرين</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>اختر الإجابة الصحيحة من بين المقترحات</Text>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctIndex;
          const isSelected = index === selected;

          let bgColor = "#eee";

          if (showResult && isCorrect) bgColor = "#c8e6c9";
          else if (showResult && isSelected && !isCorrect) bgColor = "#ffcdd2";

          return (
            <TouchableOpacity
              key={index}
              style={[styles.choiceBtn, { backgroundColor: bgColor }]}
              onPress={() => handleAnswer(index)}
              disabled={showResult}
            >
              <Text style={styles.choiceText}>{option}</Text>
            </TouchableOpacity>
          );
        })}

        {showResult && (
          <Text style={styles.resultText}>
            {selected === currentQuestion.correctIndex
              ? "✔ إجابة صحيحة"
              : "✘ إجابة خاطئة"}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
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
    padding: 16,
    elevation: 3,
  },
  questionText: {
    fontSize: 17,
    marginBottom: 14,
    textAlign: "center",
  },
  choiceBtn: {
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  choiceText: {
    fontSize: 16,
    textAlign: "center",
  },
  resultText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Easysix;
