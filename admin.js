/* ===================================================
   Portfolio Admin Dashboard — Firebase Authentication & Firestore
=================================================== */

let currentUser = null;
let visitorListener = null;
let messagesListener = null;
const auth = window.auth || firebase.auth();
const db = window.db || firebase.firestore();
const storage = window.storage || firebase.storage();

// ---- AUTHENTICATION STATE ----
auth.onAuthStateChanged((user) => {
  currentUser = user;
  updateUI();
});

// ---- UPDATE UI BASED ON AUTH STATE ----
function updateUI() {
  const loginSection = document.getElementById('auth-section');
  const dashboardSection = document.getElementById('dashboard-section');
  const userEmail = document.getElementById('user-email');
  
  if (currentUser) {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    userEmail.textContent = currentUser.email;
    loadSiteStats();
    loadMessages();
    loadProjects();
  } else {
    loginSection.style.display = 'block';
    dashboardSection.style.display = 'none';
  }
}

// ---- LOGIN ----
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const statusEl = document.getElementById('login-status');

  try {
    statusEl.textContent = 'Logging in…';
    statusEl.className = 'status';
    
    await auth.signInWithEmailAndPassword(email, password);
    
    statusEl.textContent = '✓ Logged in successfully';
    statusEl.className = 'status ok';
    document.getElementById('login-form').reset();
  } catch (err) {
    statusEl.textContent = `✗ ${err.message}`;
    statusEl.className = 'status err';
    console.error('Login error:', err);
  }
});

// ---- LOGOUT ----
document.getElementById('logout-btn')?.addEventListener('click', async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.error('Logout error:', err);
  }
});

// ---- LIVE SITE STATS ----
function attachSiteStatsListener() {
  if (!db || visitorListener) return;

  const statsRef = db.collection('siteStats').doc('visits');
  visitorListener = statsRef.onSnapshot((doc) => {
    const countEl = document.getElementById('visitor-count');
    if (!countEl) return;
    const count = doc.exists ? (doc.data().count || 0) : 0;
    countEl.textContent = count.toLocaleString();
  }, (err) => {
    console.error('Site stats listener error:', err);
  });
}

async function loadSiteStats() {
  const countEl = document.getElementById('visitor-count');
  if (!countEl) return;

  try {
    const doc = await db.collection('siteStats').doc('visits').get();
    const count = doc.exists ? (doc.data().count || 0) : 0;
    countEl.textContent = count.toLocaleString();
    attachSiteStatsListener();
  } catch (err) {
    countEl.textContent = '0';
    console.error('Load site stats error:', err);
  }
}

// ---- CONTACT MESSAGES ----
function renderMessages(snapshot) {
  const listEl = document.getElementById('messages-list');
  const countEl = document.getElementById('message-count');
  if (!listEl || !countEl) return;

  countEl.textContent = snapshot.size.toLocaleString();

  if (snapshot.empty) {
    listEl.innerHTML = '<div class="empty-state">No contact messages yet.</div>';
    return;
  }

  listEl.innerHTML = '';
  snapshot.forEach((doc) => {
    const message = doc.data();
    const sentAt = message.submittedAt?.toDate ? message.submittedAt.toDate() : new Date();
    const isRead = Boolean(message.isRead);

    const card = document.createElement('div');
    card.className = `message-card ${isRead ? 'is-read' : 'unread'}`;
    card.innerHTML = `
      <div class="message-card-header">
        <div>
          <div class="message-badge">${isRead ? 'Read' : 'New'}</div>
          <strong>${escapeHtml(message.from_name || 'Anonymous')}</strong>
        </div>
        <span>${sentAt.toLocaleString()}</span>
      </div>
      <p><strong>Email:</strong> ${escapeHtml(message.from_email || 'N/A')}</p>
      <p><strong>Company:</strong> ${escapeHtml(message.company || 'Not specified')}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(message.project_type || 'N/A')}</p>
      <p><strong>Budget:</strong> ${escapeHtml(message.budget || 'N/A')}</p>
      <p><strong>Message:</strong> ${escapeHtml(message.message || 'No message content')}</p>
      <div class="message-actions">
        <button class="btn-action" onclick="toggleMessageRead('${doc.id}', ${isRead})">${isRead ? 'Mark as unread' : 'Mark as read'}</button>
        <button class="btn-action danger" onclick="deleteMessage('${doc.id}')">Delete</button>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function toggleMessageRead(messageId, isRead) {
  try {
    await db.collection('contactMessages').doc(messageId).update({
      isRead: !isRead,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (err) {
    console.error('Toggle message status error:', err);
    alert(`Unable to update message status: ${err.message}`);
  }
}

async function deleteMessage(messageId) {
  if (!confirm('Delete this message?')) return;

  try {
    await db.collection('contactMessages').doc(messageId).delete();
  } catch (err) {
    console.error('Delete message error:', err);
    alert(`Unable to delete message: ${err.message}`);
  }
}

async function loadMessages() {
  const listEl = document.getElementById('messages-list');
  const countEl = document.getElementById('message-count');
  if (!listEl || !countEl) return;

  try {
    const snapshot = await db.collection('contactMessages').orderBy('submittedAt', 'desc').limit(20).get();
    renderMessages(snapshot);

    if (!messagesListener) {
      messagesListener = db.collection('contactMessages').orderBy('submittedAt', 'desc').limit(20).onSnapshot((snapshot) => {
        renderMessages(snapshot);
      });
    }
  } catch (err) {
    listEl.innerHTML = '<div class="empty-state">Unable to load messages right now.</div>';
    countEl.textContent = '0';
    console.error('Load messages error:', err);
  }
}

// ---- LOAD PROJECTS FROM FIRESTORE ----
async function loadProjects() {
  const projectsList = document.getElementById('projects-list');
  projectsList.innerHTML = '<p>Loading projects…</p>';

  try {
    const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();
    
    if (snapshot.empty) {
      projectsList.innerHTML = '<p>No projects yet. Add your first project!</p>';
      return;
    }

    projectsList.innerHTML = '';
    snapshot.forEach((doc) => {
      const project = doc.data();
      const projectCard = document.createElement('div');
      projectCard.className = 'admin-project-card';
      projectCard.innerHTML = `
        <div class="admin-project-header">
          <h3>${project.title || 'Untitled'}</h3>
          <div class="admin-project-actions">
            <button class="btn-small btn-edit" onclick="editProject('${doc.id}')">Edit</button>
            <button class="btn-small btn-delete" onclick="deleteProject('${doc.id}')">Delete</button>
          </div>
        </div>
        <p class="admin-project-desc">${project.description || 'No description'}</p>
        <p class="admin-project-meta">
          Category: ${project.category || 'N/A'} | Featured: ${project.featured ? 'Yes' : 'No'}
        </p>
        ${project.image ? `<img src="${project.image}" class="admin-project-thumb" alt="${project.title}">` : '<p style="color: #999;">No image uploaded</p>'}
      `;
      projectsList.appendChild(projectCard);
    });
  } catch (err) {
    projectsList.innerHTML = `<p style="color: red;">Error loading projects: ${err.message}</p>`;
    console.error('Load projects error:', err);
  }
}

async function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Failed to read image'));
    reader.readAsDataURL(file);
  });
}

async function uploadProjectImage(imageFile) {
  if (!imageFile) {
    return '';
  }

  try {
    if (!storage || typeof storage.ref !== 'function') {
      throw new Error('Storage is unavailable');
    }

    const filename = `projects/${Date.now()}_${imageFile.name.replace(/\s+/g, '_')}`;
    const ref = storage.ref(filename);
    await ref.put(imageFile);
    return await ref.getDownloadURL();
  } catch (error) {
    console.warn('Storage upload failed, falling back to inline image data.', error);
    return readFileAsDataUrl(imageFile);
  }
}

// ---- ADD/EDIT PROJECT ----
document.getElementById('project-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const projectId = document.getElementById('project-id').value;
  const title = document.getElementById('project-title').value;
  const description = document.getElementById('project-description').value;
  const category = document.getElementById('project-category').value;
  const github = document.getElementById('project-github').value;
  const demo = document.getElementById('project-demo').value;
  const featured = document.getElementById('project-featured').checked;
  const tagsInput = document.getElementById('project-tags').value;
  const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
  const imageFile = document.getElementById('project-image').files[0];
  
  const statusEl = document.getElementById('form-status');

  try {
    statusEl.textContent = projectId ? 'Updating…' : 'Adding…';
    statusEl.className = 'status';

    let imageUrl = document.getElementById('project-image-preview').src || '';

    if (imageFile) {
      imageUrl = await uploadProjectImage(imageFile);
    }

    const projectData = {
      title,
      description,
      category,
      github,
      demo,
      featured,
      tags,
      image: imageUrl,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (!projectId) {
      projectData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await db.collection('projects').add(projectData);
      statusEl.textContent = '✓ Project added successfully!';
    } else {
      await db.collection('projects').doc(projectId).update(projectData);
      statusEl.textContent = '✓ Project updated successfully!';
    }

    statusEl.className = 'status ok';
    resetProjectForm();
    loadProjects();

    // Auto-hide message
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = '';
    }, 3000);
  } catch (err) {
    statusEl.textContent = `✗ Error: ${err.message}`;
    statusEl.className = 'status err';
    console.error('Save project error:', err);
  }
});

// ---- EDIT PROJECT ----
async function editProject(projectId) {
  try {
    const doc = await db.collection('projects').doc(projectId).get();
    if (!doc.exists) {
      alert('Project not found');
      return;
    }

    const project = doc.data();
    document.getElementById('project-id').value = projectId;
    document.getElementById('project-title').value = project.title;
    document.getElementById('project-description').value = project.description;
    document.getElementById('project-category').value = project.category;
    document.getElementById('project-github').value = project.github || '';
    document.getElementById('project-demo').value = project.demo || '';
    document.getElementById('project-featured').checked = project.featured || false;
    document.getElementById('project-tags').value = (project.tags || []).join(', ');

    if (project.image) {
      document.getElementById('project-image-preview').src = project.image;
      document.getElementById('project-image-preview').style.display = 'block';
    }

    // Scroll to form
    document.getElementById('project-form').scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    alert(`Error loading project: ${err.message}`);
    console.error('Edit project error:', err);
  }
}

// ---- DELETE PROJECT ----
async function deleteProject(projectId) {
  if (!confirm('Are you sure you want to delete this project?')) return;

  try {
    await db.collection('projects').doc(projectId).delete();
    loadProjects();
  } catch (err) {
    alert(`Error deleting project: ${err.message}`);
    console.error('Delete project error:', err);
  }
}

// ---- RESET PROJECT FORM ----
function resetProjectForm() {
  document.getElementById('project-form').reset();
  document.getElementById('project-id').value = '';
  document.getElementById('project-image-preview').style.display = 'none';
  document.getElementById('project-image-preview').src = '';
}

// ---- IMAGE PREVIEW ----
document.getElementById('project-image')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = document.getElementById('project-image-preview');
      preview.src = event.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});
