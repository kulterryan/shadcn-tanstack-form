"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/tanstack-form"

// Define the form schema with Zod
const userSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine(
      (email) => {
        // RFC 5322 compliant regex for email validation
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
      },
      { message: "Please enter a valid email address" }
    )
    .refine(
      (email) => {
        // Check for common domains to prevent typos
        const commonDomainTypos: Record<string, string> = {
          'gmail.co': 'gmail.com',
          'gmail.cm': 'gmail.com',
          'gamil.com': 'gmail.com',
          'gmal.com': 'gmail.com',
          'yahoo.co': 'yahoo.com',
          'yaho.com': 'yahoo.com',
          'hotmial.com': 'hotmail.com',
          'hotmail.co': 'hotmail.com',
          'outloo.com': 'outlook.com',
          'outlook.co': 'outlook.com',
        };
        
        const domain = email.split('@')[1];
        return !(domain && domain in commonDomainTypos);
      }, 
      { message: "Did you mean to use a different email domain?" }
    ),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
})

type UserFormValues = z.infer<typeof userSchema>

// Define custom validator functions with the correct parameter type
const validateUsername = ({ value }: { value: string }) => {
  if (!value) return undefined;
  try {
    userSchema.shape.username.parse(value);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError && error.errors.length > 0) {
      return error.errors[0].message;
    }
    return "Username validation failed";
  }
};

const validateEmail = ({ value }: { value: string }) => {
  if (!value) return undefined;
  try {
    userSchema.shape.email.parse(value);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError && error.errors.length > 0) {
      return error.errors[0].message;
    }
    return "Email validation failed";
  }
};

const validatePassword = ({ value }: { value: string }) => {
  if (!value) return undefined;
  try {
    userSchema.shape.password.parse(value);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError && error.errors.length > 0) {
      return error.errors[0].message;
    }
    return "Password validation failed";
  }
};

export function UserForm() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        // Validate the entire form with Zod
        const result = userSchema.safeParse(value);
        
        if (!result.success) {
          result.error.errors.forEach(error => {
            toast.error(`${error.path}: ${error.message}`, { duration: 3000 });
          });
          return;
        }
        
        console.log("Form submitted:", value)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Show toast notification instead of alert
        toast.success("Account created successfully", {
          description: (
            <pre className="mt-2 w-full rounded-md bg-slate-950 p-2 text-xs">
              <code className="text-white">{JSON.stringify(value, null, 2)}</code>
            </pre>
          ),
          duration: 5000,
        })
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create Account</h2>
        <p className="text-muted-foreground">
          Enter your information to create your account
        </p>
      </div>

      <Form form={form}>
        <div className="space-y-4">
          {/* Username field */}
          {form.Field({
            name: "username",
            validators: {
              onChange: validateUsername,
              onBlur: validateUsername
            },
            children: (field) => (
              <FormField name="username" form={form}>
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl fieldApi={field}>
                    <Input
                      placeholder="Enter your username"
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      required
                    />
                  </FormControl>
                  <FormDescription>
                    Your unique username for the platform
                  </FormDescription>
                  <FormMessage fieldApi={field} />
                </FormItem>
              </FormField>
            ),
          })}

          {/* Email field */}
          {form.Field({
            name: "email",
            validators: {
              onChange: validateEmail,
              onBlur: validateEmail
            },
            children: (field) => (
              <FormField name="email" form={form}>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl fieldApi={field}>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      required
                    />
                  </FormControl>
                  <FormDescription>
                    We will never share your email with anyone
                  </FormDescription>
                  <FormMessage fieldApi={field} />
                </FormItem>
              </FormField>
            ),
          })}

          {/* Password field */}
          {form.Field({
            name: "password",
            validators: {
              onChange: validatePassword,
              onBlur: validatePassword
            },
            children: (field) => (
              <FormField name="password" form={form}>
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl fieldApi={field}>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      required
                    />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters with mixed case and numbers
                  </FormDescription>
                  <FormMessage fieldApi={field} />
                </FormItem>
              </FormField>
            ),
          })}

          <Button
            type="submit"
            className="w-full"
            disabled={form.state.isSubmitting}
          >
            {form.state.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  )
}