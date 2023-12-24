import { store } from "../Store";

type RootState = ReturnType<typeof store.getState>;

export default RootState;