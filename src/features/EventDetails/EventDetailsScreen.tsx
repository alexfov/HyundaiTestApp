import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RootStackParamList, RootStackScreens } from '_app/core/navigation/types';
import { useGetPublicEventsQuery } from '_app/core/redux/api';
import { find } from 'lodash';
import { Avatar } from '_app/components/Avatar/Avatar';
import { ScrollView } from 'react-native-gesture-handler';
import dayjs from 'dayjs';

interface Props {}

type RouteType = RouteProp<RootStackParamList, typeof RootStackScreens.EventDetails>;

export const EventDetailsScreen = ({}: Props) => {
  const route = useRoute<RouteType>();
  const id = route.params.id;
  const { event } = useGetPublicEventsQuery(25, {
    selectFromResult: ({ data }) => ({
      event: find(data, { id }),
    }),
  });

  if (!event) {
    return null;
  }
  const { type, actor, created_at, repo } = event;
  const date = dayjs(created_at).format('DD MMM YYYY HH:mm:ss');
  return (
    <ScrollView style={st.container} contentContainerStyle={st.contentContainerStyle}>
      <Avatar uri={actor?.avatar_url} />
      <Text>{actor.login}</Text>
      <Text>{type}</Text>
      <Text>repo name: {repo.name}</Text>
      <Text>{date}</Text>
    </ScrollView>
  );
};

const st = StyleSheet.create({
  container: { flex: 1 },
  contentContainerStyle: { padding: 16 },
});
