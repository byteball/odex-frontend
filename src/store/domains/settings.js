import type { SettingsState } from '../../types/settings';

const initialState = {
};

export const initialized = () => {
  const event = (state: SettingsState = initialState) => state;
  return event;
};

export default function model(state: SettingsState) {
  return {
  };
}
