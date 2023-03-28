import { StackNavigationProp } from '@react-navigation/stack';

export enum RootStackScreens {
  Events = 'Events',
  EventDetails = 'EventDetails',
}

export type RootStackParamList = {
  [RootStackScreens.Events]: undefined;
  [RootStackScreens.EventDetails]: { id: string };
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
