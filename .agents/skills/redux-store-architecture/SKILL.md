---
name: redux-store-architecture
description: Standards for adding or modifying Redux state in this project. Covers slice creation, registration, naming conventions, and consumption patterns.
---

# Redux Store Architecture

Every feature that needs shared state uses Redux Toolkit. There is no Context API or Zustand — Redux is the only state management pattern in this project.

## File structure for a new slice

```
app/components/<feature-name>/
  store/
    <featureName>Slice.ts           ← slice definition + exported actions
    <FeatureName>State.interface.ts ← state shape interface
```

Global (non-component) slices live in `app/store/slices/`.

## Checklist when adding a new slice

### 1. Add a slice name constant

In `app/constants/store/Store.constants.ts`:

```ts
export const STORE_SLICES = {
  // ...existing entries
  MY_FEATURE: "myFeature",
} as const;
```

### 2. Create the state interface

`app/components/my-feature/store/MyFeatureState.interface.ts`:

```ts
export interface MyFeatureState {
  foo: string;
  isModalOpen: boolean | null;
  error: string | null;
}
```

### 3. Create the slice

`app/components/my-feature/store/myFeatureSlice.ts`:

```ts
import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { STORE_SLICES } from "@/app/constants";
import { MyFeatureState } from "./MyFeatureState.interface";

const initialState: MyFeatureState = {
  foo: STRING.Empty,
  isModalOpen: null,
  error: null,
};

const myFeatureSlice = createSlice({
  name: STORE_SLICES.MY_FEATURE,
  initialState,
  reducers: {
    setFoo: (state, action: PayloadAction<string>) => {
      state.foo = action.payload;
    },
    setIsModalOpen: (
      state,
      action: PayloadAction<boolean | null>
    ) => {
      state.isModalOpen = action.payload;
    },
    setError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
    },
  },
});

export const myFeatureActions = myFeatureSlice.actions;
export default myFeatureSlice.reducer;
```

### 4. Register the reducer in the store

`app/store/index.ts` — two places:

```ts
// 1. Import
import myFeatureReducer from "@/app/components/my-feature/store/myFeatureSlice";

// 2. Add to configureStore reducer map
export const store = configureStore({
  reducer: {
    [STORE_SLICES.MY_FEATURE]: myFeatureReducer,
  },
});
```

### 5. Re-export the actions from the store index

```ts
export { myFeatureActions } from "@/app/components/my-feature/store/myFeatureSlice";
```

## Consuming the slice

Always import from `@/app/store`, never directly from the slice file:

```ts
import { useDispatch, useSelector } from "react-redux";
import { myFeatureActions, RootState } from "@/app/store";

const { foo } = useSelector(
  (state: RootState) => state.myFeature
);
const dispatch = useDispatch();
dispatch(myFeatureActions.setFoo("bar"));
```

## Naming conventions

| Thing                     | Convention                     | Example                       |
| ------------------------- | ------------------------------ | ----------------------------- |
| `STORE_SLICES` key        | `SCREAMING_SNAKE_CASE`         | `MY_FEATURE`                  |
| Slice name (string value) | `camelCase`                    | `"myFeature"`                 |
| Slice file                | `camelCaseSlice.ts`            | `myFeatureSlice.ts`           |
| State interface file      | `PascalCaseState.interface.ts` | `MyFeatureState.interface.ts` |
| Exported actions object   | `<feature>Actions`             | `myFeatureActions`            |
| Reducer action names      | `set<Field>`                   | `setFoo`, `setIsModalOpen`    |
