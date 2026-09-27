---
name: api-mutation-standards
description: Guidelines for implementing API mutations and managing their types in the project.
---

# API Mutation Standards

This skill defines the standards for implementing API mutations using the `useApiMutation` hook and the organization of their corresponding types.

## 1. Mutations Directory

All mutation interfaces (Payloads and Responses) MUST be stored in:
`@/app/types/mutations/`

Files should be named according to the feature they serve, using the `.mutation.ts` suffix:

- `Login.mutation.ts`
- `Reservation.mutation.ts`
- `Worker.mutation.ts`

## 2. Exporting Types

All new mutation files must be exported via the barrel file at:
`@/app/types/mutations/index.ts`

And they should be accessible through the global types index:
`@/app/types/index.ts`

## 3. Implementation Patterns

### Payload and Response Interfaces

Always define explicit interfaces for the request payload and the successful response:

```typescript
export interface MyFeaturePayload {
  id: string;
  data: string;
}

export interface MyFeatureResponse {
  success: boolean;
  message: string;
}
```

### Using useApiMutation

Always provide the generic types to the `useApiMutation` hook to ensure type safety. Avoid using `unknown`.

```typescript
import { useApiMutation } from "@/app/hooks";
import {
  MyFeaturePayload,
  MyFeatureResponse,
} from "@/app/types/mutations";

const { mutateAsync: myFeatureMutation } = useApiMutation<
  MyFeaturePayload,
  MyFeatureResponse
>(API.ROUTES.MY_FEATURE);
```

## 4. Error Handling

When handling mutation errors, use the `MutationError` type from `@/app/types`:

```typescript
try {
  await myFeatureMutation(payload);
} catch (errorInfo) {
  const mutationError = errorInfo as MutationError;
  // Handle status codes, field-specific errors, etc.
}
```
