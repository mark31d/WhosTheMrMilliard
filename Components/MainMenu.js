// Components/MainMenu.js
import React from 'react';
import {
  ImageBackground,
  Image,
  Pressable,          // ← use Pressable instead of TouchableOpacity
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BG_IMG     from '../assets/background2.png';
import GEAR_IMG   from '../assets/Gear.png';

import TITLE1_IMG from '../assets/title1.png';
import HAT_IMG    from '../assets/hat.png';
import TITLE2_IMG from '../assets/title2.png';

import START_BTN_IMG from '../assets/StartGame.png';
import HOWTO_IMG     from '../assets/HowToPlay.png';
import LOCS_IMG      from '../assets/Locations.png';
import CHARS_IMG     from '../assets/Characters.png';

const { width } = Dimensions.get('window');

const TITLE1_W = width * 1;
const HAT_W    = width * 0.45;
const TITLE2_W = width * 0.80;
const BTN_W    = width * 0.85;
const BTN_H    = BTN_W * 0.22;
const ICON_W   = 76;

// Pressable button with press feedback
const PngButton = ({ source, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.btnWrap,
      // shrink a bit when pressed:
      pressed && { transform: [{ scale: 0.95 }], opacity: 0.7 },
    ]}
  >
    <Image source={source} style={styles.btnImg} resizeMode="contain" />
  </Pressable>
);

export default function MainMenu() {
  const nav = useNavigation();

  return (
    <ImageBackground source={BG_IMG} style={styles.bg} resizeMode="cover">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      {/* Gear */}
      <Pressable style={styles.gearTouch} onPress={() => nav.navigate('Settings')}>
        <Image source={GEAR_IMG} style={styles.gearImg} resizeMode="contain" />
      </Pressable>
      {/* Header */}
      <View style={styles.headerWrap}>
        <Image source={TITLE1_IMG} style={styles.title1} resizeMode="contain" />
        <Image source={HAT_IMG}    style={styles.hat}    resizeMode="contain" />
        <Image source={TITLE2_IMG} style={styles.title2} resizeMode="contain" />
      </View>
      {/* Buttons */}
      <PngButton source={START_BTN_IMG} onPress={() => nav.navigate('SetupPlayers')} />
      <PngButton source={HOWTO_IMG}     onPress={() => nav.navigate('HowToPlay')} />
      <PngButton source={LOCS_IMG}      onPress={() => nav.navigate('Locations')} />
      <PngButton source={CHARS_IMG}     onPress={() => nav.navigate('Characters')} />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
  },

  /* gear */
  gearTouch: { position: 'absolute', top: 55, right: 18, zIndex: 4 },
  gearImg:   { width: ICON_W, height: ICON_W  , marginTop:-30},

  /* заголовок */
  headerWrap: {
    alignItems: 'center',
    marginTop: 110,
    marginBottom: 50,
  },
  title1: {
    width: TITLE1_W,
    height: TITLE1_W * 0.19,
    marginTop:-10,
  },
  hat: {
    width: HAT_W,
    height: HAT_W,   // square; adjust height ratio if needed
    marginVertical:  -20, // pull it a bit overlapping if you like
    marginTop:-40,
  },
  title2: {
    width: TITLE2_W,
    height: TITLE2_W * 0.23,
    marginBottom:-40,
    marginTop:-10,
  },

  /* кнопки */
  btnWrap: { width: BTN_W, height: BTN_H, marginBottom: 10, alignItems: 'center' },
  btnImg:  { width: '100%', height: '100%' },
});
