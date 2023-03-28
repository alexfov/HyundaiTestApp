import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useEvents } from '_app/features/Events/__useEvents';
import useInterval from '_app/hooks/useInterval';

interface Props {
  poolInterval?: number;
  count?: number;
}

export function useEventsPooling({ poolInterval = 30 * 1000, count = 25 }: Props) {
  const isFocused = useIsFocused();
  const interval = isFocused ? poolInterval : null;
  const { events, isFetching, refetch } = useEvents({ count, fetchOnMount: false });

  useFocusEffect(refetch);
  const { resetInterval } = useInterval(refetch, interval);

  return { events, isFetching, refetch, resetInterval };
}
