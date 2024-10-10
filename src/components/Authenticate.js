export async function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const response = await fetch("http://localhost:8000/checklogin", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    // Read the response body once and store it
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}
