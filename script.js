/* ===================================================
   Michael Otieno Ouma — Portfolio
   Shared script: theme, nav, WhatsApp float, accordions, EmailJS
=================================================== */

/* ---- THEME (dark/light) ---- */
(function(){
  const saved = localStorage.getItem('theme');
  const preferred = saved || 'dark';
  document.documentElement.setAttribute('data-theme', preferred);

  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.theme-toggle');
    if(!btn) return;
    const setIcon = () => {
      const t = document.documentElement.getAttribute('data-theme');
      btn.textContent = t === 'dark' ? '🌙' : '☀️';
    };
    setIcon();
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      setIcon();
    });
  });
})();

/* ---- MOBILE NAV ---- */
window.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if(menuBtn && links){
    menuBtn.addEventListener('click', () => links.classList.toggle('open'));
  }
});

/* ---- FLOATING WHATSAPP BUTTON (injected on every page) ---- */
window.addEventListener('DOMContentLoaded', () => {
  // EDIT: replace 254XXXXXXXXX with your WhatsApp number in international format, no + or leading 0
  const WHATSAPP_NUMBER = '254743334950';
  const WHATSAPP_MESSAGE = encodeURIComponent("Hi Michael, I found your portfolio and I'd like to talk about a project.");
  const a = document.createElement('a');
  a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  a.target = '_blank';
  a.rel = 'noopener';
  a.className = 'whatsapp-float';
  a.setAttribute('aria-label', 'Chat on WhatsApp');
  a.innerHTML = `<svg viewBox="0 0 32 32"><path d="M16.001 3C9.383 3 4 8.383 4 15.001c0 2.386.633 4.62 1.822 6.573L4 29l7.594-1.792A11.94 11.94 0 0 0 16.001 27C22.619 27 28 21.619 28 15.001 28 8.383 22.619 3 16.001 3zm0 21.818a9.77 9.77 0 0 1-4.988-1.363l-.358-.213-4.505 1.063 1.08-4.39-.234-.372a9.77 9.77 0 0 1-1.5-5.542c0-5.406 4.4-9.807 9.807-9.807 5.406 0 9.806 4.401 9.806 9.807 0 5.406-4.4 9.817-9.808 9.817zm5.386-7.33c-.294-.147-1.74-.859-2.01-.957-.27-.098-.467-.147-.663.147-.196.294-.76.957-.932 1.153-.171.196-.343.22-.637.073-.294-.147-1.24-.457-2.362-1.457-.873-.779-1.463-1.74-1.634-2.034-.171-.294-.018-.453.129-.6.132-.132.294-.343.44-.514.147-.171.196-.294.294-.49.098-.196.049-.367-.024-.514-.073-.147-.663-1.6-.909-2.192-.24-.577-.484-.499-.663-.508-.171-.008-.367-.01-.564-.01-.196 0-.514.073-.784.367-.27.294-1.03 1.007-1.03 2.456s1.054 2.848 1.201 3.044c.147.196 2.075 3.17 5.028 4.444.703.304 1.251.485 1.679.62.705.224 1.347.192 1.854.117.566-.085 1.74-.712 1.985-1.4.245-.688.245-1.278.171-1.4-.073-.122-.269-.196-.563-.343z"/></svg>`;
  document.body.appendChild(a);
});

/* ---- SERVICE ACCORDIONS (services.html) ---- */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.service-item');
      const body = item.querySelector('.service-body');
      const isOpen = item.classList.contains('open');
      if(isOpen){
        item.classList.remove('open');
        body.style.maxHeight = null;
      } else {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
});

/* ---- SITE VISIT TRACKING ---- */
(function(){
  const trackSiteVisit = () => {
    if (!window.location || window.location.pathname.includes('/admin.html')) return;
    const storageKey = 'portfolio-site-visit-tracked';
    if (sessionStorage.getItem(storageKey)) return;

    sessionStorage.setItem(storageKey, '1');

    const firestore = window.db || (typeof firebase !== 'undefined' ? firebase.firestore() : null);
    if (!firestore) return;

    const visitRef = firestore.collection('siteStats').doc('visits');
    visitRef.get()
      .then((doc) => {
        const currentCount = doc.exists ? (doc.data().count || 0) : 0;
        return visitRef.set({
          count: currentCount + 1,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastVisitedAt: new Date().toISOString()
        }, { merge: true });
      })
      .catch((err) => console.warn('Unable to record site visit:', err));
  };

  window.addEventListener('DOMContentLoaded', () => {
    trackSiteVisit();
  });
})();

/* ---- EMAILJS CONTACT FORM (contact.html) ----
   Connected using credentials from emailjs.config.js */
(function(){
  const config = window.EMAILJS_CONFIG || {};
  const EMAILJS_PUBLIC_KEY  = config.publicKey || '';
  const EMAILJS_SERVICE_ID  = config.serviceId || '';
  const EMAILJS_TEMPLATE_ID = config.templateId || '';
  const EMAILJS_AUTO_REPLY_TEMPLATE_ID = config.autoReplyTemplateId || '';

  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if(!form) return;

    if(window.emailjs && EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY.indexOf('YOUR_') !== 0){
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const statusEl = document.getElementById('form-status');
    const submitBtn = form.querySelector('.send-btn');
    const setStatus = (message, kind) => {
      statusEl.textContent = message;
      statusEl.className = `form-status ${kind}`.trim();
    };

    form.addEventListener('submit', function(e){
      e.preventDefault();

      if (!window.emailjs || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        setStatus('✗ Email service is not configured yet.', 'err');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      const templateParams = {
        from_name: document.getElementById('first_name').value + ' ' + document.getElementById('last_name').value,
        from_email: document.getElementById('email').value,
        from_name_first: document.getElementById('first_name').value,
        to_email: document.getElementById('email').value,
        to_name: document.getElementById('first_name').value,
        company: document.getElementById('company').value || 'Not specified',
        project_type: document.getElementById('project_type').value,
        budget: document.getElementById('budget').value || 'Not specified',
        message: document.getElementById('message').value
      };

      const saveContactMessage = () => {
        const firestore = window.db || (typeof firebase !== 'undefined' ? firebase.firestore() : null);
        if (!firestore) return Promise.resolve();

        return firestore.collection('contactMessages').add({
          ...templateParams,
          submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
          source: 'contact-form'
        });
      };

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
          if (EMAILJS_AUTO_REPLY_TEMPLATE_ID) {
            return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_TEMPLATE_ID, templateParams)
              .catch((replyErr) => {
                console.warn('Auto-reply email could not be sent:', replyErr);
              });
          }
          return null;
        })
        .then(() => {
          return saveContactMessage().catch((saveErr) => {
            console.warn('Unable to save contact message:', saveErr);
          });
        })
        .then(() => {
          setStatus('✓ Message sent successfully! I\'ll get back to you within 24 hours.', 'ok');
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';

          setTimeout(() => {
            setStatus('', '');
          }, 5000);
        })
        .catch((err) => {
          setStatus('✗ Something went wrong. Please try again or email me directly.', 'err');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          console.error('EmailJS error:', err);
        });
    });
  });
})();
