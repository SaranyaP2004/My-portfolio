# Saranya P — Django Developer Portfolio

A responsive, dark futuristic portfolio starter built with Django templates, CSS and vanilla JavaScript.

## 1. Setup

```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open http://127.0.0.1:8000/

## 2. Personalise it

- Replace the placeholder email and social links in `templates/portfolio/index.html`.
- Add your own portrait as `static/images/profile.jpg`.
- Add project screenshots as `static/images/manufacturing.png` and `static/images/flower-shop.png`.
- Put your resume PDF at `static/files/Saranya_Resume.pdf` (create the `files` folder).
- Update the education details and internship dates if needed.

## 3. Contact form

The contact form currently validates in the browser and shows a demo success message. It does not send email yet.
To make it send email, configure Django email settings and connect the form to a Django POST view with CSRF protection.

## 4. Production

Before deployment, set `DEBUG = False`, configure `ALLOWED_HOSTS`, use environment variables for `SECRET_KEY`, configure static file collection, and use a production web server.
