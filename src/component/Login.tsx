import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../helper/services";

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    provider,
    formData
  ) => {
    const promise = new Promise<void>((resolve) => {
      login({
        email: `${formData.get("email")}`,
        password: `${formData.get("password")}`,
      })
        .then((res) => {
          navigate("/login");
          localStorage.setItem("token", res.data.data.token);
        })
        .catch((err) => {
          setError(true);
        })
        .finally(() => {
          resolve();
        });
    });
    return promise;
  };

  return (
    <AppProvider theme={theme}>
      {error && <Alert color="error">Your account not valid</Alert>}
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
