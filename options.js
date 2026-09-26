document.addEventListener('DOMContentLoaded', async () => {
  // Load existing settings from storage
  const config = await chrome.storage.sync.get({
    githubToken: '',
    bookmarkRepo: 'Shutupmilo/github-bookmarks',
    bookmarkFile: 'BOOKMARKS.json'
  });

  document.getElementById('githubToken').value = config.githubToken;
  document.getElementById('bookmarkRepo').value = config.bookmarkRepo;
  document.getElementById('bookmarkFile').value = config.bookmarkFile;

  // Save settings when button is clicked
  document.getElementById('saveButton').addEventListener('click', async () => {
    const token = document.getElementById('githubToken').value.trim();
    const repo = document.getElementById('bookmarkRepo').value.trim();
    const file = document.getElementById('bookmarkFile').value.trim() || 'BOOKMARKS.json';

    if (!token || !repo) {
      alert('GitHub token and repository are required.');
      return;
    }

    try {
      await chrome.storage.sync.set({
        githubToken: token,
        bookmarkRepo: repo,
        bookmarkFile: file
      });

      const statusEl = document.getElementById('status');
      statusEl.classList.add('visible');
      setTimeout(() => {
        statusEl.classList.remove('visible');
      }, 3000);
    } catch (error) {
      alert('Error saving settings: ' + error.message);
    }
  });
});
