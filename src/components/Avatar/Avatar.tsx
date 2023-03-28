import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  uri: string;
}

export const Avatar = memo(({ uri }: Props) => {
  return <Image source={{ uri }} style={st.image} />;
});

Avatar.displayName = 'Avatar';

const IMAGE_SIZE = 48;
const st = StyleSheet.create({
  image: { width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: IMAGE_SIZE / 2, backgroundColor: 'grey' },
});
