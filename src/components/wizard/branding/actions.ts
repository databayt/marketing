"use server";

import { z } from "zod";
import { brandingSchema } from "./validation";

export type BrandingFormData = z.infer<typeof brandingSchema>;

// Simple action response type for wizard branding
export type ActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function updateBranding(
  data: BrandingFormData
): Promise<ActionResponse<BrandingFormData>> {
  try {
    const validatedData = brandingSchema.parse(data);

    // In a real app, you would save this to a database
    // For now, we'll just return the validated data
    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation failed",
      };
    }

    return {
      success: false,
      error: "Failed to update branding",
    };
  }
}

export async function getBranding(): Promise<ActionResponse<BrandingFormData>> {
  try {
    // In a real app, you would fetch this from a database
    // For now, return default values
    return {
      success: true,
      data: {
        logoUrl: "",
        brandName: "",
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
        tagline: "",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch branding",
    };
  }
}
