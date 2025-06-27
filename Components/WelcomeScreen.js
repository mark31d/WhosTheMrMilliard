// Components/WelcomeScreen.js
import React from 'react'
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import BG_IMG       from '../assets/background.png'
import CARD_CENTRE  from '../assets/Mr.Milliard.png'
import CARD_LEFT    from '../assets/TheImpersonator.png'
import CARD_RIGHT   from '../assets/TheDoubleAgent.png'
import TITLE1_IMG   from '../assets/title1.png'
import TITLE2_IMG   from '../assets/title2.png'
import TEXT_IMG     from '../assets/text.png'
import BTN_IMG      from '../assets/gamestart.png'

const { width, height } = Dimensions.get('window')

const CARD_W       = width * 0.40
const CARD_H       = CARD_W * 1.7

const TITLE1_W     = width * 0.9
const TITLE2_W     = width * 0.95

const BTN_H        = 180
const BTN_MARGIN_B = 80

export default function WelcomeScreen() {
  const nav = useNavigation()

  return (
    <ImageBackground source={BG_IMG} style={styles.bg} resizeMode="cover">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* cards above */}
      <View style={styles.cardsWrap}>
        <Image source={CARD_LEFT}   style={[styles.card, styles.cardLeft]}   resizeMode="contain" />
        <Image source={CARD_CENTRE} style={[styles.card, styles.cardCentre]} resizeMode="contain" />
        <Image source={CARD_RIGHT}  style={[styles.card, styles.cardRight]}  resizeMode="contain" />
      </View>

      {/* titles centered */}
      <View style={styles.titlesWrap}>
        <Image source={TITLE1_IMG} style={styles.title1} resizeMode="contain" />
        <Image source={TITLE2_IMG} style={styles.title2} resizeMode="contain" />
      </View>

      {/* text image + button below */}
      <View style={styles.bottomWrap}>
        <Image source={TEXT_IMG} style={styles.textImg} resizeMode="contain" />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => nav.navigate('Menu')}
          style={styles.btnWrap}
        >
          <ImageBackground source={BTN_IMG} style={styles.btnBg} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
  },

  cardsWrap: {
    width,
    alignItems: 'center',
    marginTop: 40,
  },
  card: {
    position: 'absolute',
    width: CARD_W,
    height: CARD_H,
  },
  cardCentre: { zIndex: 2, top: -30 },
  cardLeft:   { left: -width * 0.01, top: 20, transform: [{ rotate: '-23deg' }], zIndex: 1 },
  cardRight:  { right: -width * 0.0001, top: 20, transform: [{ rotate: '13deg' }], zIndex: 3 },

  titlesWrap: {
    position: 'absolute',
    top: height * 0.45,
    alignItems: 'center',
    zIndex: 10,
  },
  title1: {
    width: TITLE1_W,
    height: TITLE1_W * 0.23,
  },
  title2: {
    width: TITLE2_W,
    height: TITLE2_W * 0.21,
    marginTop: -8,
  },

  bottomWrap: {
    position: 'absolute',
    top: height * 0.65,
    alignItems: 'center',
    width: '100%',
  },

  textImg: {
    width: width * 0.9,
    height: (width * 0.9) * 0.3,
    marginTop: 20,
    marginBottom: 24,
  },

  btnWrap: {
    marginTop:-50,
    width:350,
    marginBottom: BTN_MARGIN_B,
  },
  btnBg: {
    width: '100%',
    height: BTN_H,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
