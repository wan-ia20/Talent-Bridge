/* =============================================
   TALENTBRIDGE — APP JAVASCRIPT
   ============================================= */

// ---- DATA ----
const jobsData = [
  { id:1, title:'Senior React Developer', company:'Stripe', logo:'💳', color:'#635bff', location:'Remote', type:'Remote', category:'Technology', level:'Senior Level', salary:'$130K–$160K', tags:['React','TypeScript','Node.js'], posted:'2 days ago', featured:true },
  { id:2, title:'Product Designer', company:'Figma', logo:'🎨', color:'#f24e1e', location:'San Francisco, CA', type:'Full-time', category:'Design', level:'Mid Level', salary:'$110K–$140K', tags:['Figma','UX Research','Prototyping'], posted:'3 days ago', featured:true },
  { id:3, title:'Growth Marketing Manager', company:'Notion', logo:'📝', color:'#000', location:'New York, NY', type:'Full-time', category:'Marketing', level:'Mid Level', salary:'$95K–$120K', tags:['SEO','Paid Ads','Analytics'], posted:'1 day ago', featured:true },
  { id:4, title:'Data Scientist', company:'Airbnb', logo:'🏡', color:'#ff385c', location:'Remote', type:'Remote', category:'Technology', level:'Senior Level', salary:'$140K–$175K', tags:['Python','ML','SQL'], posted:'4 days ago', featured:true },
  { id:5, title:'Frontend Engineer', company:'Vercel', logo:'▲', color:'#333', location:'Remote', type:'Remote', category:'Technology', level:'Mid Level', salary:'$115K–$145K', tags:['Next.js','React','CSS'], posted:'5 days ago', featured:false },
  { id:6, title:'UX Researcher', company:'Shopify', logo:'🛍️', color:'#95bf47', location:'Toronto, CA', type:'Full-time', category:'Design', level:'Mid Level', salary:'$90K–$115K', tags:['User Interviews','Usability','Analytics'], posted:'1 week ago', featured:false },
  { id:7, title:'DevOps Engineer', company:'Slack', logo:'💬', color:'#4a154b', location:'Remote', type:'Remote', category:'Technology', level:'Senior Level', salary:'$135K–$165K', tags:['AWS','Kubernetes','CI/CD'], posted:'6 days ago', featured:false },
  { id:8, title:'Content Marketing Specialist', company:'HubSpot', logo:'🧲', color:'#ff7a59', location:'Boston, MA', type:'Full-time', category:'Marketing', level:'Entry Level', salary:'$55K–$70K', tags:['Copywriting','SEO','Email Marketing'], posted:'2 days ago', featured:false },
  { id:9, title:'Financial Analyst', company:'Goldman Sachs', logo:'📈', color:'#0070b0', location:'New York, NY', type:'Full-time', category:'Finance', level:'Entry Level', salary:'$75K–$95K', tags:['Excel','Financial Modeling','Python'], posted:'3 days ago', featured:false },
  { id:10, title:'iOS Developer', company:'Spotify', logo:'🎵', color:'#1db954', location:'Stockholm / Remote', type:'Remote', category:'Technology', level:'Mid Level', salary:'$120K–$150K', tags:['Swift','SwiftUI','Xcode'], posted:'1 day ago', featured:false },
  { id:11, title:'HR Business Partner', company:'Netflix', logo:'🎬', color:'#e50914', location:'Los Angeles, CA', type:'Full-time', category:'Operations', level:'Senior Level', salary:'$100K–$130K', tags:['Recruitment','Culture','L&D'], posted:'4 days ago', featured:false },
  { id:12, title:'Brand Designer', company:'Linear', logo:'⚡', color:'#5e6ad2', location:'Remote', type:'Contract', category:'Design', level:'Senior Level', salary:'$80–$120/hr', tags:['Brand Identity','Motion','Figma'], posted:'Today', featured:false },
];

const companiesData = [
  { name:'Stripe', logo:'💳', color:'#635bff', industry:'Fintech', size:'5,000–10,000', desc:'Building economic infrastructure for the internet. Join the team powering millions of businesses worldwide.', jobs:34 },
  { name:'Figma', logo:'🎨', color:'#f24e1e', industry:'Design Tools', size:'500–1,000', desc:'Design tools for everyone. We make powerful design accessible and collaborative for teams of all sizes.', jobs:18 },
  { name:'Notion', logo:'📝', color:'#2e2e2e', industry:'Productivity', size:'200–500', desc:'Your all-in-one workspace for notes, docs, and projects. Helping teams think and work in one place.', jobs:22 },
  { name:'Vercel', logo:'▲', color:'#333', industry:'Cloud / DevTools', size:'200–500', desc:'The platform for frontend developers, providing speed and reliability to bring the best web content faster.', jobs:15 },
  { name:'Airbnb', logo:'🏡', color:'#ff385c', industry:'Travel / Marketplace', size:'10,000+', desc:'Create a world where anyone can belong anywhere. We build transformative hospitality experiences.', jobs:41 },
  { name:'Shopify', logo:'🛍️', color:'#95bf47', industry:'E-Commerce', size:'10,000+', desc:'Empowering entrepreneurs worldwide. We make commerce better for everyone with our all-in-one platform.', jobs:29 },
  { name:'Linear', logo:'⚡', color:'#5e6ad2', industry:'Project Management', size:'50–200', desc:'Streamline software projects, sprints, tasks, and bug tracking. The issue tracker built for high-performance teams.', jobs:8 },
  { name:'Spotify', logo:'🎵', color:'#1db954', industry:'Music / Streaming', size:'10,000+', desc:'Audio streaming and media services company. Connecting creators and fans worldwide through music and podcasts.', jobs:37 },
];

// ---- AUTHENTICATION GLOBAL STATE ----
let currentUser = null; // Stores object when logged in: { email, type: 'candidate' | 'company' }

// ---- NAVIGATION ----
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });
  if (pageId === 'jobs') renderJobsList();
  if (pageId === 'companies') renderCompanies();
  closeMenu();
}

// ---- MENU TOGGLE ----
function toggleMenu() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}
function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
}

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ---- RENDER FEATURED JOBS (Home) ----
function renderFeaturedJobs() {
  const grid = document.getElementById('featuredJobsGrid');
  if (!grid) return;
  const featured = jobsData.filter(j => j.featured);
  grid.innerHTML = featured.map(j => `
    <div class="job-card" onclick="openJobModal(${j.id})">
      <div class="job-card-top">
        <div class="company-logo-box" style="background:${j.color}22; color:${j.color}">${j.logo}</div>
        <div class="job-card-title">
          <h3>${j.title}</h3>
          <span>${j.company}</span>
        </div>
        <span class="job-badge ${getBadgeClass(j.type)}">${j.type}</span>
      </div>
      <div class="job-meta">
        <span>📍 ${j.location}</span>
        <span>🎯 ${j.level}</span>
        <span>📂 ${j.category}</span>
      </div>
      <div class="job-tags">
        ${j.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
      </div>
      <div class="job-card-bottom">
        <div>
          <div class="job-salary">${j.salary}</div>
          <div class="job-date">Posted ${j.posted}</div>
        </div>
        <button class="job-apply-btn" onclick="event.stopPropagation(); handleApplyWorkflow(${j.id})">Apply Now</button>
      </div>
    </div>
  `).join('');
}

// ---- RENDER JOBS LIST (Jobs Page) ----
function renderJobsList() {
  filterJobs();
}

function filterJobs() {
  const search = (document.getElementById('jobSearch')?.value || '').toLowerCase();
  const location = (document.getElementById('locationSearch')?.value || '').toLowerCase();
  const category = document.getElementById('categoryFilter')?.value || '';
  const level = document.getElementById('levelFilter')?.value || '';
  const sort = document.getElementById('sortJobs')?.value || 'newest';

  const checkedTypes = [...document.querySelectorAll('#typeFilters input:checked')].map(i => i.value);

  let filtered = jobsData.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search) || j.company.toLowerCase().includes(search) || j.tags.some(t => t.toLowerCase().includes(search));
    const matchLocation = !location || j.location.toLowerCase().includes(location);
    const matchType = checkedTypes.length === 0 || checkedTypes.includes(j.type);
    const matchCategory = !category || j.category === category;
    const matchLevel = !level || j.level === level;
    return matchSearch && matchLocation && matchType && matchCategory && matchLevel;
  });

  if (sort === 'az') filtered.sort((a,b) => a.title.localeCompare(b.title));
  else if (sort === 'salary') filtered.sort((a,b) => parseInt(b.salary.replace(/\D/g,'')) - parseInt(a.salary.replace(/\D/g,'')));

  const countEl = document.getElementById('jobCount');
  if (countEl) countEl.textContent = `Showing ${filtered.length} job${filtered.length !== 1 ? 's' : ''}`;

  const list = document.getElementById('jobsList');
  if (!list) return;

  if (filtered.length === 0) {
    list.innerHTML = '<div style="text-align:center; padding:60px; color:var(--text3)"><div style="font-size:40px;margin-bottom:12px">🔍</div><p style="font-family:var(--font-display);font-size:16px">No jobs match your filters</p></div>';
    return;
  }

  list.innerHTML = filtered.map(j => `
    <div class="job-list-card" onclick="openJobModal(${j.id})">
      <div class="company-logo-box" style="background:${j.color}22; color:${j.color}; width:48px; height:48px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0">${j.logo}</div>
      <div class="job-list-info">
        <h3>${j.title}</h3>
        <span style="font-size:13px;color:var(--text3)">${j.company}</span>
        <div class="job-list-meta">
          <span>📍 ${j.location}</span>
          <span>🎯 ${j.level}</span>
          <span>📂 ${j.category}</span>
          <span class="job-badge ${getBadgeClass(j.type)}" style="margin:0">${j.type}</span>
        </div>
        <div class="job-tags" style="margin-top:8px">
          ${j.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="job-list-right">
        <span class="job-salary">${j.salary}</span>
        <div style="font-size:12px;color:var(--text3);margin-bottom:10px">${j.posted}</div>
        <button class="job-apply-btn" onclick="event.stopPropagation(); handleApplyWorkflow(${j.id})">Apply</button>
      </div>
    </div>
  `).join('');
}

function resetFilters() {
  document.querySelectorAll('#typeFilters input').forEach(i => i.checked = true);
  document.getElementById('categoryFilter').value = '';
  document.getElementById('levelFilter').value = '';
  if (document.getElementById('jobSearch')) document.getElementById('jobSearch').value = '';
  if (document.getElementById('locationSearch')) document.getElementById('locationSearch').value = '';
  filterJobs();
}

// ---- RENDER COMPANIES ----
// function renderCompanies() {
//   const grid = document.getElementById('companiesGrid');
//   if (!grid) return;
//   grid.innerHTML = companiesData.map(c => `
//     <div class="company-card" onclick="showToast('Viewing ${c.name} — ${c.jobs} open roles')">
//       <div class="company-card-top">
//         <div class="company-logo-lg" style="background:${c.color}22; color:${c.color}">${c.logo}</div>
//         <div class="company-card-info">
//           <h3>${c.name}</h3>
//           <span>${c.industry} · ${c.size} employees</span>
//         </div>
//       </div>
//       <p class="company-desc">${c.desc}</p>
//       <div class="company-card-bottom">
//         <span>🌍 Worldwide</span>
//         <span class="company-open-jobs">${c.jobs} open roles →</span>
//       </div>
//     </div>
//   `).join('');
// }

// ---- RENDER COMPANIES ----
function renderCompanies() {
  const grid = document.getElementById('companiesGrid');
  if (!grid) return;
  grid.innerHTML = companiesData.map(c => `
    <div class="company-card" onclick="viewCompanyJobs('${c.name}')">
      <div class="company-card-top">
        <div class="company-logo-lg" style="background:${c.color}22; color:${c.color}">${c.logo}</div>
        <div class="company-card-info">
          <h3>${c.name}</h3>
          <span>${c.industry} · ${c.size} employees</span>
        </div>
      </div>
      <p class="company-desc">${c.desc}</p>
      <div class="company-card-bottom">
        <span>🌍 Worldwide</span>
        <span class="company-open-jobs" style="cursor: pointer;">${c.jobs} open roles →</span>
      </div>
    </div>
  `).join('');
}

// ---- NAVIGATION HELPER FOR COMPANY ROLES ----
function viewCompanyJobs(companyName) {
  // 1. Move to the Jobs Page layout view
  showPage('jobs');
  
  // 2. Target the search field input element and populate it with the company name
  const searchInput = document.getElementById('jobSearch');
  if (searchInput) {
    searchInput.value = companyName;
  }
  
  // 3. Trigger the data filter engine to re-render matching rows
  filterJobs();
  
  // 4. Send a notification toast confirming the action
  showToast(`🔍 Showing available opportunities at ${companyName}`);
}

// ---- JOB APPLICATION WORKFLOW VALIDATION ----
function handleApplyWorkflow(id) {
  if (!currentUser) {
    showToast('❌ Access Denied. Please Sign Up or Login first!');
    showModal('signup');
    return;
  }
  if (currentUser.type !== 'candidate') {
    showToast('❌ Only logged-in Candidates can apply for jobs!');
    return;
  }
  openApplicationForm(id);
}

function handlePostJobWorkflow() {
  if (!currentUser) {
    showToast('❌ Access Denied. Companies must register/login before posting jobs.');
    showModal('company-signup');
    return;
  }
  if (currentUser.type !== 'company') {
    showToast('❌ Your profile is registered as a Candidate. Register a Company account to post roles.');
    showModal('company-signup');
    return;
  }
  openPostJobModal();
}

// ---- JOB DETAILS MODAL ----
function openJobModal(id) {
  const j = jobsData.find(x => x.id === id);
  if (!j) return;
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
      <div style="width:60px;height:60px;border-radius:14px;background:${j.color}22;color:${j.color};display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0">${j.logo}</div>
      <div>
        <h2 style="font-family:var(--font-display);font-size:22px;font-weight:700;margin-bottom:4px">${j.title}</h2>
        <span style="color:var(--text3);font-size:14px">${j.company} · ${j.location}</span>
      </div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
      <span class="job-badge ${getBadgeClass(j.type)}">${j.type}</span>
      <span class="job-badge badge-full">${j.level}</span>
      <span class="job-badge badge-contract">${j.category}</span>
    </div>
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px 20px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center">
      <div><div style="font-family:var(--font-display);font-size:11px;letter-spacing:1px;color:var(--text3);text-transform:uppercase;margin-bottom:4px">Salary Range</div><div style="font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--accent-light)">${j.salary}</div></div>
      <div style="text-align:right"><div style="font-family:var(--font-display);font-size:11px;letter-spacing:1px;color:var(--text3);text-transform:uppercase;margin-bottom:4px">Posted</div><div style="font-size:14px;color:var(--text2)">${j.posted}</div></div>
    </div>
    <div style="margin-bottom:20px">
      <div style="font-family:var(--font-display);font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--text3);margin-bottom:10px">Skills Required</div>
      <div class="job-tags">${j.tags.map(t => `<span class="job-tag">${t}</span>`).join('')}</div>
    </div>
    <div style="margin-bottom:24px">
      <div style="font-family:var(--font-display);font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--text3);margin-bottom:10px">About this Role</div>
      <p style="color:var(--text2);font-size:14px;line-height:1.7">We're looking for a talented ${j.title} to join the ${j.company} team. You'll be working on challenging problems, collaborating with world-class colleagues, and building products that impact millions of people. This is a great opportunity to grow your career in a high-growth environment.</p>
    </div>
    <button class="btn-primary btn-full btn-lg" onclick="handleApplyWorkflow(${j.id})">Apply for this Role</button>
  `;
  showModal('custom');
}

// ---- JOB APPLICATION FORM INTERFACE ----
function openApplicationForm(jobId) {
  const j = jobsData.find(x => x.id === jobId);
  if (!j) return;
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="modal-form">
      <h2>Apply for ${j.title}</h2>
      <p style="color:var(--text3); margin-bottom: 20px;">at ${j.company}</p>
      <form id="jobAppForm" onsubmit="submitJobApplication(event, '${j.title}')">
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" id="appFullName" placeholder="Jane Smith" />
        </div>
        <div class="form-group">
          <label>Email Address *</label>
          <input type="email" id="appEmail" placeholder="jane@example.com" value="${currentUser ? currentUser.email : ''}" />
        </div>
        <div class="form-group">
          <label>Phone Number *</label>
          <input type="tel" id="appPhone" placeholder="+92 300 1234567" />
        </div>
        <div class="form-group">
          <label>Upload CV / Resume (PDF, DOCX) *</label>
          <input type="file" id="appResume" accept=".pdf,.docx" style="padding: 8px 0;" />
        </div>
        <div class="form-group">
          <label>Cover Letter / Summary</label>
          <textarea id="appCoverLetter" rows="4" placeholder="Briefly describe why you are a great fit..."></textarea>
        </div>
        <button type="submit" class="btn-primary btn-full btn-lg">Submit Application</button>
      </form>
    </div>
  `;
  showModal('custom');
}

// ---- APPLICATION JS VALIDATION ----
function submitJobApplication(e, jobTitle) {
  e.preventDefault();
  const name = document.getElementById('appFullName').value.trim();
  const email = document.getElementById('appEmail').value.trim();
  const phone = document.getElementById('appPhone').value.trim();
  const resume = document.getElementById('appResume').files[0];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) { showToast('⚠️ Full Name field is compulsory.'); return; }
  if (!email || !emailPattern.test(email)) { showToast('⚠️ Enter a valid email address.'); return; }
  if (!phone || phone.length < 7) { showToast('⚠️ Enter a valid contact phone number.'); return; }
  if (!resume) { showToast('⚠️ Please upload your CV/Resume to continue.'); return; }

  showToast(`✅ Application for "${jobTitle}" submitted successfully!`);
  closeModal();
}

// ---- COMPANY POST JOB CARD ----
function openPostJobModal() {
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="modal-form">
      <h2>Post a New Opportunity</h2>
      <p>Reach qualified engineering and design talent instantly.</p>
      <form id="postJobForm" onsubmit="submitNewJob(event)">
        <div class="form-group">
          <label>Job Title *</label>
          <input type="text" id="pJobTitle" placeholder="e.g. Senior Laravel Engineer" />
        </div>
        <div class="form-group">
          <label>Experience Level *</label>
          <select id="pJobLevel">
            <option value="">Select Level</option>
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
            <option>Lead / Manager</option>
          </select>
        </div>
        <div class="form-group">
          <label>Job Location *</label>
          <input type="text" id="pJobLoc" placeholder="e.g. Karachi / Remote" />
        </div>
        <div class="form-group">
          <label>Annual Salary Package *</label>
          <input type="text" id="pJobSalary" placeholder="e.g. $80K - $100K" />
        </div>
        <button type="submit" class="btn-primary btn-full btn-lg">Publish Listing</button>
      </form>
    </div>
  `;
  showModal('custom');
}

function submitNewJob(e) {
  e.preventDefault();
  const title = document.getElementById('pJobTitle').value.trim();
  const level = document.getElementById('pJobLevel').value;
  const loc = document.getElementById('pJobLoc').value.trim();
  const salary = document.getElementById('pJobSalary').value.trim();

  if (!title || !level || !loc || !salary) {
    showToast('⚠️ Complete all mandatory fields marked with an asterisk (*).');
    return;
  }
  showToast('✅ Job advertisement configured and queued for approval!');
  closeModal();
}

// ---- MODAL STRUCTURE & VALIDATION CONTROL ----
function showModal(type) {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  const content = document.getElementById('modalContent');

  if (type === 'signup') {
    content.innerHTML = `
      <div class="modal-form">
        <h2>Create Account</h2>
        <p>Join 2M+ professionals on TalentBridge</p>
        <form onsubmit="handleSignupAction(event, 'candidate')">
          <div class="form-group"><label>Full Name *</label><input type="text" id="signName" placeholder="Jane Smith" required /></div>
          <div class="form-group"><label>Email *</label><input type="email" id="signEmail" placeholder="jane@example.com" required /></div>
          <div class="form-group"><label>Password *</label><input type="password" id="signPass" placeholder="••••••••" required /></div>
          <button type="submit" class="btn-primary btn-full btn-lg">Create Free Account</button>
        </form>
        <div class="modal-switch">Are you an employer? <a onclick="showModal('company-signup')">Register Company instead</a></div>
        <div class="modal-switch">Already have an account? <a onclick="showModal('login')">Sign in</a></div>
      </div>
    `;
  } else if (type === 'company-signup') {
    content.innerHTML = `
      <div class="modal-form">
        <h2>Employer Registration</h2>
        <p>Establish corporate access to post open vacancies</p>
        <form onsubmit="handleSignupAction(event, 'company')">
          <div class="form-group"><label>Company Representative Name *</label><input type="text" id="signName" placeholder="John Doe" required /></div>
          <div class="form-group"><label>Corporate Email *</label><input type="email" id="signEmail" placeholder="recruiting@company.com" required /></div>
          <div class="form-group"><label>Account Password *</label><input type="password" id="signPass" placeholder="••••••••" required /></div>
          <button type="submit" class="btn-primary btn-full btn-lg">Register Corporate Account</button>
        </form>
        <div class="modal-switch">Looking for employment? <a onclick="showModal('signup')">Create Candidate Account</a></div>
        <div class="modal-switch">Already managed? <a onclick="showModal('login')">Sign in</a></div>
      </div>
    `;
  } else if (type === 'login') {
    content.innerHTML = `
      <div class="modal-form">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
        <form onsubmit="handleLoginAction(event)">
          <div class="form-group"><label>Email Address</label><input type="email" id="logEmail" placeholder="jane@example.com" required /></div>
          <div class="form-group"><label>Password</label><input type="password" id="logPass" placeholder="••••••••" required /></div>
          <div class="form-group">
            <label>Profile Classification</label>
            <select id="logType">
              <option value="candidate">Candidate / Job Seeker</option>
              <option value="company">Corporate Recruiter</option>
            </select>
          </div>
          <button type="submit" class="btn-primary btn-full btn-lg">Sign In</button>
        </form>
        <div class="modal-switch">Don't have an account? <a onclick="showModal('signup')">Sign up free</a></div>
      </div>
    `;
  }
}

function handleSignupAction(e, type) {
  e.preventDefault();
  const name = document.getElementById('signName').value.trim();
  const email = document.getElementById('signEmail').value.trim();
  const pass = document.getElementById('signPass').value;

  if(pass.length < 6) {
    showToast('⚠️ Security rule: Password must contain 6 or more characters.');
    return;
  }

  currentUser = { email: email, type: type };
  updateNavbarState();
  closeModal();
  showToast(`Welcome, ${name}! Your profile is online. 🎉`);
}

function handleLoginAction(e) {
  e.preventDefault();
  const email = document.getElementById('logEmail').value.trim();
  const type = document.getElementById('logType').value;

  currentUser = { email: email, type: type };
  updateNavbarState();
  closeModal();
  showToast('Welcome back! Authentication sequence confirmed. 👋');
}

function logOutSession() {
  currentUser = null;
  updateNavbarState();
  showPage('home');
  showToast('Logged out securely.');
}

function updateNavbarState() {
  const container = document.getElementById('navAuthBlock');
  if (!container) return;
  if (currentUser) {
    container.innerHTML = `
      <span style="font-size:13px; color:var(--text2); font-family:var(--font-display); word-break:break-all;">${currentUser.email}</span>
      <button class="btn-outline" style="padding: 8px 16px;" onclick="logOutSession()">Logout</button>
    `;
  } else {
    container.innerHTML = `
      <button class="btn-outline" onclick="showModal('login')">Login</button>
      <button class="btn-primary" onclick="showModal('signup')">Sign Up Free</button>
    `;
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// ---- CONTACT FORM JS VALIDATION ----
function submitContact(e) {
  e.preventDefault();
  const firstName = e.target.querySelector('input[placeholder="Jane"]').value.trim();
  const lastName = e.target.querySelector('input[placeholder="Smith"]').value.trim();
  const email = e.target.querySelector('input[type="email"]').value.trim();
  const message = e.target.querySelector('textarea').value.trim();
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName || !lastName) {
    showToast('⚠️ Validation Alert: Both First and Last Name variants are required.');
    return;
  }
  if (!email || !emailPattern.test(email)) {
    showToast('⚠️ Validation Alert: Provide a structurally correct electronic mail destination.');
    return;
  }
  if (message.length < 15) {
    showToast('⚠️ Validation Alert: Messages must possess structural value (at least 15 characters).');
    return;
  }

  showToast('✅ Verification complete. Form transmission accepted!');
  e.target.reset();
}

// ---- TOAST ----
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ---- HELPERS ----
function getBadgeClass(type) {
  if (type === 'Remote') return 'badge-remote';
  if (type === 'Full-time') return 'badge-full';
  if (type === 'Contract') return 'badge-contract';
  if (type === 'Part-time') return 'badge-part';
  return 'badge-full';
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedJobs();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.cat-card, .job-card, .step-card, .testimonial-card, .team-card, .company-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});