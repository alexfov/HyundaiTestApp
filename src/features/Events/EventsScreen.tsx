import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { useGetPublicEventsQuery } from '_app/core/redux/api';
import { EventItem } from '_app/features/Events/__eventItem';
import { GithubEvent } from '_app/core/types/types';
import { useIsFocused } from '@react-navigation/native';

interface Props {}

export const EventsScreen = ({}: Props) => {
  const isFocused = useIsFocused();
  const { data, isLoading, refetch } = useGetPublicEventsQuery(25, {
    pollingInterval: 30 * 1000,
    skip: !isFocused,
    refetchOnMountOrArgChange: true,
  });

  const renderItem: ListRenderItem<GithubEvent> = useCallback(({ item }) => <EventItem item={item} />, []);
  const keyExtractor = useCallback((item: GithubEvent) => item.id, []);
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={isLoading}
      style={st.container}
      contentContainerStyle={st.contentContainerStyle}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={10}
      initialNumToRender={10}
      windowSize={10}
    />
  );
};

const st = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  contentContainerStyle: { paddingBottom: 50, paddingTop: 16 },
});
