from flask import Blueprint, render_template, request, redirect, url_for, session, flash

admin_bp = Blueprint('admin_bp', __name__, template_folder='template', static_folder='static',
                  static_url_path='/admin/static')
from datetime import datetime



@admin_bp.route('/')
def home():
    is_logged_in = session.get('logged_in', False)
    return render_template('folders/home.html', is_logged_in=is_logged_in)
# Route for serving header

@admin_bp.route('/admin/home')
def create_project():
    # Check if the user is logged in
    is_logged_in = session.get('logged_in', False)
     
    # Render the dashboard with the sidebar for logged-in users
    return render_template('folders/createproject.html', is_logged_in=is_logged_in)

@admin_bp.route('/admin/project')
def projects():
    # Check if the user is logged in
    is_logged_in = session.get('logged_in', False)
     
    # Render the dashboard with the sidebar for logged-in users
    return render_template('folders/viewprojects.html', is_logged_in=is_logged_in)

@admin_bp.route('/header')
def load_header():
    return render_template('header/header.html')

@admin_bp.route('/analysispage')
def client_analysis():
     # Check if the user is logged in
    is_logged_in = session.get('logged_in', False)
    return render_template('folders/analysispage.html',is_logged_in=is_logged_in)
# Route for serving footer
@admin_bp.route('/Dashboard')
def Dashboard():
     # Check if the user is logged in
    is_logged_in = session.get('logged_in', False)
    return render_template('folders/Dashboard.html',is_logged_in=is_logged_in)
# Route for serving pricing
@admin_bp.route('/pricing')
def pricing():
    is_logged_in = session.get('logged_in', False)
    return render_template('folders/pricing.html', is_logged_in=is_logged_in)


# Route for serving support
@admin_bp.route('/support')
def support():
    is_logged_in = session.get('logged_in', False)
    return render_template('folders/support.html', is_logged_in=is_logged_in)

@admin_bp.route('/help-center')
def help_center():
    return render_template('folders/help_center.html')

# Define the privacy policy route
@admin_bp.route('/privacy-policy')
def privacy_policy():
    return render_template('folders/privacy_policy.html')

@admin_bp.route('/terms-of-service')
def terms_of_service():
    effective_date = datetime(2024, 11, 3)
    return render_template('folders/terms_of_service.html',effective_date=effective_date)

@admin_bp.route('/our-story')
def our_story():
    return render_template('folders/our_story.html')

@admin_bp.route('/view')
def view():
     # Check if the user is logged in
    is_logged_in = session.get('logged_in', False)
    return render_template('folders/viewp.html',is_logged_in=is_logged_in)
# Route for serving footer
@admin_bp.route('/Works')
def howitworks():
     # Check if the user is logged in
    is_logged_in = session.get('logged_in', False)
    return render_template('folders/howitworks.html',is_logged_in=is_logged_in)
# Route for serving footer


@admin_bp.route('/footer')
def load_footer():
    current_year = datetime.now().year
    return render_template('footer/footer.html', year=current_year)

@admin_bp.route('/signin')
def index():
    return render_template('folders/index.html')
# Phone verification page
@admin_bp.route('/phone_verification', methods=['POST', 'GET'])
def phone_verification():
    if request.method == 'POST':
        user_type = request.form.get('user_type')
        phone = request.form.get('phone')
        # Here you would send OTP to the user's phone
        return render_template('folders/phone_verification.html', phone=phone, user_type=user_type)
    return redirect(url_for('index'))

# OTP verification (mock-up here)
@admin_bp.route('/verify_otp', methods=['POST'])
def verify_otp():
    otp = request.form.get('otp')
    user_type = request.form.get('user_type')
    if otp == "1234":  # Here you’d check OTP validity
        if user_type == "client":
            return redirect(url_for('admin_bp.client_form'))
        else:
            return redirect(url_for('admin_bp.freelancer_form'))
    return render_template('folders/phone_verification.html', error="Invalid OTP", user_type=user_type)

# Client registration form
@admin_bp.route('/client_form')
def client_form():
    return render_template('folders/client_form.html')

# Freelancer registration form
@admin_bp.route('/freelancer_form')
def freelancer_form():
    return render_template('folders/freelancer_form.html')

@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        phone_number = request.form['phone_number']
        # Simulate sending OTP and verifying it (for demo purposes)
        # You would typically send an actual OTP to the user's phone.
        if phone_number == "1234567890":  # Example phone number check
            return redirect(url_for('admin_bp.otp_verification', phone_number=phone_number))
        else:
            flash('Invalid phone number!')  # Flash message for invalid number
    return render_template('folders/login.html')

@admin_bp.route('/otp-verification/<phone_number>', methods=['GET', 'POST'])
def otp_verification(phone_number):
    if request.method == 'POST':
        otp = request.form['otp']
        # Simulate OTP verification (for demo purposes)
        if otp == "1234":  # Example OTP check
             # Successful login: create session and redirect to dashboard
            session['logged_in'] = True
            session['phone_number'] = phone_number
            return redirect(url_for('admin_bp.Dashboard', phone_number=phone_number))
        else:
            flash('Invalid OTP!')  # Flash message for invalid OTP
    return render_template('folders/otp_verification.html', phone_number=phone_number)

@admin_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # This will Handle registration logic here
        # For example, save the user data to a database
        flash('Registration successful!')
        return redirect(url_for('admin_bp.home'))
    return render_template('folders/register.html')

# Logout Route
@admin_bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('admin_bp.home'))