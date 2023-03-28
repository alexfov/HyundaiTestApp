import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '_app/core/redux';
import { getEvents, selectAllEvents } from '_app/features/Events/eventsSlice';

interface Props {
  count?: number;
  fetchOnMount?: boolean;
}

export function useEvents({ count = 25, fetchOnMount = true }: Props) {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const isFetching = useAppSelector((state) => state.events.isFetching);

  const refetch = useCallback(() => {
    dispatch(getEvents(count));
  }, [count, dispatch]);

  useEffect(() => {
    if (!fetchOnMount) return;
    dispatch(getEvents(count));
  }, [count, dispatch, fetchOnMount]);

  return { events, refetch, isFetching };
}
