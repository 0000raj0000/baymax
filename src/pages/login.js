/** Login Page (UI only) */

export function renderLogin() {
    return `
    <section class="login-page" aria-label="Login">
      <article class="login-card">
        <div class="login-logo" aria-hidden="true">
          <span class="login-eye"></span>
          <span class="login-bridge"></span>
          <span class="login-eye"></span>
        </div>
        <h2>Welcome Back</h2>
        <p class="login-subtitle">Sign in to your Baymax dashboard</p>
        <form class="login-form" id="login-form">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" placeholder="you@company.com" required />
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn-login-submit">Login</button>
        </form>
        <div class="login-forgot">
          <a href="#">Forgot password?</a>
        </div>
      </article>
    </section>
  `;
}

export function initLoginPage() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // UI only – no actual auth
        });
    }
}
