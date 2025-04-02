// /reviews/assets/js/reviews.js or ./assets/js/reivews.js
// reviews.js
import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

let vote = 0;

// Check if user has already reviewed
if (localStorage.getItem('hasReviewed')) {
    document.getElementById('submit-btn').disabled = true;
    alert('You have already submitted a review.');
}

// Like & Dislike Button Logic
document.getElementById('like-btn').addEventListener('click', function() {
    vote = 1;
    this.classList.add('selected');
    document.getElementById('dislike-btn').classList.remove('selected');
});

document.getElementById('dislike-btn').addEventListener('click', function() {
    vote = -1;
    this.classList.add('selected');
    document.getElementById('like-btn').classList.remove('selected');
});

// Submit Review Function
document.getElementById('submit-btn').addEventListener('click', async function() {
    const comment = document.getElementById('comment').value;
    const token = grecaptcha.getResponse();  // reCAPTCHA response token

    if (vote === 0 || !comment.trim() || !token) {
        alert('Please provide a comment, select Like or Dislike, and complete reCAPTCHA.');
        return;
    }

    try {
        // Send token to backend for verification
        const response = await fetch('/api/verify-captcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });

        const data = await response.json();
        
        if (!data.success) {
            alert('Captcha verification failed. Try again.');
            return;
        }

        // Store review in Firestore if reCAPTCHA is valid
        await addDoc(collection(db, 'reviews'), {
            comment: comment,
            vote: vote,
            timestamp: serverTimestamp()
        });

        localStorage.setItem('hasReviewed', true);
        alert('Review submitted successfully.');
        document.getElementById('submit-btn').disabled = true;
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('An error occurred. Try again.');
    }
});