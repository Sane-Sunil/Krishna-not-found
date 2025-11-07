function load() {
  return `
    <main>
      <h2>Home</h2>
      <p>Welcome to the home page! 🚀</p>
      <p>Caution: <br>Page under construction 🏗️</p>
    </main>

    <footer>
      <div class="footer-container">
        <h2>Subscribe to Our Newsletter</h2>
        <form id="newsletter-form" action="#" method="POST">
          <input type="email" name="email" placeholder="Enter your email" required>
          <textarea name="message" rows="3" placeholder="Your message" required></textarea>
          <br>
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </footer>
  `;
}

async function init() {
  // Import the functions you need from the SDKs you need
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js");
  const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js");
  const { getFirestore, collection, addDoc } = await import("https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js");

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD1E5jTShXbhSOw9rew0moBwpgiBRf7YdI",
    authDomain: "krishna-not-found-4d640.firebaseapp.com",
    projectId: "krishna-not-found-4d640",
    storageBucket: "krishna-not-found-4d640.firebasestorage.app",
    messagingSenderId: "1071448229931",
    appId: "1:1071448229931:web:2447dcabd49ea467c7c26e",
    measurementId: "G-88N6B1VPK1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  // Handle form submission
  document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const message = formData.get('message');

    try {
      await addDoc(collection(db, 'subscribers'), {
        email,
        message,
        timestamp: new Date()
      });
      alert('Thank you for subscribing!');
      e.target.reset();
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error subscribing. Please try again.');
    }
  });
}

window.load = load;
window.init = init;
window.load = load;