import { Button, Section, Text } from "@react-email/components";
import {
  EmailLayout,
  button,
  heading,
  label,
  paragraph,
  value,
} from "./components/layout";

export function WelcomeEmail({
  name,
  email,
  temporaryPassword,
  loginUrl,
}: {
  name: string;
  email: string;
  temporaryPassword: string;
  loginUrl: string;
}) {
  return (
    <EmailLayout previewText="Your HR Manager account has been created">
      <Text style={heading}>Welcome, {name}</Text>
      <Text style={paragraph}>
        An administrator has created an account for you on HR Manager. Use
        the credentials below to sign in.
      </Text>

      <Section>
        <Text style={label}>Login email</Text>
        <Text style={value}>{email}</Text>

        <Text style={label}>Temporary password</Text>
        <Text style={value}>{temporaryPassword}</Text>
      </Section>

      <Button href={loginUrl} style={button}>
        Sign in
      </Button>

      <Text style={{ ...paragraph, marginTop: "20px" }}>
        For security, please change your password after your first login.
      </Text>
    </EmailLayout>
  );
}

export default WelcomeEmail;
