import React, { memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useAppSelector } from '_app/core/redux';

export const EmptyComponent = memo(() => {
  const isFetching = useAppSelector((state) => state.events.isFetching);
  return (
    <View style={st.container}>
      <Text style={st.text}>{isFetching ? 'Fetching data...' : 'No events found'}</Text>
    </View>
  );
});

EmptyComponent.displayName = 'EmptyComponent';

const st = StyleSheet.create({
  container: {},
  text: {
    color: 'black',
  },
});
