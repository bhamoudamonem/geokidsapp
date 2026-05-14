// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   TouchableOpacity,
//   Modal,
// } from "react-native";
// import React, { useState } from "react";

// const trade = [
//   {
//     country: "تونس",
//     exports: 357.47,
//     imports: 792.46,
//     tradeBalance: -434.99,
//   },
//   {
//     country: "الجزائر",
//     exports: 18.33,
//     imports: 2640.34,
//     tradeBalance: -2622.01,
//   },
//   {
//     country: "المغرب",
//     exports: 928.27,
//     imports: 1273.17,
//     tradeBalance: -344.9,
//   },
//   {
//     country: "ليبيا",
//     exports: 6.15,
//     imports: 614.26,
//     tradeBalance: -608.11,
//   },
//   {
//     country: "موريتانيا",
//     exports: 154.66,
//     imports: 100.96,
//     tradeBalance: 53.79,
//   },
// ];

// const HardBalancer = () => {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showResult, setShowResult] = useState(false);

//   const isDeficit = selectedCountry && selectedCountry.tradeBalance < 0;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>ميزان المبادلات التجارية</Text>

//       {/* Country selector */}
//       <Pressable
//         style={styles.countryBox}
//         onLongPress={() => setShowModal(true)}
//       >
//         <Text style={styles.countryText}>
//           {selectedCountry
//             ? selectedCountry.country
//             : "اضغط مطولًا لاختيار البلد"}
//         </Text>
//       </Pressable>

//       {/* Balance */}
//       {selectedCountry && (
//         <View style={styles.balanceContainer}>
//           {/* Imports */}
//           <View
//             style={[
//               styles.side,
//               {
//                 flex: selectedCountry.imports > selectedCountry.exports ? 2 : 1,
//                 backgroundColor: "#ffcdd2",
//               },
//             ]}
//           >
//             <Text style={styles.sideTitle}>الواردات</Text>
//             <Text>{selectedCountry.imports}</Text>
//           </View>

//           <Text style={styles.pivot}>⚖️</Text>

//           {/* Exports */}
//           <View
//             style={[
//               styles.side,
//               {
//                 flex: selectedCountry.exports > selectedCountry.imports ? 2 : 1,
//                 backgroundColor: "#c8e6c9",
//               },
//             ]}
//           >
//             <Text style={styles.sideTitle}>الصادرات</Text>
//             <Text>{selectedCountry.exports}</Text>
//           </View>
//         </View>
//       )}

//       {/* Reveal result */}
//       {selectedCountry && !showResult && (
//         <TouchableOpacity
//           style={styles.revealBtn}
//           onPress={() => setShowResult(true)}
//         >
//           <Text style={styles.revealText}>اكشف النتيجة</Text>
//         </TouchableOpacity>
//       )}

//       {/* Result */}
//       {showResult && selectedCountry && (
//         <View style={styles.resultBox}>
//           <Text style={styles.resultText}>
//             {isDeficit
//               ? "✘ يسجّل هذا البلد عجزًا تجاريًا"
//               : "✔ يسجّل هذا البلد فائضًا تجاريًا"}
//           </Text>
//         </View>
//       )}

//       {/* Country modal */}
//       <Modal visible={showModal} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalBox}>
//             {trade.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.modalItem}
//                 onPress={() => {
//                   setSelectedCountry(item);
//                   setShowResult(false);
//                   setShowModal(false);
//                 }}
//               >
//                 <Text style={styles.modalText}>{item.country}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   countryBox: {
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   countryText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   balanceContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     height: 120,
//     marginBottom: 20,
//   },
//   side: {
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     padding: 10,
//   },
//   sideTitle: {
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   pivot: {
//     fontSize: 28,
//     marginHorizontal: 10,
//   },
//   revealBtn: {
//     backgroundColor: "#2196F3",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   revealText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   resultBox: {
//     marginTop: 20,
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 12,
//   },
//   resultText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalBox: {
//     backgroundColor: "#fff",
//     width: "80%",
//     borderRadius: 12,
//     padding: 10,
//   },
//   modalItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: "#eee",
//   },
//   modalText: {
//     fontSize: 16,
//     textAlign: "center",
//   },
// });

// export default HardBalancer;

import { useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";

const trade = [
  { country: "تونس", exports: 357.47, imports: 792.46, tradeBalance: -434.99 },
  {
    country: "الجزائر",
    exports: 18.33,
    imports: 2640.34,
    tradeBalance: -2622.01,
  },
  {
    country: "المغرب",
    exports: 928.27,
    imports: 1273.17,
    tradeBalance: -344.9,
  },
  { country: "ليبيا", exports: 6.15, imports: 614.26, tradeBalance: -608.11 },
  {
    country: "موريتانيا",
    exports: 154.66,
    imports: 100.96,
    tradeBalance: 53.79,
  },
];

const HardBalancer = () => {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animateBalance = (balance) => {
    Animated.timing(rotateAnim, {
      toValue: balance < 0 ? 12 : -12,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(true);
    });
  };

  const handleCheck = () => {
    if (selected) {
      animateBalance(selected.tradeBalance);
    }
  };

  const handleCountrySelect = (item) => {
    setSelected(item);
    setShowResult(false);
    rotateAnim.setValue(0); // Reset rotation
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [-15, 15],
    outputRange: ["-15deg", "15deg"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختر البلد</Text>

      {/* COUNTRIES */}
      <View style={styles.countries}>
        {trade.map((item) => (
          <Pressable
            key={item.country}
            style={[
              styles.countryBtn,
              selected?.country === item.country && styles.activeCountry,
            ]}
            onPress={() => handleCountrySelect(item)}
          >
            <Text>{item.country}</Text>
          </Pressable>
        ))}
      </View>

      {/* BALANCER */}
      {selected && (
        <>
          <View style={styles.balancerContainer}>
            {/* ARM WITH PLATES */}
            <Animated.View
              style={[
                styles.armContainer,
                { transform: [{ rotate: rotation }] },
              ]}
            >
              <View style={styles.arm}>
                {/* LEFT SIDE - EXPORTS */}
                <View style={[styles.side, { left: 0 }]}>
                  <View style={styles.rope} />
                  <View style={styles.plate}>
                    <Text style={styles.label}>الصادرات</Text>
                    <Text style={styles.value}>
                      {showResult ? selected.exports : null}
                    </Text>
                  </View>
                </View>

                {/* RIGHT SIDE - IMPORTS */}
                <View style={[styles.side, { right: 0 }]}>
                  <View style={styles.rope} />
                  <View style={styles.plate}>
                    <Text style={styles.label}>الواردات</Text>
                    <Text style={styles.value}>
                      {showResult ? selected.imports : null}
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>

            {/* CENTER POLE */}
            <View style={styles.centerPole} />
            <View style={styles.base} />
          </View>

          {/* CHECK BUTTON */}
          <Pressable style={styles.checkBtn} onPress={handleCheck}>
            <Text style={styles.checkText}>تحقّق من النتيجة</Text>
          </Pressable>

          {/* RESULT */}
          {showResult && (
            <Text style={styles.result}>
              {selected.tradeBalance < 0
                ? "النتيجة: عجز تجاري"
                : "النتيجة: فائض تجاري"}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
  },
  countries: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  countryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#eee",
    borderRadius: 20,
    margin: 5,
  },
  activeCountry: {
    backgroundColor: "#cdeffd",
  },
  balancerContainer: {
    alignItems: "center",
    marginVertical: 30,
    width: "100%",
  },
  armContainer: {
    width: 280,
    alignItems: "center",
  },
  arm: {
    width: "100%",
    height: 8,
    backgroundColor: "#8b4513",
    borderRadius: 4,
    position: "relative",
  },
  side: {
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  rope: {
    width: 2,
    height: 30,
    backgroundColor: "#666",
    marginBottom: 5,
  },
  plate: {
    width: 90,
    height: 70,
    backgroundColor: "#FFD700",
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#DAA520",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
  },
  value: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 4,
  },
  centerPole: {
    width: 8,
    height: 100,
    backgroundColor: "#8b4513",
    marginTop: -4,
    borderRadius: 4,
  },
  base: {
    width: 80,
    height: 20,
    backgroundColor: "#654321",
    borderRadius: 10,
  },
  checkBtn: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  checkText: {
    color: "#fff",
    fontSize: 16,
  },
  result: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HardBalancer;
