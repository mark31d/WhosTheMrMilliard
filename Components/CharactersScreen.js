/* ------------------------------------------------------------------
   Components/CharactersScreen.js
   • Горизонтальный свайп-просмотр персонажей
   • Ribbon “Characters”  +  Back-кнопка
   • Вертикальный Scroll внутри страницы, чтобы описание
     никогда не “обрезалось” на маленьких экранах
------------------------------------------------------------------- */
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* ─── assets ─── */
const RIBBON_BG  = require('../assets/How_to_play.png');
const ARROW_BACK = require('../assets/arrow_back.png');

const { width, height } = Dimensions.get('window');

/* карточки персонажей (как прежде) */
const characters = [
  {
    id: 'milliard',
    name: 'Mr. Milliard',
    img: require('../assets/Mr.Milliard.png'),
    desc:
      '💼  You are Mr. Milliard.\n' +
      'Your identity is secret. Blend in with the crowd.\n' +
      'Your mission: identify the location whispered at the beginning of the game. Don’t get caught.',
  },
  {
    id: 'bodyguard',
    name: 'The Bodyguard',
    img: require('../assets/TheBodyguard.png'),
    desc:
      '🛡  You protect Mr. Milliard, but you don’t know who they are.\n' +
      'Find and subtly help Mr. Milliard without exposing them.',
  },
  {
    id: 'investigator',
    name: 'The Investigator',
    img: require('../assets/TheInvestigator.png'),
    desc:
      '🧐  You suspect everyone.\n' +
      'Uncover who Mr. Milliard is before he discovers the location.',
  },
  {
    id: 'impersonator',
    name: 'The Impersonator',
    img: require('../assets/TheImpersonator.png'),
    desc:
      '🎭  You imitate Mr. Milliard to confuse others.\n' +
      'Cause chaos and mislead the Investigator.',
  },
  {
    id: 'gossip',
    name: 'The Gossip',
    img: require('../assets/TheGossip.png'),
    desc:
      '📣  You know nothing, but act like you know everything.\n' +
      'Distract and confuse. Win if nobody guesses correctly.',
  },
  {
    id: 'observer',
    name: 'The Observer',
    img: require('../assets/TheObserver.png'),
    desc:
      '👓  You listen more than you talk.\n' +
      'Win if you correctly guess who Mr. Milliard is.',
  },
  {
    id: 'double_agent',
    name: 'The Double Agent',
    img: require('../assets/TheDoubleAgent.png'),
    desc:
      '♟  You serve two masters.\n' +
      'You know the real location and aim to sell that info to the wrong player.',
  },
];

export default function CharactersScreen() {
  const navigation        = useNavigation();
  const [index, setIndex] = useState(0);
  const listRef           = useRef(null);

  /* отслеживаем текущую страницу */
  const onView = useRef(({ viewableItems }) => {
    if (viewableItems.length) setIndex(viewableItems[0].index);
  }).current;

  return (
    <View style={styles.wrap}>
      {/* Back */}
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <Image source={ARROW_BACK} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Ribbon */}
      <View style={styles.ribbonBox}>
        <Image source={RIBBON_BG} style={styles.ribbonImg} />
        <Text style={styles.ribbonTxt}>Characters</Text>
      </View>

      {/* Swipeable pages */}
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onView}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        ref={listRef}
        renderItem={({ item }) => (
          <View style={styles.page}>
            <Text style={styles.name}>{item.name}</Text>

            {/* изображение с чуть меньшей высотой, чтобы освободить место под текст */}
            <Image source={item.img} style={styles.pic} />

            {/* скролл-контейнер для описания */}
            <ScrollView
              style={styles.descScroll}
              contentContainerStyle={styles.descContainer}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              <Text style={styles.descTxt}>{item.desc}</Text>
            </ScrollView>
          </View>
        )}
      />

      {/* dots-indicator */}
      <View style={styles.dots}>
        {characters.map((_, i) => (
          <View key={i} style={[styles.dot, { opacity: i === index ? 1 : 0.35 }]} />
        ))}
      </View>
    </View>
  );
}

/* ─── styles ─── */
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#ff4a02',
    paddingTop: 60,
    alignItems: 'center',
  },

  /* back */
  backBtn:  { position: 'absolute', top: 20, left: 12, padding: 8, zIndex: 10 },
  backIcon: { width: 150, height: 27, resizeMode: 'contain' },

  /* ribbon */
  ribbonBox: { width, height: 60, marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  ribbonImg: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'contain' },
  ribbonTxt: { fontSize: 24, fontWeight: '700', color: '#fff' },

  /* page */
  page: { width, alignItems: 'center', paddingHorizontal: 24, flex: 1 },
  name: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 8 },

  /* картинка – чуть меньше, чтобы текст помещался на маленьких экранах */
  pic: {
    width: width * 0.65,
    height: width * 0.8,
    resizeMode: 'contain',
    marginBottom: 12,
  },

  /* прокручиваемое описание */
  descScroll: { maxHeight: height * 0.25, alignSelf: 'stretch' },
  descContainer: { paddingBottom: 2 },
  descTxt: { fontSize: 16, lineHeight: 22, textAlign: 'center', color: '#fff' },

  /* dots */
  dots: { flexDirection: 'row', marginBottom: 26 },
  dot:  { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffb100', marginHorizontal: 4 },
});
