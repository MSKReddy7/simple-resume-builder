# ResumeBuilder

ResumeBuilder is a small, full-stack resume-building project. It guides a visitor through a six-step form, validates each section with a Django REST API, previews one of three resume designs, and lets the visitor download the preview as a PDF.

The project is intentionally simple: React keeps the current form data in memory, Django checks submitted fields, and the browser renders the preview and creates the PDF. There is no user account, database-backed resume storage, or server-side PDF generation.

## Important: demo and personal data

This repository includes **sample values for testing the interface**. They are illustrative test data, not verified information about a real person and not content that should be used as an actual resume. Use the **Fill all Fields (Test Mode)** buttons on form steps to try the workflow without composing example content yourself. Review and replace every sample value before treating a downloaded resume as real.

Form data is held in React state while the page is open. When a visitor proceeds through a form step, the frontend sends that step's data to the local backend for validation. The current API validates the data and returns a response; it does not save resumes to the database. Refreshing or closing the page loses the in-memory form. The app also logs form state to the browser developer console, so use sample data when testing and avoid entering sensitive personal information.

## Features

- Landing page with a link to start building.
- Six guided steps: personal details, education, work experience, skills, hobbies and strengths, and template selection.
- Add/remove controls for education, experience, and skills.
- Per-step validation through Django REST Framework.
- Three selectable resume templates.
- In-browser resume preview and PDF download.
- Test Mode buttons on the form steps to fill example data for interface testing.

## Architecture

```text
Browser
└── React 19 + Vite frontend (frontend/)
    ├── Pages and components render the landing page and multi-step form
    ├── FormContext keeps form values and current step in React memory
    ├── Axios sends validation requests to the backend
    ├── Template components render the selected resume
    └── html2canvas + jsPDF produce the PDF in the browser
             │ HTTP POST /api/validate/<section>/
             ▼
        Django + Django REST Framework backend (backend/restapi/)
        ├── API views validate each submitted section
        └── SQLite is configured for Django; resume data is not stored there
```

### Request flow

1. The visitor opens the landing page and selects **Start Building**.
2. The frontend displays the form steps and stores edits in the shared React `FormContext`.
3. Selecting **Next** on a data-entry step sends that section to the matching Django validation endpoint. A valid response advances the form; a validation error is shown in a toast.
4. The visitor selects one of the three templates and opens the preview.
5. The selected template reads the same in-memory form data. Its **Download PDF** action captures the rendered resume and creates a PDF in the browser.

### Repository layout

```text
backend/
  requirements.txt                 Python dependencies
  restapi/
    manage.py                      Django management commands
    restapi/                       Django project settings and root URLs
    api/                           Validation views and API routes
frontend/
  package.json                     Frontend scripts and dependencies
  src/
    pages/                         Landing page
    Components/                    Form, steps, progress indicator, templates
    context/                       Form and toast state
    api/                           Axios validation requests
README.md
```

## Run locally

You need Python and Node.js/npm installed. Run the backend and frontend in separate terminals from the repository root.

### 1. Start the Django backend

Create and activate a virtual environment:

**Windows PowerShell**

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**macOS/Linux**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies, apply Django migrations, and start the API:

```text
cd backend
pip install -r requirements.txt
cd restapi
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

The frontend is currently configured to use the deployed Render API by default. To send local form validation requests to the local Django server instead, change `BASE_URL` in `frontend/src/api/api.js` to `http://127.0.0.1:8000/api/validate` while developing, then restore the Render URL before building for deployment.

### 2. Start the React frontend

In another terminal, from the repository root:

```text
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:5173`). The landing page should load; choose **Start Building** to enter the form.

## Deployment

The deployed application uses two separate services:

- **Frontend:** GitHub Actions builds the Vite app and deploys `frontend/dist` to GitHub Pages. The workflow is defined in `.github/workflows/deploy.yaml`; it runs on pushes to `main` and can also be started manually with `workflow_dispatch`. The deployed frontend is available at [https://mskreddy7.github.io/simple-resume-builder/](https://mskreddy7.github.io/simple-resume-builder/).
- **Backend:** Django REST API is hosted separately on Render at `https://simple-resume-builder-api.onrender.com`. The frontend sends validation requests to this API; the GitHub Actions workflow deploys the frontend to Pages and does not deploy the backend to Render.

The Pages build uses Node.js 22, runs `npm ci` and `npm run build`, then uploads `frontend/dist` and deploys it. The frontend build is configured for the `/simple-resume-builder/` project path, and creates a `404.html` fallback for client-side routes.

For the Render backend, configure the service to install dependencies from `backend/requirements.txt` and start Django with Gunicorn from `backend/restapi` (for example, `gunicorn restapi.wsgi:application`). Set a strong `SECRET_KEY` environment variable in Render and keep `DEBUG` disabled. Django CORS currently allows the GitHub Pages origin and `http://localhost:5173`. There is no Render deployment workflow or Render service manifest in this repository; backend deployment is managed separately from the GitHub Pages Action.

## Recent project commits and files

The following recent commits document the sample-data testing feature, project setup, and deployment work. File paths are relative to the repository root.

| Commit | Change | Files changed |
|---|---|---|
| `9c9ee0c` — added readme | Added the initial project documentation. | `README.md` |
| `b0991e3` — feat: testing feature: | Added Test Mode sample values and related form-state and styling updates across the form steps. | `frontend/src/Components/MultiStepForm.jsx`; `frontend/src/Components/steps/EducationDetails.jsx`; `frontend/src/Components/steps/HobbiesStrengths.jsx`; `frontend/src/Components/steps/PersonalDetails.jsx`; `frontend/src/Components/steps/Skills.jsx`; `frontend/src/Components/steps/WorkExperience.jsx`; `frontend/src/context/FormContext.jsx`; `frontend/src/styles/MultiStepForm.css` |
| `b6550d5` — added requiremnts.txt | Added the backend Python dependency list. | `backend/requirements.txt` |
| `a2dabf3` — Prepare project for deployment | Added Gunicorn for serving Django and changed Django settings to read deployment secrets from environment variables, disable debug mode, restrict allowed hosts, and limit CORS origins. | `backend/requirements.txt`; `backend/restapi/restapi/settings.py` |
| `9ccc47c` — Prepare project for deployment | Refined Django deployment settings, enabled the CORS app, and set the allowed frontend origins for local development and GitHub Pages. | `backend/restapi/restapi/settings.py` |
| `a9dbcc2` — Configure frontend deployment to GitHub Pages | Added the Pages build-and-deploy workflow, configured the Vite base path and React Router basename, generated a Pages fallback file during build, and switched the frontend API URL to Render. | `.github/workflows/deploy.yaml`; `frontend/package.json`; `frontend/src/api/api.js`; `frontend/src/main.jsx`; `frontend/vite.config.js` |

## Try the website with sample data

These steps are for developers or viewers who want to check the interface and flow, not to create a resume from the sample content:

1. Start both the backend and frontend using the instructions above.
2. In the browser, choose **Start Building**.
3. On each form step, select **Fill all Fields (Test Mode)** to populate its illustrative sample values. The work-experience section can also be left empty if you want to test the no-experience path.
4. Select **Next** and confirm that successful validation advances you to the next step. Try submitting an incomplete section to see validation feedback.
5. On the final step, select a template and choose **Preview Resume**.
6. Check the preview. If desired, choose **Download PDF** to verify PDF export.
7. Remember: the sample values are placeholders for testing the website. Do not present them as factual resume content.

## Developer checks

Run these commands from their respective directories.

**Frontend** (`frontend/`):

```text
npm run lint
npm run build
```

**Backend** (`backend/restapi/`, with the virtual environment activated):

```text
python manage.py check
python manage.py test
```

The backend's `api/tests.py` currently contains only the generated empty test scaffold, so `manage.py test` does not yet exercise the validation endpoints. The commands above check Django configuration and run the test discovery command; use the manual workflow in the previous section to test the current form and API behavior.

## Validation endpoints

All endpoints accept JSON `POST` requests under `/api/validate/`:

| Endpoint | Data checked |
|---|---|
| `/personal/` | Full name, email format, phone format, address, and summary are required |
| `/education/` | At least one entry; every entry needs a degree, college, end date, and grade |
| `/experience/` | An empty list is allowed; otherwise every entry needs a job title, company, start date, end date (unless marked current), location, and description |
| `/skills/` | At least one skill; every skill needs a name and a level from 0 to 5 |
| `/others/` | Hobbies and strengths are both required |

Phone validation currently expects a 10-digit Indian number, optionally prefixed with `+91`. These checks describe the current implementation; they are not a guarantee that resume content is factually correct or ready for a particular job application.

## Current limitations

- The API base URL is currently hard-coded to the Render service in `frontend/src/api/api.js`; local backend testing requires changing it to the local API address.
- Django is configured with SQLite, but the current resume flow does not create or retrieve saved resumes.
- Form values are not persisted between page loads.
- The backend has no automated API tests yet.
- Template and PDF appearance may vary with browser rendering and content length.
