/* ===================================================
   Dynamic Project Loader — Load projects from Firestore
=================================================== */

// Load projects from Firestore when page loads
document.addEventListener('DOMContentLoaded', async () => {
  const projectGrid = document.querySelector('.project-grid');
  if (!projectGrid) return; // Only run on projects page

  try {
    // Check if Firebase is initialized
    if (typeof firebase === 'undefined' || !firebase.apps.length) {
      console.log('Firebase not initialized - showing static projects');
      return; // Fall back to static HTML projects
    }

    const db = firebase.firestore();
    const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get();

    if (snapshot.empty) {
      console.log('No projects in Firestore - showing static projects');
      return;
    }

    // Clear existing projects and load from Firestore
    projectGrid.innerHTML = '';

    snapshot.forEach((doc) => {
      const project = doc.data();
      const featured = project.featured ? 'featured' : '';
      const featuredTag = project.featured ? '<span class="featured-tag">★ Featured</span>' : '';
      const tags = project.tags && project.tags.length > 0 
        ? project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
        : '';

      const projectCard = document.createElement('div');
      projectCard.className = `project-card ${featured}`;
      projectCard.innerHTML = `
        <div class="browser-frame">
          <div class="browser-topbar">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="browser-url">${project.demo ? new URL(project.demo).hostname : 'project.example'}</div>
          </div>
          <img class="browser-shot" src="${project.image || 'placeholder.png'}" alt="${project.title}">
        </div>
        <div class="project-info">
          <div class="project-meta-row">
            ${featuredTag}
            <span>${project.category || 'Project'}</span>
            <span>${new Date(project.createdAt?.toDate?.() || Date.now()).getFullYear()}</span>
          </div>
          <div class="project-title">${project.title}</div>
          <p class="project-desc">${project.description}</p>
          <div class="tag-row">${tags}</div>
          <div class="project-links">
            ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener">View Project</a>` : ''}
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
          </div>
        </div>
      `;
      projectGrid.appendChild(projectCard);
    });

    console.log('Projects loaded from Firestore');
  } catch (err) {
    console.error('Error loading projects from Firestore:', err);
    // Fall back to static HTML projects on error
  }
});
