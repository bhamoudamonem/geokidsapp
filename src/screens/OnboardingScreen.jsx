import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
  PanResponder,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);

  const iconFadeAnim = useRef(new Animated.Value(0)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.8)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;
  const titleSlideAnim = useRef(new Animated.Value(50)).current;
  const descriptionFadeAnim = useRef(new Animated.Value(0)).current;

  const onboardingData = [
    {
      id: 1,
      title: "جغرافي",
      description:
        "حوّل كتاب الجغرافيا الممل إلى تجربة تفاعلية مذهلة عبر تقنيات الذكاء الاصطناعي والواقع المعزز.",
      icon: "🌍",
      color: "#4F46E5",
      bgColor: "#EEF2FF",
      iconAnimation: "rotate",
    },
    {
      id: 2,
      title: "تعلم بالذكاء الاصطناعي",
      description:
        "محادثات ذكية مع مساعد جغرافي يفهم أسئلتك ويشرح المفاصل بطريقة سهلة وممتعة.",
      icon: "🤖",
      color: "#059669",
      bgColor: "#D1FAE5",
      iconAnimation: "bounce",
    },
    {
      id: 3,
      title: "خرائط تفاعلية",
      description:
        "استكشف العالم عبر خرائط ثلاثية الأبعاد وتحديات الواقع المعزز التي تجعل التعلم مغامرة.",
      icon: "🗺️",
      color: "#DC2626",
      bgColor: "#FEE2E2",
      iconAnimation: "pulse",
    },
  ];

  // PanResponder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        const swipeThreshold = 50;

        if (Math.abs(dx) > swipeThreshold) {
          if (dx > 0 && currentPage > 0) {
            // Swipe right - go to previous page
            handleScroll(currentPage - 1);
          } else if (dx < 0 && currentPage < onboardingData.length - 1) {
            // Swipe left - go to next page
            handleScroll(currentPage + 1);
          }
        }
      },
    })
  ).current;

  const handleScroll = (pageIndex) => {
    scrollViewRef.current.scrollTo({
      x: width * pageIndex,
      animated: true,
    });
    setCurrentPage(pageIndex);
  };

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      handleScroll(currentPage + 1);
    }
  };

  const handleSkip = () => {
    handleScroll(onboardingData.length - 1);
    console.log("handle skip");
  };

  const handleGetStarted = () => {
    navigation.navigate("RoleSelection");
    console.log("clicked");
  };

  const animatePage = () => {
    // Reset animations
    iconFadeAnim.setValue(0);
    iconScaleAnim.setValue(0.8);
    iconRotateAnim.setValue(0);
    titleSlideAnim.setValue(50);
    descriptionFadeAnim.setValue(0);

    const currentData = onboardingData[currentPage];

    // Icon animations based on type
    let iconAnimation;
    if (currentData.iconAnimation === "rotate") {
      iconAnimation = Animated.sequence([
        Animated.timing(iconRotateAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(iconRotateAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]);
    } else if (currentData.iconAnimation === "bounce") {
      iconAnimation = Animated.sequence([
        Animated.spring(iconScaleAnim, {
          toValue: 1.2,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(iconScaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]);
    } else {
      // Pulse animation
      iconAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(iconScaleAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(iconScaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
    }

    // Run all animations
    Animated.parallel([
      Animated.timing(iconFadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      iconAnimation,
      Animated.timing(titleSlideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(descriptionFadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animatePage();
  }, [currentPage]);

  const renderPage = (item, index) => {
    const rotateInterpolate = iconRotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const slideInterpolate = titleSlideAnim.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 50],
    });

    return (
      <View key={item.id} style={[styles.page, { width }]}>
        <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
          <Animated.Text
            style={[
              styles.icon,
              {
                opacity: iconFadeAnim,
                transform: [
                  { scale: iconScaleAnim },
                  {
                    rotate:
                      item.iconAnimation === "rotate"
                        ? rotateInterpolate
                        : "0deg",
                  },
                ],
              },
            ]}
          >
            {item.icon}
          </Animated.Text>
        </View>

        <View style={styles.content}>
          <Animated.Text
            style={[
              styles.title,
              { color: item.color },
              {
                transform: [{ translateY: slideInterpolate }],
                opacity: iconFadeAnim,
              },
            ]}
          >
            {item.title}
          </Animated.Text>

          <Animated.Text
            style={[
              styles.description,
              {
                opacity: descriptionFadeAnim,
              },
            ]}
          >
            {item.description}
          </Animated.Text>
        </View>

        {index === onboardingData.length - 1 && (
          <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: item.color }]}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedText}>ابدأ الرحلة</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingData.map((_, index) => (
        <TouchableOpacity key={index} onPress={() => handleScroll(index)}>
          <View
            style={[
              styles.dot,
              currentPage === index && styles.activeDot,
              currentPage === index && {
                backgroundColor: onboardingData[index].color,
              },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const page = Math.round(offsetX / width);
          if (page !== currentPage) {
            setCurrentPage(page);
          }
        }}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingData.map(renderPage)}
      </ScrollView>

      <View style={styles.footer}>
        {renderDots()}

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>تخطي</Text>
          </TouchableOpacity>

          {currentPage < onboardingData.length - 1 && (
            <TouchableOpacity
              onPress={handleNext}
              style={[
                styles.nextButton,
                {
                  backgroundColor: onboardingData[currentPage].color,
                },
              ]}
            >
              <Text style={styles.nextText}>التالي </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  icon: {
    fontSize: 80,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    color: "#4B5563",
    paddingHorizontal: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  nextText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  getStartedButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 16,
    marginTop: 40,
    ...Platform.select({
      ios: {
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  getStartedText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
