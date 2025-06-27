// App.js
import React, { useEffect, useState }           from 'react';
import { StatusBar, Platform }                  from 'react-native';
import { NavigationContainer, DefaultTheme }    from '@react-navigation/native';
import { createStackNavigator }                 from '@react-navigation/stack';
import { SafeAreaProvider }                     from 'react-native-safe-area-context';

/* ─────────── ЭКРАНЫ (все из ./Components) ─────────── */

import WelcomeScreen       from './Components/WelcomeScreen';
import MainMenu            from './Components/MainMenu';
import GameSetupPlayers    from './Components/GameSetupPlayers';
import GameSetupLocation   from './Components/GameSetupLocation';
import RoleRevealScreen    from './Components/RoleRevealScreen';
import RoundTimerScreen    from './Components/RoundTimerScreen';
import HowToPlay           from './Components/HowToPlay';
import LocationsScreen     from './Components/LocationsScreen';
import CharactersScreen    from './Components/CharactersScreen';
import SettingsScreen      from './Components/SettingsScreen';
import Loader              from './Components/Loader'; 
import MilliardRevealScreen from './Components/MilliardRevealScreen';
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FF4A00',
    text:       '#FFFFFF',
    card:       '#FF4A00',
  },
};

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000);     // splash 2 c
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
      />

      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          { !loaded ? (
             <Stack.Screen name="Loader" component={Loader} />
            ) : (
              <>
                {/* Intro + главное меню */}
                <Stack.Screen name="Welcome"     component={WelcomeScreen} />
                <Stack.Screen name="Menu"        component={MainMenu}      />

                {/* Flow игры */}
                <Stack.Screen name="SetupPlayers"  component={GameSetupPlayers} />
                <Stack.Screen name="GameSetupLocation" component={GameSetupLocation} />
                <Stack.Screen name="RoleRevealScreen"    component={RoleRevealScreen} />
                <Stack.Screen name="RoundTimerScreen"    component={RoundTimerScreen} />

                {/* Справка / статика */}
                <Stack.Screen name="HowToPlay"   component={HowToPlay}     />
                <Stack.Screen name="Locations"   component={LocationsScreen} />
                <Stack.Screen name="Characters"  component={CharactersScreen} />
                <Stack.Screen name="Settings"    component={SettingsScreen} />
                <Stack.Screen name="MilliardRevealScreen"    component={MilliardRevealScreen} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
