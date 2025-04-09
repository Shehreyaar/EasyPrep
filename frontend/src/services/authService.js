const BASE_URL = "http://127.0.0.1:3000";


export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  sessionStorage.setItem("uid", data.uid);
  sessionStorage.setItem("token", data.idToken);
  console.log("TOKEN SAVED:", sessionStorage.getItem("token")); // debug
  console.log("UID SAVED:", sessionStorage.getItem("uid"));//debug
  
  return data;
}

export async function register(email, password, firstName, lastName, phoneNumber, address) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, firstName, lastName, phoneNumber, address }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Registration failed");

  return data;
}

export async function forgotPassword(email) {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Reset password failed");

  return data;
}

export async function getProfileBackend() {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/get-profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
  return data;
}

export async function updateProfileBackend(profileData) {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/edit-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update profile");
  return data;
}

export async function getUserAddress() {
  const token = sessionStorage.getItem("token");
  const res = await fetch("http://127.0.0.1:3000/get-address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch address");
  return data;
}

export async function updateUserAddress(address) {
  const token = sessionStorage.getItem("token");
  const res = await fetch("http://127.0.0.1:3000/update-address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ address }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update address");
  return data;
}

export async function getFullProfile() {
  const token = sessionStorage.getItem("token");

  const res = await fetch("http://127.0.0.1:3000/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
  return data;
}

