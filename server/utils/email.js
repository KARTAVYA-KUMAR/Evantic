const dotenv = require('dotenv');

dotenv.config();

console.log('--- Mailer Config Diagnostic ---');
console.log('BREVO_API_KEY is set:', !!process.env.BREVO_API_KEY);
if (process.env.BREVO_API_KEY) {
    console.log('BREVO_API_KEY length:', process.env.BREVO_API_KEY.length);
}

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const htmlContent = `
            <h2>Hi ${userName}!</h2>
            <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed.</p>
            <p>Thank you for choosing Eventora.</p>
        `;

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: { name: 'Evantic', email: 'kartavya9878@gmail.com' },
                to: [{ email: userEmail, name: userName }],
                subject: `Booking Confirmed: ${eventTitle}`,
                htmlContent: htmlContent
            })
        });

        const resData = await response.json();
        if (response.ok) {
            console.log(`Brevo: Booking email sent successfully to ${userEmail}, Message ID: ${resData.messageId}`);
        } else {
            console.error('Brevo API Error details:', resData);
        }
    } catch (error) {
        console.error('Error sending booking email with Brevo:', error);
    }
};

const sendOTPEmail = async (userEmail, otp, type) => {
    try {
        const title = type === 'account_verification' ? 'Verify your Evantic Account' : 'Evantic Booking Verification';
        const msg = type === 'account_verification'
            ? 'Please use the following OTP to verify your new Evantic account.'
            : 'Please use the following OTP to verify and confirm your event booking.';
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2 style="color: #111;">${title}</h2>
                <p style="color: #555; font-size: 16px;">${msg}</p>
                <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold; background: #f4f4f4; width: max-content; letter-spacing: 5px;">
                    ${otp}
                </div>
                <p style="color: #999; font-size: 12px;">This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
            </div>
        `;

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sender: { name: 'Evantic', email: 'kartavya9878@gmail.com' },
                to: [{ email: userEmail }],
                subject: title,
                htmlContent: htmlContent
            })
        });

        const resData = await response.json();
        if (response.ok) {
            console.log(`Brevo: OTP sent successfully to ${userEmail}, Message ID: ${resData.messageId}`);
        } else {
            console.error('Brevo API Error details:', resData);
        }
    } catch (error) {
        console.error('Error sending OTP email with Brevo:', error);
    }
};

module.exports = { sendBookingEmail, sendOTPEmail };
