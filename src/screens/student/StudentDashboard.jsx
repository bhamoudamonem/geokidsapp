import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  ActivityIndicator,
  PanResponder,
  Animated,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");



const StudentDashboard = ({ navigation }) => {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "m0",
      role: "assistant",
      content:
        "مرحباً! أنا مساعدك الذكي. اسألني عن الجغرافيا أو أي موضوع تعليمي.",
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  const chatListRef = useRef(null);
  const position = useRef({ x: 20, y: height - 100 });
  const panX = useRef(new Animated.Value(20)).current;
  const panY = useRef(new Animated.Value(height - 100)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 0.9,
          useNativeDriver: true,
          tension: 150,
          friction: 4,
        }).start();
      },
      onPanResponderMove: (_, gestureState) => {
        const newX = position.current.x + gestureState.dx;
        const newY = position.current.y + gestureState.dy;

        panX.setValue(newX);
        panY.setValue(newY);
      },
      onPanResponderRelease: (_, gestureState) => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 150,
          friction: 4,
        }).start();

        let finalX = position.current.x + gestureState.dx;
        let finalY = position.current.y + gestureState.dy;

        finalX += gestureState.vx * 50;
        finalY += gestureState.vy * 50;

        const snapThreshold = width / 2;
        const buttonWidth = 60;
        const snapMargin = 20;

        if (finalX < snapThreshold) {
          finalX = snapMargin;
        } else {
          finalX = width - buttonWidth - snapMargin;
        }

        const topBoundary = 50;
        const bottomBoundary = height - 100;

        if (finalY < topBoundary) {
          finalY = topBoundary;
        } else if (finalY > bottomBoundary) {
          finalY = bottomBoundary;
        }

        Animated.spring(panX, {
          toValue: finalX,
          useNativeDriver: true,
          tension: 150,
          friction: 10,
        }).start();

        Animated.spring(panY, {
          toValue: finalY,
          useNativeDriver: true,
          tension: 150,
          friction: 10,
        }).start();

        position.current = { x: finalX, y: finalY };

        if (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5) {
          setIsAiOpen(true);
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 150,
          friction: 4,
        }).start();

        Animated.spring(panX, {
          toValue: position.current.x,
          useNativeDriver: true,
          tension: 150,
          friction: 10,
        }).start();

        Animated.spring(panY, {
          toValue: position.current.y,
          useNativeDriver: true,
          tension: 150,
          friction: 10,
        }).start();
      },
    }),
  ).current;

  const cryptoId = () => {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  const handleAiAsk = async () => {
    const text = aiQuery.trim();
    if (!text || aiLoading) return;

    if (!API_KEY) {
      setMessages((prev) => [
        ...prev,
        {
          id: cryptoId(),
          role: "assistant",
          content:
            "خطأ: EXPO_PUBLIC_GROQ_API_KEY مفقود في ملف .env. أعد تشغيل Expo مع: npx expo start -c",
        },
      ]);
      return;
    }

    const userMsg = { id: cryptoId(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setAiQuery("");
    setAiLoading(true);

    try {
      const last = [...messages, userMsg].slice(-12);

      const payload = {
        model: MODEL,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "أنت مساعد تعليمي ذكي متخصص في الجغرافيا (مستوى المدرسة الإعدادية). قدم إجابات قصيرة وواضحة وتعليمية باللغة العربية.",
          },
          ...last.map((m) => ({ role: m.role, content: m.content })),
        ],
      };

      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: cryptoId(),
            role: "assistant",
            content: `خطأ Groq (${res.status}): ${raw || "استجابة فارغة"}`,
          },
        ]);
        return;
      }

      const data = JSON.parse(raw);
      const reply = data?.choices?.[0]?.message?.content ?? "(لا توجد استجابة)";
      setMessages((prev) => [
        ...prev,
        { id: cryptoId(), role: "assistant", content: reply },
      ]);

      setTimeout(() => {
        chatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: cryptoId(), role: "assistant", content: `خطأ: ${String(e)}` },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsAiOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            استكشف عالمك {"\n"}
            <Text style={styles.heroHighlight}>بذكاء!</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            حوّل درس الجغرافيا إلى مغامرة رقمية
          </Text>
          <TouchableOpacity
            style={styles.startJourneyButton}
            onPress={() => navigation.navigate("Lessons")}
          >
            <Text style={styles.startJourneyText}>ابدأ الرحلة 🚀</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Tasks */}
        <View style={styles.tasksSection}>
          <View style={styles.taskCard}>
            <Text style={styles.taskIcon}>🧭</Text>
            <View style={styles.taskContent}>
              <Text style={styles.taskTitle}>مهمة اليوم</Text>
              <Text style={styles.taskDescription}>
                اكتشف الفرق بين المناخ المتوسطي والصحراوي
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.taskCard, styles.achievementCard]}
            onPress={() => navigation.navigate("Trophy")}
          >
            <Text style={styles.taskIcon}>🏆</Text>
            <View style={styles.taskContent}>
              <Text style={[styles.taskTitle, styles.achievementTitle]}>
                أعلى نتيجة
              </Text>
              <Text
                style={[styles.taskDescription, styles.achievementDescription]}
              >
                أحمد حصل على 500 نقطة في تحدي السياحة
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.taskCard}
            onPress={() => navigation.navigate("Games")}
          >
            <Text style={styles.taskIcon}>🎮</Text>
            <View style={styles.taskContent}>
              <Text style={styles.taskTitle}>الألعاب</Text>
              <Text style={styles.taskDescription}>
                العب وتعلم مع ألعاب الجغرافيا التفاعلية
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>إحصائيات سريعة</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>دروس مكتملة</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>ألعاب لُعبت</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>420</Text>
              <Text style={styles.statLabel}>نقطة</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Draggable AI Button Bubble */}
      <Animated.View
        style={[
          styles.aiButtonContainer,
          {
            transform: [
              { translateX: panX },
              { translateY: panY },
              { scale: scale },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.aiButton}
          activeOpacity={0.7}
          onPress={() => setIsAiOpen(true)}
        >
          <Text style={styles.aiButtonIcon}>🤖</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal
        visible={isAiOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >

        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>المساعد الذكي</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Icon name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            <FlatList
              ref={chatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.chatList}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.messageBubble,
                    item.role === "user"
                      ? styles.userMessage
                      : styles.assistantMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{item.content}</Text>
                </View>
              )}
              onContentSizeChange={() =>
                chatListRef.current?.scrollToEnd({ animated: true })
              }
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={aiQuery}
                onChangeText={setAiQuery}
                placeholder="اكتب سؤالك هنا..."
                placeholderTextColor="#999"
                multiline
                textAlign="right"
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!aiQuery.trim() || aiLoading) && styles.sendButtonDisabled,
                ]}
                onPress={handleAiAsk}
                disabled={!aiQuery.trim() || aiLoading}
              >
                {aiLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.sendButtonText}>إرسال</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          </View>
          </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heroSection: {
    backgroundColor: "#4F46E5",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    lineHeight: 34,
    marginBottom: 8,
  },
  heroHighlight: {
    color: "#FBBF24",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 20,
  },
  startJourneyButton: {
    backgroundColor: "#FBBF24",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startJourneyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  tasksSection: {
    gap: 12,
    marginBottom: 24,
  },
  taskCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementCard: {
    backgroundColor: "#4F46E5",
  },
  taskIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 4,
    textAlign: "right",
  },
  achievementTitle: {
    color: "#FBBF24",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  achievementDescription: {
    color: "rgba(255,255,255,0.9)",
  },
  statsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "right",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  aiButtonContainer: {
    position: "absolute",
    top: -57,
    left: 0,
    zIndex: 1000,
  },
  aiButton: {
    width: 60,
    height: 60,
    backgroundColor: "#4F46E5",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  aiButtonIcon: {
    fontSize: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom:29,
  },
  modalHeader: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  modalSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
  },
  chatList: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: "85%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4F46E5",
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "right",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4F46E5",
  },
  userMessage: {
    backgroundColor: "#4F46E5",
  },
  assistantMessage: {
    backgroundColor: "#F3F4F6",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4F46E5",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "right",
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
  },
  inputContainer: {
  flexDirection: "row",
  padding: 16,
  borderTopWidth: 1,
  borderTopColor: "#E5E7EB",
  backgroundColor: "#FFF", // keeps it visible
},
  textInput: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#374151",
    textAlignVertical: "top",
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    minWidth: 80,
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
});

export default StudentDashboard;
