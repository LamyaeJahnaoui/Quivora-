document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const subject = document.getElementById('name').value;
    const content = document.getElementById('message').value;

    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, content }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        alert('Error: ' + (result.message || 'Failed to send message'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the message');
    }
  });
});
