import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

export const sendVerificationEmail = async (email, vertificationToken) => {
    const recipient = [{ email }]

    try {
        const response = mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", vertificationToken),
            category: "Email vertification"
        });
        console.log("Email sent succesfully", response);
    } catch (error) {
        console.log('the error is ', error);
        throw new Error(`the error is ${error}`)
    }
};

export const SendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "679ece65-e902-4348-ae13-b77218a69e8f",
			template_variables: {
				company_info_name: "Auth Company",
				name: name,
			},
		});
        console.log("Email sent succesfully", response);
    } catch (error) {
        console.log('the error is ', error);
        throw new Error(`the error is ${error}`)
    }
}

export const sendPasswordResetEmail = async (email, resetUrl) => {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
         from: sender,
        to: recipient,
        subject: "forget password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
        category: "Reset password link"
    })
}