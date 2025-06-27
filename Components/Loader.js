import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

/* ---- графіка у каталозі ./assets ---- */
import BG   from '../assets/background.png';   // помаранчевий градієнт-боке
import HAT  from '../assets/hat.png';          // циліндр із жовтою стрічкою

const { width } = Dimensions.get('window');
const HAT_SIZE = width * 0.55;   // ~55 % ширини екрана

export default function Loader() {
  /* кут обертання (deg) */
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    /* нескінченна анімація 0 → 1 за 2 с, з лінійною інтерполяцією */
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }, [spin]);

  /* інтерполяція 0-1 у 0-360 градусів */
  const spinDeg = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground source={BG} style={styles.bg} resizeMode="cover">
      <View style={styles.center}>
        <Animated.Image
          source={HAT}
          style={[styles.hat, { transform: [{ rotate: spinDeg }] }]}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
}

/* ─────────── styles ─────────── */
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hat: {
    width: HAT_SIZE,
    height: HAT_SIZE,
  },
});
