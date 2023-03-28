import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, RootStackScreens } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { EventsScreen } from '_app/features/Events/EventsScreen';
import { EventDetailsScreen } from '_app/features/EventDetails/EventDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: 'Back',
          headerTitleStyle: {
            fontSize: 17,
          },
        }}
      >
        <Stack.Screen name={RootStackScreens.Events} component={EventsScreen} />
        <Stack.Screen
          name={RootStackScreens.EventDetails}
          component={EventDetailsScreen}
          options={{
            title: 'Event details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
