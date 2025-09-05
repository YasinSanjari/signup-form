"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useSignupForm } from "@/hooks/useSignupForm";
import { FormFields } from "@/components/form-fields";

export default function SignupForm() {
  const { form, onSubmit } = useSignupForm();

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-balance">
          Create Your Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            data-testid="signup-form"
          >
            <FormFields control={form.control} />

            <Button
              type="submit"
              className="w-full"
              data-testid="submit-button"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
