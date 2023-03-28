import React, { useMemo } from 'react';
import { useAppSelector } from '_app/core/redux';
import { selectEventById } from '_app/features/Events/eventsSlice';

interface Props {
  id: string;
}

export function useEvent({ id }: Props) {
  const selector = useMemo(() => {
    return selectEventById(id);
  }, [id]);
  const event = useAppSelector(selector);

  return event;
}
