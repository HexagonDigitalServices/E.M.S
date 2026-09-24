
     catch (err) {
      console.error("OTP verification error:", err);
      setError("Unable to connect to server. Please try again later.");
      setLoading(false);
    }
  

  const handleResend = async () => {
    if (!email.trim()) {
      setError("Please enter your email to resend the code.");
      return;
    }

    setResending(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/resend-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not resend OTP code.");
        setResending(false);
        return;
      }

      setSuccess(data.message || "A new code has been sent to your email.");
      setResending(false);
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError("Unable to connect to server. Please try again.");
      setResending(false);
    }
  };

  return (
    
        <form onSubmit={handleSubmit} className={s.form}>
          <span className={s.formIcon}>
            <ShieldCheck size={26} />
          </span>
          <p className={s.formLabel}>Security Check</p>
          <h2 className={s.formTitle}>Verify Email</h2>

          {error && <div className={s.errorBox}>{error}</div>}

          {success && <div className={s.successBox}>{success}</div>}

          <label className={s.inputLabelEmail}>
            <span className={s.inputLabelText}>Work email</span>
            <span className={s.inputWrapper}>
              <Mail className={s.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="name@company.com"
                className={s.inputField}
              />
            </span>
          </label>

          <label className={s.inputLabelOtp}>
            <span className={s.inputLabelText}>6-digit OTP code</span>
            <span className={s.inputWrapper}>
              <KeyRound className={s.inputIcon} />
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(event) => {
                  setOtp(event.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                placeholder="123456"
                className={s.inputField}
              />
            </span>
          </label>

          <div className={s.resendContainer}>
            <button
              type="button"
              disabled={resending}
              onClick={handleResend}
              className={s.resendButton}
            >
              {resending && (
                <svg className={s.resendSpinner} fill="none" viewBox="0 0 24 24">
                  <circle
                    className={s.spinnerCircle}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className={s.spinnerPath}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {resending ? "Resending..." : "Resend OTP Code"}
            </button>
          </div>

          <button disabled={loading} className={s.submitButton}>
            {loading ? (
              <>
                <svg className={s.submitSpinner} fill="none" viewBox="0 0 24 24">
                  <circle
                    className={s.spinnerCircle}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className={s.spinnerPath}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verifying...
              </>
            ) : (
              <>
                Verify Code
                <ArrowRight size={17} />
              </>
            )}
          </button>

          <p className={s.footer}>
            Back to{" "}
            <Link to="/login" className={s.footerLink}>
              Login screen
            </Link>{" "}
            or{" "}
            <Link to="/signup" className={s.footerLink}>
              Register screen
            </Link>
          </p>
        </form>
   