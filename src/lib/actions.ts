"use server";

import { z } from "zod";
import { contactFormSchema, reservationSchema } from "./schemas";

type FormState = {
  message: string;
  errors: Record<string, string[]> | undefined;
};

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const validatedFields = contactFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    // In a real app, you would process the data here, e.g., send an email.
    console.log("Contact form submitted successfully:", validatedFields);

    return {
      message: "Thank you for your message! We'll get back to you soon.",
      errors: undefined,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        message: "Please correct the errors below.",
        errors: err.flatten().fieldErrors,
      };
    }
    return {
      message: "An unexpected error occurred. Please try again later.",
      errors: undefined,
    };
  }
}

export async function submitReservation(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    // Manually handle date conversion before parsing
    const dateValue = formData.get("date");
    const parsedData = {
      name: formData.get("name"),
      date: dateValue ? new Date(dateValue.toString()) : undefined,
      time: formData.get("time"),
      guests: formData.get("guests"),
    };
    
    const validatedFields = reservationSchema.parse(parsedData);
    
    // In a real app, you would process the reservation here, e.g., save to a database.
    console.log("Reservation submitted successfully:", validatedFields);
    
    return {
      message: "Your reservation request has been submitted. We will confirm shortly.",
      errors: undefined,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        message: "Please correct the errors in the reservation form.",
        errors: err.flatten().fieldErrors,
      };
    }
    return {
      message: "An unexpected error occurred. Please try again later.",
      errors: undefined,
    };
  }
}
