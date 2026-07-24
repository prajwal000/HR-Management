import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

export function EmailLayout({
  previewText,
  children,
}: {
  previewText: string;
  children: ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>HR Manager</Text>
          <Section style={card}>{children}</Section>
          <Hr style={hr} />
          <Text style={footer}>
            This is an automated message from HR Manager. Please do not
            reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fafafa",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "40px 0",
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "0 24px",
};

const brand = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#171717",
  letterSpacing: "0.02em",
  marginBottom: "24px",
};

const card = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  padding: "32px",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "24px 0",
};

const footer = {
  fontSize: "12px",
  color: "#a3a3a3",
};

export const heading = {
  fontSize: "18px",
  fontWeight: 600,
  color: "#171717",
  margin: "0 0 16px",
};

export const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#404040",
  margin: "0 0 12px",
};

export const label = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#737373",
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
  margin: "0 0 2px",
};

export const value = {
  fontSize: "14px",
  color: "#171717",
  margin: "0 0 16px",
  fontFamily: "monospace",
};

export const button = {
  backgroundColor: "#171717",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "10px 20px",
  marginTop: "8px",
};
