/**
 * Utility functions for sanitizing code content
 */

// Function to escape HTML special characters to prevent XSS
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Function to sanitize code blocks used in syntax highlighting
function sanitizeCodeBlocks() {
  document.querySelectorAll('pre code').forEach(block => {
    // Get content, escape HTML, and set it back
    const content = block.textContent || block.innerText;
    block.textContent = content; // This automatically escapes HTML
  });
}

// Initialize sanitization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  sanitizeCodeBlocks();
});
