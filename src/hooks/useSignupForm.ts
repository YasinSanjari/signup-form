import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signupSchema, type SignupFormData } from "@/lib/validation";

export const useSignupForm = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    console.log("Form submitted:", data);
    toast("Account created successfully!", {
      description: "Welcome to our platform. You can now sign in.",
    });
    form.reset();
  };

  return {
    form,
    onSubmit,
  };
};
