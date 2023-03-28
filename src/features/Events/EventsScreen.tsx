import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { EventItem } from '_app/features/Events/__eventItem';
import { GithubEvent } from '_app/types/types';
import { useEventsPooling } from '_app/features/Events/__useEventsPooling';
import { EmptyComponent } from '_app/features/Events/__emptyComponent';

interface Props {}

export const EventsScreen = ({}: Props) => {
  const { events, isFetching, refetch, resetInterval } = useEventsPooling({ count: 25 });

  const renderItem: ListRenderItem<GithubEvent> = useCallback(({ item }) => <EventItem item={item} />, []);
  const keyExtractor = useCallback((item: GithubEvent) => item.id, []);
  const onRefresh = useCallback(() => {
    refetch();
    //we need to reset the pooling interval timer
    resetInterval();
  }, [refetch, resetInterval]);

  return (
    <FlatList
      onRefresh={onRefresh}
      refreshing={isFetching}
      style={st.container}
      contentContainerStyle={st.contentContainerStyle}
      data={events}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={EmptyComponent}
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
