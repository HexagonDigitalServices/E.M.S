 const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": BREVO_API_KEY,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        });


export const sendOtpEmail = async (email, otp, name) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0f2fe; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #0369a1; margin: 0; font-size: 28px;">VitaCare</h1>
                <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Your Health, Our Priority</p>
            </div>
            <div style="padding: 20px; background-color: #f0f9ff; border-radius: 12px; margin-bottom: 20px;">
                <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Verify Your Email Address</h2>
                <p style="color: #334155; font-size: 16px; line-height: 1.5;">Hello ${name},</p>
                <p style="color: #334155; font-size: 16px; line-height: 1.5;">Thank you for registering with VitaCare. To complete your sign-up, please use the 6-digit verification code below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="display: inline-block; font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #0284c7; background-color: #ffffff; padding: 12px 30px; border: 2px solid #bae6fd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">${otp}</span>
                </div>
                <p style="color: #ef4444; font-size: 14px; font-weight: 500;">This code is valid for 15 minutes.</p>
            </div>
            <p style="color: #64748b; font-size: 14px; line-height: 1.5; text-align: center;">If you didn't request this email, please ignore it.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">© ${new Date().getFullYear()} VitaCare. All rights reserved.</p>
        </div>
    `;

 catch (error) {
        console.log(`\n--- [DEVELOPMENT FALLBACK OTP LOG] ---\nRecipient: ${email} (${name})\nOTP Code: ${otp}\n---------------------------------------\n`);
    }
};

export const sendResetOtpEmail = async (email, otp, name) => {
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0f2fe; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #0369a1; margin: 0; font-size: 28px;">VitaCare</h1>
                <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Your Health, Our Priority</p>
            </div>
            <div style="padding: 20px; background-color: #f0f9ff; border-radius: 12px; margin-bottom: 20px;">
                <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Reset Your Password</h2>
                <p style="color: #334155; font-size: 16px; line-height: 1.5;">Hello ${name},</p>
                <p style="color: #334155; font-size: 16px; line-height: 1.5;">We received a request to reset the password for your VitaCare account. To proceed, please use the 6-digit verification code below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="display: inline-block; font-size: 36px; font-weight: bold; letter-spacing: 6px; color: #0284c7; background-color: #ffffff; padding: 12px 30px; border: 2px solid #bae6fd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">${otp}</span>
                </div>
                <p style="color: #ef4444; font-size: 14px; font-weight: 500;">This code is valid for 15 minutes.</p>
            </div>
            <p style="color: #64748b; font-size: 14px; line-height: 1.5; text-align: center;">If you didn't request a password reset, please ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">© ${new Date().getFullYear()} VitaCare. All rights reserved.</p>
        </div>
    `;

  catch (error) {
        console.log(`\n--- [DEVELOPMENT FALLBACK RESET OTP LOG] ---\nRecipient: ${email} (${name})\nOTP Code: ${otp}\n--------------------------------------------\n`);
    }
};
