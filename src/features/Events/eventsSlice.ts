import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '_app/core/redux';
import { GithubEvent } from '_app/types/types';
import { reduxStorage } from '_app/core/mmkv';
import { persistReducer } from 'redux-persist';

const SLICE_NAME = 'events';
const eventsAdapter = createEntityAdapter<GithubEvent>({});
const additionalState = {
  isFetching: false,
};

export const getEvents = createAsyncThunk(SLICE_NAME + '/getEvents', async (count: number = 25) => {
  const res = await fetch(`https://api.github.com/events?per_page=${count}`);
  const data = await res.json();
  return data;
});

const setFetching = (state: typeof additionalState) => {
  state.isFetching = true;
};

const setNotFetching = (state: typeof additionalState) => {
  state.isFetching = false;
};

const eventsSlice = createSlice({
  name: SLICE_NAME,
  initialState: eventsAdapter.getInitialState(additionalState),
  reducers: {
    addEvent: eventsAdapter.addOne,
    setEvents: eventsAdapter.setAll,
    upsertEvents: eventsAdapter.upsertMany,
    removeEvents: eventsAdapter.removeMany,
  },
  extraReducers: (x) => {
    x.addCase(getEvents.pending, setFetching);
    x.addCase(getEvents.rejected, setNotFetching);
    x.addCase(getEvents.fulfilled, (state, action) => {
      state.isFetching = false;
      eventsAdapter.setAll(state, action.payload);
    });
  },
});

const eventsSelectors = eventsAdapter.getSelectors<RootState>((state) => state.events);

const selectAllEvents = createSelector(
  (state: RootState) => eventsSelectors.selectAll(state),
  (events) => events,
);

const selectEventById = (id: string) =>
  createSelector(
    (state: RootState) => eventsSelectors.selectById(state, id),
    (events) => events,
  );

const persistConfig = {
  key: SLICE_NAME,
  storage: reduxStorage,
  blacklist: ['isFetching', 'shouldResetPoolingInterval'],
};

export { eventsSelectors, selectAllEvents, selectEventById };
export const { addEvent, setEvents, upsertEvents, removeEvents } = eventsSlice.actions;
export default persistReducer(persistConfig, eventsSlice.reducer);
