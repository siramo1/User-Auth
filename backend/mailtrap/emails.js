import { resendClient, sender } from "./mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: [email],
    subject: "Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    ),
    tags: [{ name: "category", value: "email_verification" }],
  });

  if (error) {
    // Log everything you have – name, message, stack, cause …
    console.error("Resend returned an error:", error);
    throw new Error(error.message);
  }

  console.log("✅ Verification e-mail queued with id:", data.id);
};


export const SendWelcomeEmail = async (email, name) => {
  const recipient = [email];

  try {
    const response = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: recipient,
      subject: "Verify your email",
      html: WELCOME_EMAIL,
      tags: [{ name: "category", value: "send_Welcome" }],
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.log("The error is", error);
    throw new Error(`The error is ${error.message}`);
  }
};

export const sendForgetEmail = async (email, resetUrl) => {
  const recipient = [email];

  try {
    const response = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: recipient,
      subject: "Forgot password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      tags: [{ name: "category", value: "Reset_Password_link" }],
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.log("The error is", error);
    throw new Error(`The error is ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Reset password Password Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      tags: [{ name: "category", value: "Reset_Password_succes" }],
    });
    console.log("reset email sent successfully", response);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}
