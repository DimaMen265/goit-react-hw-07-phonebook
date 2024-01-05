import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import { filterReducer } from "./filterSlice";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistContacts = {
    key: "contacts",
    storage,
};

const persistFilter = {
    key: "filter",
    storage,
};

const persistedContacts = persistReducer(persistContacts, contactsReducer);
const persistedFilter = persistReducer(persistFilter, filterReducer);

export const store = configureStore({
    reducer: {
        contacts: persistedContacts,
        filter: persistedFilter,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
