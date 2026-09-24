
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      if (response.status === 401) {
        localStorage.removeItem("employee_panel_auth");
        window.location.href = "/login";
      }
      return response;
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

