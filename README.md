# shadcn/ui with TanStack Form

This project demonstrates how to use [TanStack Form](https://tanstack.com/form/latest) with [shadcn/ui](https://ui.shadcn.com/) components as a drop-in replacement for React Hook Form.

## Key Features

- Type-safe form validation with Zod
- Fully integrates with shadcn/ui design system
- Follows the same component structure as the original shadcn Form components
- Easy to implement for those familiar with React Hook Form

## Components

### 1. TanStack Form Components

The TanStack Form components are located in `src/components/ui/tanstack-form.tsx`. These components are designed to mirror the shadcn/ui Form components built for React Hook Form, making it easy to transition between them.

Available components:
- `Form`: The main form component
- `FormField`: Connects a field to the form
- `FormItem`: Wrapper for form items
- `FormLabel`: Form field label
- `FormControl`: Control component for inputs
- `FormDescription`: Description text for form fields
- `FormMessage`: Error message display component

### 2. Example UserForm Component

The `UserForm.tsx` component demonstrates how to use the TanStack Form components with Zod validation:

```tsx
// Example usage
const form = useForm<any, any, any, any, any, any, any, any, any, any>({
  defaultValues: {
    username: "",
    email: "",
    // ...
  },
  onSubmit: async ({ value }) => {
    // Handle form submission
  },
});

// Field usage
{form.Field({
  name: "username",
  validators: {
    onChange: async (value) => {
      try {
        await UserFormSchema.shape.username.parseAsync(value)
        return undefined
      } catch (error) {
        return error instanceof Error ? error.message : "Validation failed"
      }
    },
    // ...
  },
  children: (field) => (
    <FormField name="username" form={form}>
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input
            value={field.state.value || ""}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
        </FormControl>
        <FormDescription>Field description</FormDescription>
        <FormMessage>{field.state.meta.errors?.[0]}</FormMessage>
      </FormItem>
    </FormField>
  ),
})}
```

## Differences from React Hook Form

1. **Form Initialization**:
   - React Hook Form: `const form = useForm({ ... })`
   - TanStack Form: `const form = useForm<...generic types>({ ... })`

2. **Field Registration**:
   - React Hook Form: `<FormField control={form.control} name="field" render={...} />`
   - TanStack Form: `{form.Field({ name: "field", validators: {...}, children: (field) => ... })}`

3. **Validation**:
   - React Hook Form: Uses resolver (e.g., zodResolver)
   - TanStack Form: Uses validators at the field level

4. **Error Handling**:
   - React Hook Form: Errors from form state
   - TanStack Form: Errors from field state

## Getting Started

1. Install dependencies:
   ```bash
   pnpm add @tanstack/react-form @tanstack/zod-form-adapter zod
   ```

2. Copy the `tanstack-form.tsx` component to your project
3. Start using the TanStack Form components in your forms

## Why TanStack Form?

- More type-safe approach to form management
- First-class TypeScript support
- More granular control over validation
- Better performance through optimized re-rendering
- Strong community and maintainer support

## License

MIT
