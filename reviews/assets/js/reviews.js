// /reviews/assets/js/reviews.js or ./assets/js/reivews.js
const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        let vote = 0;
        
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

        if (localStorage.getItem('hasReviewed')) {
            document.getElementById('submit-btn').disabled = true;
            alert('You have already submitted a review.');
        }

        document.getElementById('submit-btn').addEventListener('click', function() {
            const comment = document.getElementById('comment').value;
            if (vote === 0 || !comment.trim()) {
                alert('Please provide a comment and select Like or Dislike.');
                return;
            }

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
        });