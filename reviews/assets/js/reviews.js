// /reviews/assets/js/reviews.js or ./assets/js/reivews.js
// reviews.js
let vote = 0;

if (localStorage.getItem('hasReviewed')) {
    document.getElementById('submit-btn').disabled = true;
    alert('You have already submitted a review.');
}

document.getElementById('submit-btn').addEventListener('click', function() {
    const comment = document.getElementById('comment').value;
    const token = grecaptcha.getResponse();  // reCAPTCHA response token

    if (vote === 0 || !comment.trim() || !token) {
        alert('Please provide a comment and select Like or Dislike.');
        return;
    }

    // Send review and reCAPTCHA token to backend
    fetch('/api/verify-captcha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, comment, vote })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            db.collection('reviews').add({
                comment: comment,
                vote: vote,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                localStorage.setItem('hasReviewed', true);
                alert('Review submitted successfully.');
                document.getElementById('submit-btn').disabled = true;
            }).catch((error) => {
                console.error('Error submitting review:', error);
            });
        } else {
            alert(data.message || 'Failed to verify captcha.');
        }
    });
});