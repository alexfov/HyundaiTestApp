import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RootStackParamList, RootStackScreens } from '_app/core/navigation/types';
import { Avatar } from '_app/components/Avatar/Avatar';
import { ScrollView } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import { useEvent } from '_app/features/Events/__useEvent';

interface Props {}

type RouteType = RouteProp<RootStackParamList, typeof RootStackScreens.EventDetails>;

export const EventDetailsScreen = ({}: Props) => {
  const route = useRoute<RouteType>();
  const id = route.params.id;
  const event = useEvent({ id });

  if (!event) {
    return <Text>event not found</Text>;
  }

  const { type, actor, created_at, repo } = event;
  const date = dayjs(created_at).format('DD MMM YYYY HH:mm:ss');
  return (
    <ScrollView style={st.container} contentContainerStyle={st.contentContainerStyle}>
      <Avatar uri={actor?.avatar_url} />
      <Text style={st.text}>{actor.login}</Text>
      <Text style={st.text}>{type}</Text>
      <Text style={st.text}>repo name: {repo.name}</Text>
      <Text style={st.text}>{date}</Text>
    </ScrollView>
  );
};

const st = StyleSheet.create({
  container: { flex: 1 },
  contentContainerStyle: { padding: 16 },
  text: {
    color: 'black',
  },
});
