import React, { memo, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { GithubEvent } from '_app/types/types';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackScreens } from '_app/core/navigation/types';
import { Avatar } from '_app/components/Avatar/Avatar';

interface Props {
  item: GithubEvent;
}

export const EventItem = memo(
  ({ item }: Props) => {
    const nav = useNavigation<RootStackNavigationProp>();
    const onPress = useCallback(() => {
      nav.navigate(RootStackScreens.EventDetails, { id: item.id });
    }, [item.id, nav]);

    return (
      <View style={st.container}>
        <Avatar uri={item.actor?.avatar_url} />
        <View style={st.textCont}>
          <Text style={st.text}>{item.actor?.display_login}</Text>
          <Text style={st.text}>{item.type}</Text>
        </View>
        <RectButton style={StyleSheet.absoluteFillObject} onPress={onPress} />
      </View>
    );
  },
  (prev, next) => prev.item.id === next.item.id,
);

EventItem.displayName = 'EventItem';

const st = StyleSheet.create({
  container: { paddingVertical: 4, paddingHorizontal: 16, flexDirection: 'row' },
  textCont: {
    marginLeft: 16,
    justifyContent: 'center',
    flexShrink: 1,
  },
  text: {
    color: 'black',
  },
});
