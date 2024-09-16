export async function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const response = await fetch("http://localhost:8000/checklogin", {
      method: "GET",
      headers: {
        Authorization: token, // Optional: use 'Bearer' if your API expects it
      },
    });

    // Read the response body once and store it
    const result = await response.json();

    // Log the result for debugging purposes
    console.log(result);

    if (response.ok) {
      return result.status === "success";
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}
