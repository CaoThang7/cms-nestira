// import { SignInFormValues } from "@/schemas/auth";

// interface SignInResponse {
//   success: boolean;
//   token?: string;
//   message?: string;
// }

// export const authService = {
//   signIn: async (credentials: SignInFormValues): Promise<SignInResponse> => {
//     try {
//       const response = await fetch(`/api/auth`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return {
//           success: false,
//           message: data.message || "Authentication failed",
//         };
//       }

//       return {
//         success: true,
//         token: data.token,
//         message: "Authentication successful",
//       };
//     } catch (error) {
//       console.error("Sign in error:", error);
//       return {
//         success: false,
//         message: "An unexpected error occurred. Please try again.",
//       };
//     }
//   },
// };
