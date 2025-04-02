export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const { token } = req.body;  // reCAPTCHA response token from frontend
    const apple = process.env.RECAPTCHA_SECRET_KEY;  // Use env variable for the secret key

    if (!token) {
        return res.status(400).json({ success: false, message: "Captcha token missing!" });
    }

    try {
        // Verify reCAPTCHA with Google
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: apple,
                response: token
            })
        });

        const data = await response.json();

        if (!data.success) {
            return res.status(400).json({ success: false, message: "Captcha verification failed!" });
        }

        return res.status(200).json({ success: true, message: "Captcha verified successfully!" });

    } catch (error) {
        console.error("reCAPTCHA Error:", error);
        return res.status(500).json({ success: false, message: "Error verifying captcha" });
    }
}