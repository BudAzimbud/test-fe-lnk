import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../helper/services";

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const [error, setError] = useState<boolean>(false); // Use string for specific error messages
  const [success, setSuccess] = useState(false); // New state for success message
  const navigate = useNavigate();

  const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    provider,
    formData
  ) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.data.access_token);
      setSuccess(true);
      setError(false);
      navigate("/"); 
    } catch (err) {
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <AppProvider theme={theme}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Login successful! Redirecting...</Alert>}
      <SignInPage
        signIn={signIn}
        providers={[
          {
            id: "credentials",
            name: "Username and password",
          },
        ]}
      />
    </AppProvider>
  );
}
