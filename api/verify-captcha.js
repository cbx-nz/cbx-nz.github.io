// api/verify-captcha.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;  // reCAPTCHA response token from frontend
        const apple = process.env.RECAPTCHA_SECRET_KEY;  // Environment variable for your secret key

        try {
            // Send a request to Google's reCAPTCHA verification API
            const googleResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
                params: {
                    secret: apple,
                    response: token
                }
            });

            if (googleResponse.data.success) {
                res.status(200).json({ success: true, message: "Captcha verified successfully!" });
            } else {
                res.status(400).json({ success: false, message: "Captcha verification failed!" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Error verifying captcha" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}
